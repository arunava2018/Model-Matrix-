export type ModelKey = "groq" | "openrouter";

export interface ModelMeta {
  key: ModelKey;
  label: string;
  model: string;
  accent: string; // tailwind color token, e.g. "orange"
}

export interface ScoreEntry {
  model: string;
  score: number; // 0-10
}

export interface JudgeVerdict {
  winner: string;
  reason: string;
  scores: ScoreEntry[];
}

export interface BattleResult {
  question: string;
  responses: Record<ModelKey, string>;
  latencyMs: number;
  verdict: JudgeVerdict;
}

export interface BattleError {
  error: string;
}
