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
    <div className="rounded-2xl border border-border bg-card text-card-foreground p-4 shadow-xl">

      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Sparkles className="h-4 w-4 text-foreground" />
            Prompt Arena
          </h3>

          <p className="mt-1 text-xs text-muted-foreground">
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
        disabled={loading}
        className="resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-indigo-500/50 focus-visible:ring-1 focus-visible:ring-indigo-500/20 transition-all"
      />

      <div className="mt-4 flex items-center justify-between">

        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">
            Keyboard Shortcut
          </p>

          <p className="text-xs text-muted-foreground">
            Press{" "}
            <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-foreground">
              Ctrl
            </span>{" "}
            +{" "}
            <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-foreground">
              Enter
            </span>{" "}
            to submit instantly.
          </p>
        </div>

        <Button
          onClick={onSubmit}
          disabled={loading || !value.trim()}
          className="h-11 gap-2 rounded-lg bg-indigo-600 px-5 font-medium text-white transition-all hover:bg-indigo-500 disabled:bg-muted disabled:text-muted-foreground"
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