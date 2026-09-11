"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@charm/ui/button";
import { Input } from "@charm/ui/input";
import { Label } from "@charm/ui/label";
import { Textarea } from "@charm/ui/textarea";
import { toast } from "@charm/ui/sonner";
import { cn } from "@charm/ui/cn";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { whatsappLink } from "@/lib/format";

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

const PROJECT_TYPES = [
  "New website",
  "Web application",
  "Mobile app (iOS/Android)",
  "E-commerce",
  "AI integration",
  "Redesign / rebuild",
  "Other",
];

const BUDGETS = [
  "Under $1,000",
  "$1,000 - $3,000",
  "$3,000 - $7,000",
  "$7,000+",
  "Not sure yet",
];

const TIMELINES = ["ASAP", "Within a month", "1-3 months", "Flexible / just exploring"];

const selectClassName =
  "flex h-10 w-full items-center rounded-xl border border-input bg-background px-4 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

export function ProjectInquiryForm({ whatsapp }: { whatsapp: string }) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    company: "",
    projectType: PROJECT_TYPES[0]!,
    budget: BUDGETS[0]!,
    timeline: TIMELINES[0]!,
    currentUrl: "",
    message: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const update = (field: keyof typeof values) => (value: string) => {
    setValues((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "project",
          name: values.name,
          email: values.email,
          company: values.company,
          projectType: values.projectType,
          budget: values.budget,
          timeline: values.timeline,
          currentUrl: values.currentUrl,
          message: values.message,
          interestedIn: values.projectType,
          // Honeypot: a real user never sees or fills this.
          website: (formData.get("website") as string) || "",
        }),
      });

      const result = (await response.json()) as {
        ok?: boolean;
        error?: string;
        fieldErrors?: FieldErrors;
      };

      if (!response.ok || !result.ok) {
        if (result.fieldErrors) setErrors(result.fieldErrors);
        toast.error(result.error || "Something went wrong. Please try again.");
        return;
      }

      toast.success("Thanks! I'll review your project and get back to you shortly.");
      setValues({
        name: "",
        email: "",
        company: "",
        projectType: PROJECT_TYPES[0]!,
        budget: BUDGETS[0]!,
        timeline: TIMELINES[0]!,
        currentUrl: "",
        message: "",
      });
    } catch {
      toast.error("Could not send your project details. Please try WhatsApp or email instead.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const whatsappHref = whatsappLink(
    whatsapp,
    values.name || values.message
      ? `Hi Charm, I'm ${values.name || "getting in touch"} about a ${values.projectType.toLowerCase()} project.\n\n${values.message}`
      : "Hi Charm, I would like to discuss a new project.",
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 sm:p-8"
      noValidate
    >
      <div className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <Label htmlFor="name" className="mb-2 block">
              Your name
            </Label>
            <Input
              id="name"
              name="name"
              autoComplete="name"
              required
              value={values.name}
              onChange={(event) => update("name")(event.target.value)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
              placeholder="Jane Doe"
            />
            {errors.name ? (
              <p id="name-error" className="mt-1 text-sm text-destructive">
                {errors.name}
              </p>
            ) : null}
          </div>

          <div>
            <Label htmlFor="email" className="mb-2 block">
              Your email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={values.email}
              onChange={(event) => update("email")(event.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              placeholder="jane@example.com"
            />
            {errors.email ? (
              <p id="email-error" className="mt-1 text-sm text-destructive">
                {errors.email}
              </p>
            ) : null}
          </div>
        </div>

        <div>
          <Label htmlFor="company" className="mb-2 block">
            Company <span className="text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id="company"
            name="company"
            value={values.company}
            onChange={(event) => update("company")(event.target.value)}
            placeholder="Acme Inc."
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <Label htmlFor="projectType" className="mb-2 block">
              Project type
            </Label>
            <select
              id="projectType"
              name="projectType"
              className={cn(selectClassName)}
              value={values.projectType}
              onChange={(event) => update("projectType")(event.target.value)}
            >
              {PROJECT_TYPES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="budget" className="mb-2 block">
              Budget
            </Label>
            <select
              id="budget"
              name="budget"
              className={cn(selectClassName)}
              value={values.budget}
              onChange={(event) => update("budget")(event.target.value)}
            >
              {BUDGETS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="timeline" className="mb-2 block">
              Timeline
            </Label>
            <select
              id="timeline"
              name="timeline"
              className={cn(selectClassName)}
              value={values.timeline}
              onChange={(event) => update("timeline")(event.target.value)}
            >
              {TIMELINES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <Label htmlFor="currentUrl" className="mb-2 block">
            Current website <span className="text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id="currentUrl"
            name="currentUrl"
            type="url"
            value={values.currentUrl}
            onChange={(event) => update("currentUrl")(event.target.value)}
            placeholder="https://example.com"
          />
        </div>

        <div>
          <Label htmlFor="message" className="mb-2 block">
            Tell me about the project
          </Label>
          <Textarea
            id="message"
            name="message"
            required
            rows={6}
            value={values.message}
            onChange={(event) => update("message")(event.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            placeholder="What are you building? Any features, integrations or references I should know about?"
            className="resize-none"
          />
          {errors.message ? (
            <p id="message-error" className="mt-1 text-sm text-destructive">
              {errors.message}
            </p>
          ) : null}
        </div>

        {/* Honeypot. Hidden from users and assistive tech; bots fill it in. */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Leave this field empty</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
            <Send className="h-4 w-4" aria-hidden="true" />
            {isSubmitting ? "Sending..." : "Submit project details"}
          </Button>

          <Button asChild size="lg" variant="whatsapp" className="w-full">
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp me instead
            </a>
          </Button>
        </div>
      </div>
    </form>
  );
}
