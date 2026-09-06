import { z } from "zod";

/** Lowercase, hyphenated, URL-safe. Slugs are part of the public URL and SEO surface. */
export const slugSchema = z
  .string()
  .min(1, "Slug is required")
  .max(120)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens only");

const optionalUrl = z.union([z.string().url(), z.literal("")]).default("");

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required").max(160),
  slug: slugSchema,
  description: z.string().min(1, "Short description is required").max(400),
  fullDescription: z.string().max(4000).default(""),
  body: z.string().default(""),
  technologies: z.array(z.string()).default([]),
  coverImage: optionalUrl,
  liveUrl: optionalUrl,
  repoUrl: optionalUrl,
  client: z.string().default(""),
  category: z.string().default("Web"),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  order: z.number().int().default(0),
  completedAt: z.coerce.date().nullable().optional(),
  seoTitle: z.string().max(70, "Keep under 70 characters so it is not truncated").default(""),
  seoDescription: z
    .string()
    .max(160, "Keep under 160 characters so it is not truncated")
    .default(""),
});

export const postSchema = z.object({
  title: z.string().min(1, "Title is required").max(160),
  slug: slugSchema,
  excerpt: z.string().min(1, "Excerpt is required").max(400),
  body: z.string().default(""),
  coverImage: optionalUrl,
  category: z.string().default("Web Development"),
  tags: z.array(z.string()).default([]),
  readTimeMinutes: z.number().int().min(1).max(120).default(5),
  published: z.boolean().default(true),
  featured: z.boolean().default(false),
  publishedAt: z.coerce.date().default(() => new Date()),
  seoTitle: z.string().max(70).default(""),
  seoDescription: z.string().max(160).default(""),
});

export const testimonialSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().default(""),
  company: z.string().default(""),
  content: z.string().min(1, "Testimonial text is required").max(2000),
  avatar: z.string().max(3).default(""),
  avatarUrl: optionalUrl,
  website: optionalUrl,
  rating: z.number().min(1).max(5).default(5),
  verified: z.boolean().default(false),
  published: z.boolean().default(true),
  order: z.number().int().default(0),
});

export const servicePackageSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: slugSchema,
  price: z.string().min(1, "Price is required"),
  priceValue: z.number().min(0).default(0),
  currency: z.string().default("USD"),
  period: z.string().default("one-time"),
  description: z.string().default(""),
  features: z.array(z.string()).default([]),
  deliveryTime: z.string().default(""),
  icon: z.string().default("Sparkles"),
  gradient: z.string().default("gold"),
  highlighted: z.boolean().default(false),
  published: z.boolean().default(true),
  order: z.number().int().default(0),
});

export const addOnSchema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.string().min(1, "Price is required"),
  description: z.string().default(""),
  published: z.boolean().default(true),
  order: z.number().int().default(0),
});

export const experienceSchema = z.object({
  role: z.string().min(1, "Role is required"),
  company: z.string().min(1, "Company is required"),
  companyUrl: optionalUrl,
  location: z.string().default(""),
  period: z.string().default(""),
  startDate: z.coerce.date().nullable().optional(),
  endDate: z.coerce.date().nullable().optional(),
  current: z.boolean().default(false),
  responsibilities: z.array(z.string()).default([]),
  published: z.boolean().default(true),
  order: z.number().int().default(0),
});

export const skillCategorySchema = z.object({
  title: z.string().min(1, "Title is required"),
  icon: z.string().default("Code2"),
  skills: z.array(z.string()).default([]),
  published: z.boolean().default(true),
  order: z.number().int().default(0),
});

/** Public-facing contact form. Deliberately strict — this endpoint is unauthenticated. */
export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name").max(120),
  email: z.string().email("Please enter a valid email address").max(200),
  subject: z.string().max(200).default(""),
  message: z.string().min(10, "Please tell me a little more about your project").max(5000),
  budget: z.string().max(100).default(""),
  interestedIn: z.string().max(120).default(""),
  /**
   * Honeypot. Bots fill hidden fields; humans never see it.
   *
   * Deliberately permissive here: rejecting it during validation would return a
   * field error naming the trap, telling a bot exactly what to omit next time.
   * The route accepts the request, discards it, and replies with a normal
   * success so the bot learns nothing.
   */
  website: z.string().max(200).optional().default(""),
});

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const siteSettingsSchema = z.object({
  fullName: z.string().min(1),
  shortName: z.string().default(""),
  initials: z.string().max(4).default(""),
  jobTitle: z.string().default(""),
  tagline: z.string().default(""),
  roles: z.array(z.string()).default([]),
  heroHeadline: z.string().default(""),
  heroHighlight: z.string().default(""),
  heroIntro: z.string().default(""),
  aboutParagraphs: z.array(z.string()).default([]),
  profileImage: z.string().default("/profile.png"),
  resumeUrl: z.string().default(""),
  yearsExperience: z.number().int().min(0).max(60).default(5),
  email: z.string().email().or(z.literal("")).default(""),
  phone: z.string().default(""),
  whatsapp: z.string().default(""),
  location: z.string().default(""),
  addressLocality: z.string().default(""),
  addressCountry: z.string().default(""),
  availability: z.string().default(""),
  social: z
    .object({
      github: optionalUrl,
      linkedin: optionalUrl,
      twitter: optionalUrl,
      instagram: optionalUrl,
      facebook: optionalUrl,
    })
    .default({}),
  seo: z
    .object({
      siteUrl: z.string().url().default("https://www.charmthiekshana.com"),
      defaultTitle: z.string().max(70).default(""),
      titleTemplate: z.string().default("%s | Charm Perera"),
      defaultDescription: z.string().max(160).default(""),
      keywords: z.array(z.string()).default([]),
      ogImage: z.string().default(""),
      twitterHandle: z.string().default(""),
      googleSiteVerification: z.string().default(""),
      bingSiteVerification: z.string().default(""),
    })
    .default({}),
  faqs: z
    .array(
      z.object({
        question: z.string().min(1),
        answer: z.string().min(1),
        order: z.number().int().default(0),
      }),
    )
    .default([]),
  technologies: z.array(z.string()).default([]),
});

/**
 * `z.input` (not `z.infer`) is deliberate: these describe what you *write*, so
 * fields with a schema default stay optional. The parsed result is typed by the
 * schema itself at each call site, where defaults are already applied.
 */
export type ProjectInput = z.input<typeof projectSchema>;
export type PostInput = z.input<typeof postSchema>;
export type TestimonialInput = z.input<typeof testimonialSchema>;
export type ServicePackageInput = z.input<typeof servicePackageSchema>;
export type AddOnInput = z.input<typeof addOnSchema>;
export type ExperienceInput = z.input<typeof experienceSchema>;
export type SkillCategoryInput = z.input<typeof skillCategorySchema>;
export type ContactInput = z.input<typeof contactSchema>;
export type LoginInput = z.input<typeof loginSchema>;
export type SiteSettingsInput = z.input<typeof siteSettingsSchema>;

/** Fully-resolved shapes, after Zod has applied defaults. */
export type ProjectData = z.output<typeof projectSchema>;
export type PostData = z.output<typeof postSchema>;
export type SiteSettingsData = z.output<typeof siteSettingsSchema>;

/** Turn an arbitrary title into a URL slug. Used by the admin "generate slug" button. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 120)
    .replace(/^-|-$/g, "");
}
