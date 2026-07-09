"use client";

import { useState } from "react";
import { Swords } from "lucide-react";

import { QuestionInput } from "@/components/battle/Question-Input";
import { ResponseCard } from "@/components/battle/Response-Card";
import { Judge } from "@/components/battle/Judge";
import type { BattleResult, JudgeVerdict } from "@/lib/types";
import axios, { Axios } from "axios";

export function BattleArena() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<BattleResult | null>(null);

  async function handleSubmit() {
    if (!question.trim() || loading) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await axios.post("/api/v1/judge", {
        question: question,
      });

      const data = await res.data;

      if (!data) {
        throw new Error(data?.error ?? "Something went wrong.");
      }

      setResult(data as BattleResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const verdict: JudgeVerdict | null = result?.verdict ?? null;

  function isWinner(fighterLabel: string) {
    return verdict?.winner?.toLowerCase() === fighterLabel.toLowerCase();
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6">
      <header className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">
          <Swords className="h-5 w-5 text-cyan-400" />
        </div>
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-zinc-100">
            Self-Consistency Answer Engine
          </h1>
          <p className="text-sm text-zinc-500">
            Generate multiple independent responses, compare them objectively,
            and identify the most reliable answer through AI evaluation.
          </p>
        </div>
      </header>

      <QuestionInput
        value={question}
        onChange={setQuestion}
        onSubmit={handleSubmit}
        loading={loading}
      />

      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
        <div className="relative flex flex-col gap-6">
          <ResponseCard
            fighter="groq"
            content={result?.responses.groq ?? null}
            loading={loading}
            isWinner={isWinner("groq")}
          />

          <ResponseCard
            fighter="openrouter"
            content={result?.responses.openrouter ?? null}
            loading={loading}
            isWinner={isWinner("openrouter")}
          />
        </div>

        <Judge
          verdict={verdict}
          loading={loading}
          hasQuestion={question.trim().length > 0}
        />
      </div>
    </div>
  );
}
