"use client";

import { Loader2, Sparkles, SendHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface QuestionInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
}

export function QuestionInput({
  value,
  onChange,
  onSubmit,
  loading,
}: QuestionInputProps) {
  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      if (!loading && value.trim()) onSubmit();
    }
  }

  return (
    <div className="rounded-2xl border border-zinc-800/80 bg-gradient-to-b from-zinc-900 to-zinc-950 p-4 shadow-xl">

      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-sm font-semibold text-zinc-200">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            Prompt Arena
          </h3>

          <p className="mt-1 text-xs text-zinc-500">
            Submit a single prompt to evaluate responses across multiple AI
            models.
          </p>
        </div>
      </div>

      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask a question, describe a task, or provide a prompt for the models to evaluate..."
        rows={5}
        className="resize-none rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus-visible:border-cyan-500/50 focus-visible:ring-1 focus-visible:ring-cyan-500/20"
      />

      <div className="mt-4 flex items-center justify-between">

        <div className="space-y-1">
          <p className="text-xs font-medium text-zinc-400">
            Keyboard Shortcut
          </p>

          <p className="text-xs text-zinc-500">
            Press{" "}
            <span className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-zinc-300">
              Ctrl
            </span>{" "}
            +{" "}
            <span className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-zinc-300">
              Enter
            </span>{" "}
            to submit instantly.
          </p>
        </div>

        <Button
          onClick={onSubmit}
          disabled={loading || !value.trim()}
          className="h-11 gap-2 rounded-lg bg-cyan-500 px-5 font-medium text-zinc-950 transition-all hover:bg-cyan-400 disabled:bg-zinc-800 disabled:text-zinc-500"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Evaluating...
            </>
          ) : (
            <>
              <SendHorizontal className="h-4 w-4" />
              Run Comparison
            </>
          )}
        </Button>

      </div>
    </div>
  );
}