import dotenv from 'dotenv';
import { NextRequest, NextResponse } from 'next/server';
import Groq from "groq-sdk";
import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";
import { systemPrompt, getJudgePrompt } from '@/lib/prompts';
import type { BattleResult, JudgeVerdict } from "@/lib/types";
import { normalizeJudgeVerdict } from "@/lib/utils";
dotenv.config();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const openrouter = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const GROQ_MODEL = "openai/gpt-oss-20b";
const OPENROUTER_MODEL = "poolside/laguna-xs-2.1:free";
const JUDGE_LABEL_A = "Groq";
const JUDGE_LABEL_B = "OpenRouter";
async function getGroqResponse(question: string) {
  const response = await groq.chat.completions.create({
    model: GROQ_MODEL,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: question },
    ],
    max_completion_tokens: 500,
  });

  return response.choices[0]?.message?.content ?? "";
}

async function getOpenRouterResponse(question: string) {
  const response = await openrouter.chat.completions.create({
    model: OPENROUTER_MODEL,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: question },
    ],
    max_completion_tokens: 500,
  });

  return response.choices[0]?.message?.content ?? "";
}
async function judgeResponses(
  question: string,
  answerA: string,
  answerB: string,
): Promise<JudgeVerdict> {
  const judgePrompt = getJudgePrompt(JUDGE_LABEL_A, JUDGE_LABEL_B);

  const response = await gemini.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
      ${judgePrompt}

      Question:
      ${question}

      Answer A:
      ${answerA}

      Answer B:
      ${answerB}
      `,
    config: {
      responseMimeType: "application/json",
    },
  });

  try {
    const parsed = JSON.parse(response.text ?? "{}")
    return normalizeJudgeVerdict(parsed)
  } catch {
    return normalizeJudgeVerdict({})
  }
}

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();

    if (!question || typeof question !== "string" || !question.trim()) {
      return NextResponse.json(
        { error: "Question is required." },
        { status: 400 },
      );
    }

    const start = Date.now();

    const [groqResponse, openRouterResponse] = await Promise.all([
      getGroqResponse(question),
      getOpenRouterResponse(question),
    ]);

    const latencyMs = Date.now() - start;

    const verdict = await judgeResponses(
      question,
      groqResponse,
      openRouterResponse,
    );

    const result: BattleResult = {
      question,
      responses: {
        groq: groqResponse,
        openrouter: openRouterResponse,
      },
      latencyMs,
      verdict,
    };

    return NextResponse.json(result);
  } catch (err) {
    console.error("Battle route error:", err);
    return NextResponse.json(
      { error: "Something went wrong while running the battle." },
      { status: 500 },
    );
  }
}

