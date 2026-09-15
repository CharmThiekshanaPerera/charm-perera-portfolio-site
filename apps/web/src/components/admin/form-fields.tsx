"use client";

import { useId, useState } from "react";
import { useFormStatus } from "react-dom";
import { AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@charm/ui/button";
import { Input } from "@charm/ui/input";
import { Label } from "@charm/ui/label";
import { Textarea } from "@charm/ui/textarea";
import { Switch } from "@charm/ui/switch";
import { cn } from "@charm/ui/cn";

type BaseProps = {
  name: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
};

function FieldShell({
  id,
  label,
  hint,
  error,
  required,
  className,
  children,
}: {
  id: string;
  children: React.ReactNode;
} & Omit<BaseProps, "name">) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id}>
        {label}
        {required ? <span className="ml-1 text-destructive">*</span> : null}
      </Label>
      {children}
      {hint && !error ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
      {error ? (
        <p id={`${id}-error`} className="text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function TextField({
  name,
  label,
  hint,
  error,
  required,
  className,
  type = "text",
  defaultValue,
  placeholder,
}: BaseProps & {
  type?: string;
  // Mongoose returns null for unset fields, so accept it and coerce below.
  defaultValue?: string | number | null;
  placeholder?: string;
}) {
  const id = useId();
  return (
    <FieldShell
      id={id}
      label={label}
      hint={hint}
      error={error}
      required={required}
      className={className}
    >
      <Input
        id={id}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
      />
    </FieldShell>
  );
}

/**
 * Same job as TextField, plus a "Test" button that pings the URL server-side
 * and reports whether it actually works — reachable, and for images
 * specifically whether the response is really an image (not, say, an HTML
 * error page silently served with a 200). Controlled (unlike TextField)
 * because the check button needs to read whatever's currently typed, not
 * just what was last saved.
 */
export function UrlCheckField({
  name,
  label,
  hint,
  error,
  className,
  defaultValue,
  kind,
}: BaseProps & {
  defaultValue?: string | null;
  /** "image" validates Content-Type; "frame" checks X-Frame-Options/CSP. */
  kind: "image" | "frame";
}) {
  const id = useId();
  const [value, setValue] = useState(defaultValue ?? "");
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  async function runCheck() {
    const url = value.trim();
    if (!url) return;
    setChecking(true);
    setResult(null);
    try {
      const response = await fetch("/api/admin/check-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, kind }),
      });
      const data = (await response.json()) as { ok: boolean; message: string };
      setResult(data);
    } catch {
      setResult({ ok: false, message: "Couldn't run the check — try again." });
    } finally {
      setChecking(false);
    }
  }

  return (
    <FieldShell id={id} label={label} hint={hint} error={error} className={className}>
      <div className="flex gap-2">
        <Input
          id={id}
          name={name}
          type="url"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            setResult(null);
          }}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <Button
          type="button"
          variant="outline"
          onClick={runCheck}
          disabled={checking || !value.trim()}
        >
          {checking ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : "Test"}
        </Button>
      </div>
      {result ? (
        <p
          role="status"
          className={cn(
            "flex items-start gap-1.5 text-xs",
            result.ok ? "text-primary" : "text-destructive",
          )}
        >
          {result.ok ? (
            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
          ) : (
            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
          )}
          {result.message}
        </p>
      ) : null}
    </FieldShell>
  );
}

export function TextAreaField({
  name,
  label,
  hint,
  error,
  required,
  className,
  rows = 4,
  defaultValue,
  placeholder,
  mono,
}: BaseProps & {
  rows?: number;
  defaultValue?: string | null;
  placeholder?: string;
  mono?: boolean;
}) {
  const id = useId();
  return (
    <FieldShell
      id={id}
      label={label}
      hint={hint}
      error={error}
      required={required}
      className={className}
    >
      <Textarea
        id={id}
        name={name}
        rows={rows}
        required={required}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={mono ? "font-mono text-xs leading-relaxed" : undefined}
      />
    </FieldShell>
  );
}

/**
 * Boolean toggle. Radix Switch is not a native input, so a hidden checkbox
 * carries the value into the FormData the server action receives.
 */
export function SwitchField({
  name,
  label,
  hint,
  defaultChecked,
}: {
  name: string;
  label: string;
  hint?: string;
  defaultChecked?: boolean;
}) {
  const id = useId();
  const [checked, setChecked] = useState(Boolean(defaultChecked));

  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-border bg-card p-4">
      <div>
        <Label htmlFor={id}>{label}</Label>
        {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
      </div>
      <input type="hidden" name={name} value={checked ? "on" : "off"} />
      <Switch id={id} checked={checked} onCheckedChange={setChecked} />
    </div>
  );
}

/**
 * Title field that can generate the slug beside it. Keeping slugs stable
 * matters for SEO, so this only fills an empty slug — it never overwrites one
 * that already exists on a published item.
 */
export function TitleSlugFields({
  titleName = "title",
  titleLabel = "Title",
  defaultTitle = "",
  defaultSlug = "",
  errors,
  slugPrefix,
}: {
  titleName?: string;
  titleLabel?: string;
  defaultTitle?: string;
  defaultSlug?: string;
  errors?: Record<string, string>;
  slugPrefix: string;
}) {
  const [title, setTitle] = useState(defaultTitle);
  const [slug, setSlug] = useState(defaultSlug);
  const titleId = useId();
  const slugId = useId();

  function slugify(value: string) {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 120)
      .replace(/^-|-$/g, "");
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <FieldShell id={titleId} label={titleLabel} error={errors?.title} required>
        <Input
          id={titleId}
          name={titleName}
          required
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </FieldShell>

      <FieldShell
        id={slugId}
        label="Slug"
        required
        error={errors?.slug}
        hint={`${slugPrefix}/${slug || "your-slug"}`}
      >
        <div className="flex gap-2">
          <Input
            id={slugId}
            name="slug"
            required
            value={slug}
            onChange={(event) => setSlug(event.target.value)}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => setSlug(slugify(title))}
            title="Generate slug from the title"
          >
            Generate
          </Button>
        </div>
      </FieldShell>
    </div>
  );
}

export function SubmitButton({
  children = "Save",
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending} className={className}>
      {pending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
      {pending ? "Saving..." : children}
    </Button>
  );
}

export function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p
      role="alert"
      className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
    >
      {message}
    </p>
  );
}

export function FormSuccess({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p
      role="status"
      className="rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary"
    >
      {message}
    </p>
  );
}
