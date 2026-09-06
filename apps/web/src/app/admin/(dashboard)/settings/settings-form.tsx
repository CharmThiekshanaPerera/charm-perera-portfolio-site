"use client";

import { useActionState, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@charm/ui/button";
import { Input } from "@charm/ui/input";
import { Label } from "@charm/ui/label";
import { Textarea } from "@charm/ui/textarea";
import {
  FormError,
  FormSuccess,
  SubmitButton,
  TextAreaField,
  TextField,
} from "@/components/admin/form-fields";
import { saveSettings, type ActionState } from "../../actions";

type Faq = { question: string; answer: string };

/**
 * Mongoose marks nested subdocuments as nullable, so every field is optional
 * and nullable here. The form treats a missing value the same as an empty one.
 */
type Nullable<T> = T | null | undefined;

type SettingsValues = {
  fullName?: Nullable<string>;
  shortName?: Nullable<string>;
  initials?: Nullable<string>;
  jobTitle?: Nullable<string>;
  tagline?: Nullable<string>;
  roles?: Nullable<string[]>;
  heroHeadline?: Nullable<string>;
  heroHighlight?: Nullable<string>;
  heroIntro?: Nullable<string>;
  aboutParagraphs?: Nullable<string[]>;
  profileImage?: Nullable<string>;
  resumeUrl?: Nullable<string>;
  yearsExperience?: Nullable<number>;
  email?: Nullable<string>;
  phone?: Nullable<string>;
  whatsapp?: Nullable<string>;
  location?: Nullable<string>;
  addressLocality?: Nullable<string>;
  addressCountry?: Nullable<string>;
  availability?: Nullable<string>;
  social?: Nullable<Record<string, Nullable<string>>>;
  seo?: Nullable<Record<string, unknown>>;
  faqs?: Nullable<Faq[]>;
  technologies?: Nullable<string[]>;
};

export function SettingsForm({ settings }: { settings: SettingsValues }) {
  const [state, formAction] = useActionState<ActionState, FormData>(saveSettings, {});
  const [faqs, setFaqs] = useState<Faq[]>(
    settings.faqs && settings.faqs.length > 0
      ? settings.faqs
      : [{ question: "", answer: "" }],
  );

  const errors = state.fieldErrors ?? {};
  const seo = (settings.seo ?? {}) as Record<string, string | string[]>;
  const social = settings.social ?? {};
  const socialValue = (key: string) => social[key] ?? "";

  const updateFaq = (index: number, key: keyof Faq, value: string) => {
    setFaqs((previous) =>
      previous.map((faq, faqIndex) => (faqIndex === index ? { ...faq, [key]: value } : faq)),
    );
  };

  return (
    <form action={formAction} className="space-y-8">
      <FormError message={state.error} />
      <FormSuccess message={state.ok ? "Settings saved and the site cache was refreshed." : undefined} />

      <section className="space-y-4 rounded-2xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold">Identity</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <TextField
            name="fullName"
            label="Full name"
            required
            defaultValue={settings.fullName}
            error={errors.fullName}
          />
          <TextField name="shortName" label="Short name" defaultValue={settings.shortName} />
          <TextField
            name="initials"
            label="Logo initials"
            defaultValue={settings.initials}
            hint="Shown in the header."
          />
          <TextField name="jobTitle" label="Job title" defaultValue={settings.jobTitle} />
          <TextField
            name="yearsExperience"
            label="Years of experience"
            type="number"
            defaultValue={settings.yearsExperience}
          />
          <TextField
            name="profileImage"
            label="Profile image path"
            defaultValue={settings.profileImage}
            hint="A file in /public, e.g. /profile.png"
          />
        </div>

        <TextField
          name="tagline"
          label="Tagline"
          defaultValue={settings.tagline}
          hint="Used on the generated social share image."
        />
      </section>

      <section className="space-y-4 rounded-2xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold">Hero &amp; about</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <TextField
            name="heroHeadline"
            label="Hero headline"
            defaultValue={settings.heroHeadline}
            hint="First line of the h1 (gold)."
          />
          <TextField
            name="heroHighlight"
            label="Hero second line"
            defaultValue={settings.heroHighlight}
          />
        </div>

        <TextAreaField
          name="heroIntro"
          label="Hero intro paragraph"
          rows={4}
          defaultValue={settings.heroIntro}
        />

        <TextAreaField
          name="roles"
          label="Rotating roles"
          rows={5}
          defaultValue={settings.roles?.join("\n")}
          hint="One per line. Animated in the hero."
        />

        <TextAreaField
          name="aboutParagraphs"
          label="About paragraphs"
          rows={10}
          defaultValue={settings.aboutParagraphs?.join("\n\n")}
          hint="Separate paragraphs with a blank line."
        />
      </section>

      <section className="space-y-4 rounded-2xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold">Contact</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <TextField
            name="email"
            label="Email"
            type="email"
            defaultValue={settings.email}
            error={errors.email}
          />
          <TextField name="phone" label="Phone" defaultValue={settings.phone} />
          <TextField
            name="whatsapp"
            label="WhatsApp number"
            defaultValue={settings.whatsapp}
            hint="Digits only, including country code."
          />
          <TextField name="location" label="Location" defaultValue={settings.location} />
          <TextField
            name="addressLocality"
            label="City"
            defaultValue={settings.addressLocality}
            hint="Used in structured data."
          />
          <TextField
            name="addressCountry"
            label="Country code"
            defaultValue={settings.addressCountry}
            hint="Two letters, e.g. LK"
          />
        </div>

        <TextField
          name="availability"
          label="Availability note"
          defaultValue={settings.availability}
        />
      </section>

      <section className="space-y-4 rounded-2xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold">Social profiles</h2>
        <p className="text-sm text-muted-foreground">
          These become the <code>sameAs</code> list in your Person structured data, which helps
          search engines connect your profiles to this site.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {(["github", "linkedin", "twitter", "instagram", "facebook"] as const).map((key) => (
            <TextField
              key={key}
              name={key}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              type="url"
              defaultValue={socialValue(key)}
              error={errors[`social.${key}`]}
            />
          ))}
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold">SEO defaults</h2>

        <TextField
          name="siteUrl"
          label="Canonical site URL"
          type="url"
          required
          defaultValue={(seo.siteUrl as string) ?? ""}
          error={errors["seo.siteUrl"]}
          hint="No trailing slash. Drives canonical tags, the sitemap and robots.txt."
        />

        <TextField
          name="defaultTitle"
          label="Default title"
          defaultValue={(seo.defaultTitle as string) ?? ""}
          error={errors["seo.defaultTitle"]}
          hint="Home page title. Keep under 70 characters."
        />

        <TextField
          name="titleTemplate"
          label="Title template"
          defaultValue={(seo.titleTemplate as string) ?? ""}
          hint="Use %s for the page title, e.g. %s | Charm Perera"
        />

        <TextAreaField
          name="defaultDescription"
          label="Default meta description"
          rows={3}
          defaultValue={(seo.defaultDescription as string) ?? ""}
          error={errors["seo.defaultDescription"]}
          hint="Up to 160 characters."
        />

        <TextAreaField
          name="keywords"
          label="Keywords"
          rows={3}
          defaultValue={
            Array.isArray(seo.keywords) ? (seo.keywords as string[]).join(", ") : ""
          }
          hint="Comma separated. Minor ranking value, but harmless."
        />

        <TextAreaField
          name="technologies"
          label="Technology list"
          rows={3}
          defaultValue={settings.technologies?.join(", ")}
          hint="Comma separated. Shown as chips and used in structured data."
        />

        <div className="grid gap-4 md:grid-cols-2">
          <TextField
            name="twitterHandle"
            label="Twitter handle"
            defaultValue={(seo.twitterHandle as string) ?? ""}
            hint="Including the @"
          />
          <TextField
            name="ogImage"
            label="Custom OG image URL"
            defaultValue={(seo.ogImage as string) ?? ""}
            hint="Leave empty to use the generated card."
          />
          <TextField
            name="googleSiteVerification"
            label="Google verification token"
            defaultValue={(seo.googleSiteVerification as string) ?? ""}
          />
          <TextField
            name="bingSiteVerification"
            label="Bing verification token"
            defaultValue={(seo.bingSiteVerification as string) ?? ""}
          />
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">FAQs</h2>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setFaqs((previous) => [...previous, { question: "", answer: "" }])}
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add FAQ
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          These render visibly on the home page, /about and /services, and are published as
          FAQPage structured data. Google requires the markup to match visible content, so the
          two are always generated from this one list.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="space-y-2 rounded-xl border border-border p-4">
              <div className="flex items-center justify-between">
                <Label htmlFor={`faq-q-${index}`}>Question {index + 1}</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={`Remove question ${index + 1}`}
                  onClick={() =>
                    setFaqs((previous) => previous.filter((_, i) => i !== index))
                  }
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Input
                id={`faq-q-${index}`}
                name="faqQuestion"
                value={faq.question}
                onChange={(event) => updateFaq(index, "question", event.target.value)}
              />
              <Textarea
                name="faqAnswer"
                rows={3}
                value={faq.answer}
                onChange={(event) => updateFaq(index, "answer", event.target.value)}
                aria-label={`Answer ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </section>

      <SubmitButton>Save settings</SubmitButton>
    </form>
  );
}
