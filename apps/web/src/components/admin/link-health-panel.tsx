"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertTriangle, CheckCircle2, Loader2, RefreshCw } from "lucide-react";
import { Badge } from "@charm/ui/badge";
import { Button } from "@charm/ui/button";
import { cn } from "@charm/ui/cn";

type CheckResult = {
  kind: "project" | "post";
  title: string;
  editHref: string;
  field: "liveUrl" | "coverImage";
  url: string;
  ok: boolean;
  message: string;
};

const FIELD_LABEL: Record<CheckResult["field"], string> = {
  liveUrl: "Live URL",
  coverImage: "Cover image",
};

export function LinkHealthPanel() {
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<CheckResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function runCheck() {
    setRunning(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/check-links", { method: "POST" });
      if (!response.ok) {
        setError("Couldn't run the check — try again.");
        return;
      }
      const data = (await response.json()) as { results: CheckResult[] };
      setResults(data.results);
    } catch {
      setError("Couldn't run the check — try again.");
    } finally {
      setRunning(false);
    }
  }

  const broken = results?.filter((r) => !r.ok) ?? [];
  const healthy = results?.filter((r) => r.ok) ?? [];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-card p-6">
        <Button type="button" onClick={runCheck} disabled={running}>
          {running ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
          )}
          {running ? "Checking…" : results ? "Run again" : "Run link check"}
        </Button>
        {results ? (
          <p className="text-sm text-muted-foreground">
            {broken.length === 0
              ? `All ${results.length} links look healthy.`
              : `${broken.length} of ${results.length} link${results.length === 1 ? "" : "s"} need attention.`}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            Checks every published and draft project&apos;s Live URL and cover image, plus
            every post&apos;s cover image. Takes a few seconds.
          </p>
        )}
        {error ? <p className="w-full text-sm text-destructive">{error}</p> : null}
      </div>

      {results ? (
        <div className="space-y-3">
          {broken.map((result, index) => (
            <ResultRow key={`${result.editHref}-${result.field}-${index}`} result={result} />
          ))}
          {healthy.map((result, index) => (
            <ResultRow key={`${result.editHref}-${result.field}-${index}`} result={result} />
          ))}
          {results.length === 0 ? (
            <p className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
              No live URLs or cover images set on any project or post yet.
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function ResultRow({ result }: { result: CheckResult }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-2xl border p-4 sm:flex-row sm:items-center sm:justify-between",
        result.ok ? "border-border bg-card" : "border-destructive/30 bg-destructive/5",
      )}
    >
      <div className="min-w-0 space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          {result.ok ? (
            <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
          ) : (
            <AlertTriangle className="h-4 w-4 flex-shrink-0 text-destructive" aria-hidden="true" />
          )}
          <span className="font-medium">{result.title}</span>
          <Badge variant="outline" className="capitalize">
            {result.kind}
          </Badge>
          <Badge variant="outline">{FIELD_LABEL[result.field]}</Badge>
        </div>
        <p className="truncate text-xs text-muted-foreground" title={result.url}>
          {result.url}
        </p>
        <p className={cn("text-sm", result.ok ? "text-muted-foreground" : "text-destructive")}>
          {result.message}
        </p>
      </div>
      <Button asChild variant="outline" size="sm" className="flex-shrink-0">
        <Link href={result.editHref}>Edit</Link>
      </Button>
    </div>
  );
}
