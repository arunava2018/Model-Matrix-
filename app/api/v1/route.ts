import dotenv from 'dotenv';
import { NextRequest, NextResponse } from 'next/server';
import Groq from "groq-sdk";
import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";
import { systemPrompt, getJudgePrompt } from '@/lib/prompts';
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