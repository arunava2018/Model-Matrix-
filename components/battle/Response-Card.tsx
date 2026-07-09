"use client";

import { Brain, CheckCircle2, Sparkles } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export type Fighter = "groq" | "openrouter";

const FIGHTER_STYLES: Record<
  Fighter,
  {
    ring: string;
    badge: string;
    accent: string;
    label: string;
    model: string;
  }
> = {
  groq: {
    ring: "ring-foreground/30",
    badge: "border-foreground/30 bg-muted text-foreground",
    accent: "text-foreground",
    label: "Groq",
    model: "openai/gpt-oss-20b",
  },
  openrouter: {
    ring: "ring-foreground/30",
    badge: "border-foreground/30 bg-muted text-foreground",
    accent: "text-foreground",
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
        "rounded-2xl border border-border bg-card p-5 shadow-lg transition-all duration-300 text-card-foreground",
        isWinner && cn("ring-2", style.ring),
      )}
    >
      {/* Header */}

      <div className="mb-5 flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "rounded-md border px-2.5 py-1 text-xs font-semibold tracking-wide",
                  style.badge,
                )}
              >
                {style.label}
              </span>
              <span className=" font-mono text-xs text-muted-foreground">
                {style.model}
              </span>
            </div>
          </div>
        </div>

        {isWinner && (
          <div className="flex items-center gap-1 rounded-full border border-foreground/30 bg-muted px-3 py-1">
            <CheckCircle2 className="h-3.5 w-3.5 text-foreground" />
            <span className="text-xs font-medium text-foreground">
              Top Performer
            </span>
          </div>
        )}
      </div>

      {/* Body */}

      {loading ? (
        <div>
          <div className="mb-5 flex items-center gap-2 text-muted-foreground">
            <Sparkles className="h-4 w-4 animate-pulse" />
            <span className="text-sm">Generating response...</span>
          </div>

          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-3/5" />
          </div>
        </div>
      ) : content ? (
        <div>
          <div className="mb-4 border-b border-border pb-3">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Model Response
            </p>
          </div>

          <div className="max-h-[520px] overflow-y-auto pr-2">
            <p className="whitespace-pre-wrap text-sm leading-7 text-foreground/80">
              {content}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex min-h-[220px] flex-col items-center justify-center text-center">
          <Brain className="mb-4 h-10 w-10 text-muted-foreground" />

          <h3 className="text-base font-semibold text-foreground/80">
            Awaiting Response
          </h3>

          <p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
            Once the comparison begins, this model's complete response will be
            displayed here for side-by-side evaluation.
          </p>
        </div>
      )}
    </div>
  );
}
