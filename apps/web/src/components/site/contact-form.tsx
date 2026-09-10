"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Send } from "lucide-react";
import { Button } from "@charm/ui/button";
import { Input } from "@charm/ui/input";
import { Label } from "@charm/ui/label";
import { Textarea } from "@charm/ui/textarea";
import { toast } from "@charm/ui/sonner";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { whatsappLink } from "@/lib/format";

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

export function ContactForm({ whatsapp }: { whatsapp: string }) {
  const searchParams = useSearchParams();
  const interestedIn = searchParams.get("package") ?? "";

  const [values, setValues] = useState({ name: "", email: "", subject: "", message: "" });
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
          name: values.name,
          email: values.email,
          subject: values.subject,
          message: values.message,
          interestedIn,
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

      toast.success("Thanks for reaching out. I'll get back to you shortly.");
      setValues({ name: "", email: "", subject: "", message: "" });
    } catch {
      toast.error("Could not send your message. Please try WhatsApp or email instead.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const whatsappHref = whatsappLink(
    whatsapp,
    values.name || values.message
      ? `Hi Charm, I'm ${values.name || "getting in touch"}.\n\n${values.message}`
      : "Hi Charm, I would like to discuss a project.",
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 sm:p-8"
      noValidate
    >
      <div className="space-y-6">
        {interestedIn ? (
          <p className="rounded-xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm text-primary">
            Enquiring about the <strong className="capitalize">{interestedIn}</strong> package.
          </p>
        ) : null}

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

        <div>
          <Label htmlFor="subject" className="mb-2 block">
            Subject <span className="text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id="subject"
            name="subject"
            value={values.subject}
            onChange={(event) => update("subject")(event.target.value)}
            placeholder="New mobile app project"
          />
        </div>

        <div>
          <Label htmlFor="message" className="mb-2 block">
            Your message
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
            placeholder="Tell me about your project, timeline and budget..."
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
            {isSubmitting ? "Sending..." : "Send message"}
          </Button>

          <Button asChild size="lg" variant="whatsapp" className="w-full">
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp me
            </a>
          </Button>
        </div>
      </div>
    </form>
  );
}
