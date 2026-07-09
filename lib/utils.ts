import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { JudgeVerdict, ScoreEntry } from "@/lib/types"

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function toScoreEntry(model: string, entry: unknown): ScoreEntry | null {
  if (!isRecord(entry)) return null

  const rawScore =
    typeof entry.total === "number"
      ? entry.total
      : typeof entry.score === "number"
        ? entry.score
        : undefined

  if (typeof rawScore !== "number") return null

  return {
    model,
    score: Math.max(0, Math.min(10, rawScore)),
  }
}

export function normalizeJudgeVerdict(verdict: unknown): JudgeVerdict {
  if (!isRecord(verdict)) {
    return {
      winner: "Tie",
      reason: "No evaluation available.",
      scores: [],
    }
  }

  const rawScores = verdict.scores

  const normalizedScores: ScoreEntry[] = Array.isArray(rawScores)
    ? rawScores
        .filter(isRecord)
        .map((entry) => {
          const model = typeof entry.model === "string" ? entry.model : ""
          const score = typeof entry.score === "number" ? entry.score : undefined

          return model && typeof score === "number"
            ? { model, score: Math.max(0, Math.min(10, score)) }
            : null
        })
        .filter((item): item is ScoreEntry => item !== null)
    : isRecord(rawScores)
      ? Object.entries(rawScores)
          .map(([model, entry]) => toScoreEntry(model, entry))
          .filter((item): item is ScoreEntry => item !== null)
      : []

  return {
    winner: typeof verdict.winner === "string" ? verdict.winner : "Tie",
    reason: typeof verdict.reason === "string" ? verdict.reason : "No evaluation available.",
    scores: normalizedScores,
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
