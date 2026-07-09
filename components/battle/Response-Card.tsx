"use client";

import { Brain, CheckCircle2, Sparkles } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export type Fighter = "groq" | "openrouter";

const FIGHTER_STYLES: Record<
  Fighter,
  {
    dot: string;
    ring: string;
    badge: string;
    accent: string;
    label: string;
    model: string;
  }
> = {
  groq: {
    dot: "bg-orange-500",
    ring: "ring-orange-500/30",
    badge: "border-orange-500/30 bg-orange-500/10 text-orange-300",
    accent: "text-orange-400",
    label: "Groq",
    model: "openai/gpt-oss-20b",
  },
  openrouter: {
    dot: "bg-violet-500",
    ring: "ring-violet-500/30",
    badge: "border-violet-500/30 bg-violet-500/10 text-violet-300",
    accent: "text-violet-400",
    label: "OpenRouter",
    model: "poolside/laguna-xs-2.1:free",
  },
};

interface ResponseCardProps {
  fighter: Fighter;
  content: string | null;
  loading: boolean;
  isWinner?: boolean;
}

export function ResponseCard({
  fighter,
  content,
  loading,
  isWinner,
}: ResponseCardProps) {
  const style = FIGHTER_STYLES[fighter];

  return (
    <div
      className={cn(
        "rounded-2xl border border-zinc-800/80 bg-gradient-to-b from-zinc-900 to-zinc-950 p-5 shadow-lg transition-all duration-300",
        isWinner && cn("ring-2", style.ring),
      )}
    >
      {/* Header */}

      <div className="mb-5 flex items-start justify-between">

        <div className="flex items-start gap-3">

          <div
            className={cn(
              "mt-1 h-2.5 w-2.5 rounded-full",
              style.dot
            )}
          />

          <div>

            <div className="flex items-center gap-2">

              <span
                className={cn(
                  "rounded-md border px-2.5 py-1 text-xs font-semibold tracking-wide",
                  style.badge
                )}
              >
                {style.label}
              </span>

              <Brain className={cn("h-4 w-4", style.accent)} />

            </div>

            <p className="mt-2 font-mono text-xs text-zinc-500">
              {style.model}
            </p>

          </div>

        </div>

        {isWinner && (
          <div className="flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-xs font-medium text-emerald-300">
              Top Performer
            </span>
          </div>
        )}

      </div>

      {/* Body */}

      {loading ? (
        <div>

          <div className="mb-5 flex items-center gap-2 text-zinc-500">
            <Sparkles className="h-4 w-4 animate-pulse" />
            <span className="text-sm">
              Generating response...
            </span>
          </div>

          <div className="space-y-3">
            <Skeleton className="h-4 w-full bg-zinc-800" />
            <Skeleton className="h-4 w-11/12 bg-zinc-800" />
            <Skeleton className="h-4 w-5/6 bg-zinc-800" />
            <Skeleton className="h-4 w-4/5 bg-zinc-800" />
            <Skeleton className="h-4 w-3/5 bg-zinc-800" />
          </div>

        </div>
      ) : content ? (
        <div>

          <div className="mb-4 border-b border-zinc-800 pb-3">
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              Model Response
            </p>
          </div>

          <div className="max-h-[520px] overflow-y-auto pr-2">
            <p className="whitespace-pre-wrap text-sm leading-7 text-zinc-300">
              {content}
            </p>
          </div>

        </div>
      ) : (
        <div className="flex min-h-[220px] flex-col items-center justify-center text-center">

          <Brain className="mb-4 h-10 w-10 text-zinc-700" />

          <h3 className="text-base font-semibold text-zinc-300">
            Awaiting Response
          </h3>

          <p className="mt-2 max-w-xs text-sm leading-6 text-zinc-500">
            Once the comparison begins, this model's complete response will be
            displayed here for side-by-side evaluation.
          </p>

        </div>
      )}
    </div>
  );
}