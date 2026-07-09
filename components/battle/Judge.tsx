"use client";

import { Trophy, Sparkles } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { JudgeVerdict } from "@/lib/types";

const BAR_COLOR: Record<string, string> = {
  Groq: "bg-gradient-to-r from-orange-500 to-amber-400",
  OpenRouter: "bg-gradient-to-r from-violet-600 to-fuchsia-500",
};

interface JudgePanelProps {
  verdict: JudgeVerdict | null;
  loading: boolean;
  hasQuestion: boolean;
}

export function Judge({
  verdict,
  loading,
  hasQuestion,
}: JudgePanelProps) {
  const normalizedScores = verdict?.scores ?? [];
  const winnerScore = normalizedScores.find(
    (s) => s.model === verdict?.winner
  )?.score;

  return (
    <div className="flex h-full flex-col rounded-2xl border border-zinc-800/80 bg-gradient-to-b from-zinc-900 to-zinc-950 p-6 shadow-xl">

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-400" />

            <span className="text-sm font-semibold tracking-wide text-zinc-200">
              Evaluation Engine
            </span>
          </div>

          <p className="mt-1 text-xs uppercase tracking-[0.25em] text-zinc-500">
            Powered by Gemini 2.5 Flash
          </p>
        </div>

        <Sparkles className="h-5 w-5 text-zinc-600" />
      </div>

      {loading ? (
        <div className="space-y-6">

          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              Running Independent Evaluation
            </p>

            <p className="mt-2 text-sm text-zinc-400">
              Comparing response quality, factual accuracy, reasoning,
              completeness, and clarity.
            </p>
          </div>

          <Skeleton className="h-10 w-48 bg-zinc-800" />
          <Skeleton className="h-24 w-full rounded-xl bg-zinc-800" />

          <div className="space-y-4">
            <Skeleton className="h-4 w-full bg-zinc-800" />
            <Skeleton className="h-4 w-full bg-zinc-800" />
          </div>
        </div>
      ) : verdict ? (
        <div className="flex flex-1 flex-col">

          {/* Winner */}

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5">

            <div className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              Best Overall Response
            </div>

            <div className="mt-4 flex items-end justify-between">

              <div>

                <h2 className="text-3xl font-bold tracking-tight text-white">
                  {verdict.winner}
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  Selected as the strongest response after comparative analysis.
                </p>

              </div>

              {winnerScore !== undefined && (
                <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2">
                  <span className="text-lg font-bold text-emerald-400">
                    {winnerScore.toFixed(1)}
                  </span>

                  <span className="ml-1 text-xs uppercase tracking-widest text-emerald-300">
                    /10
                  </span>
                </div>
              )}

            </div>
          </div>

          {/* Summary */}

          <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">

            <div className="mb-3 text-xs uppercase tracking-[0.25em] text-zinc-500">
              Evaluation Summary
            </div>

            <p className="text-sm leading-7 text-zinc-300">
              {verdict.reason}
            </p>

          </div>

          {/* Scores */}

          <div className="mt-8 flex-1">

            <div className="mb-5 flex items-center justify-between">

              <h3 className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                Performance Breakdown
              </h3>

              <span className="text-xs text-zinc-600">
                Comparative scoring
              </span>

            </div>

            <div className="space-y-5">

              {normalizedScores.length > 0 ? (
                normalizedScores.map((entry) => (
                  <div key={entry.model}>

                  <div className="mb-2 flex items-center justify-between">

                    <div>

                      <div className="font-medium text-zinc-200">
                        {entry.model}
                      </div>

                      <div className="text-xs text-zinc-500">
                        Overall response quality
                      </div>

                    </div>

                    <div className="rounded-md border border-zinc-700 bg-zinc-900 px-3 py-1">

                      <span className="font-mono text-sm font-semibold text-white">
                        {entry.score.toFixed(1)}
                      </span>

                      <span className="ml-1 text-xs text-zinc-500">
                        /10
                      </span>

                    </div>

                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-zinc-800">

                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-700 ease-out",
                        BAR_COLOR[entry.model] ??
                          "bg-gradient-to-r from-cyan-500 to-sky-400"
                      )}
                      style={{
                        width: `${entry.score * 10}%`,
                      }}
                    />

                  </div>

                  </div>
                ))
              ) : (
                <p className="text-sm text-zinc-500">
                  No score breakdown was returned for this evaluation.
                </p>
              )}

            </div>

          </div>

        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center text-center">

          <Trophy className="mb-4 h-10 w-10 text-zinc-700" />

          <h3 className="text-lg font-semibold text-zinc-300">
            Awaiting Evaluation
          </h3>

          <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-500">
            {hasQuestion
              ? "Both AI models are generating their responses. The evaluation will begin automatically once every response has been received."
              : "Submit a prompt to compare multiple AI models. An independent evaluation, winner selection, and detailed performance breakdown will appear here."}
          </p>

        </div>
      )}
    </div>
  );
}