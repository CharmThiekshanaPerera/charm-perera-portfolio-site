"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  AddOn,
  AdminUser,
  Experience,
  Message,
  Post,
  Project,
  ServicePackage,
  SiteSettings,
  SkillCategory,
  Testimonial,
  addOnSchema,
  connectToDatabase,
  experienceSchema,
  postSchema,
  projectSchema,
  servicePackageSchema,
  siteSettingsSchema,
  skillCategorySchema,
  testimonialSchema,
} from "@charm/db";
import type { ZodSchema } from "zod";
import { requireSession } from "@/lib/auth";

export type ActionState = { ok?: boolean; error?: string; fieldErrors?: Record<string, string> };

/* ---------------------------------------------------------------- helpers */

/** Multi-value fields are edited as one-per-line textareas. */
function list(formData: FormData, key: string): string[] {
  return String(formData.get(key) ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

/** Comma-separated fields (tags, technologies, keywords). */
function csv(formData: FormData, key: string): string[] {
  return String(formData.get(key) ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function text(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function bool(formData: FormData, key: string): boolean {
  const value = formData.get(key);
  return value === "on" || value === "true";
}

function num(formData: FormData, key: string, fallback = 0): number {
  const parsed = Number(formData.get(key));
  return Number.isFinite(parsed) ? parsed : fallback;
}

function dateOrNull(formData: FormData, key: string): Date | null {
  const value = text(formData, key);
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function toFieldErrors(error: {
  issues: { path: (string | number)[]; message: string }[];
}): Record<string, string> {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const field = issue.path.join(".");
    if (field && !fieldErrors[field]) fieldErrors[field] = issue.message;
  }
  return fieldErrors;
}

/** Purges every public surface that could be showing the edited content. */
function revalidatePublic() {
  for (const path of ["/", "/about", "/projects", "/services", "/blog", "/contact"]) {
    revalidatePath(path);
  }
  revalidatePath("/projects/[slug]", "page");
  revalidatePath("/blog/[slug]", "page");
  revalidatePath("/sitemap.xml");
}

/**
 * Shared write path: authenticate, validate, upsert, purge caches.
 * Returns a state object on failure; redirects on success.
 */
async function persist<T>(
  schema: ZodSchema<T>,
  raw: unknown,
  write: (data: T) => Promise<void>,
  redirectTo: string,
  adminPath: string,
): Promise<ActionState> {
  await requireSession();

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return { error: "Please check the highlighted fields.", fieldErrors: toFieldErrors(parsed.error) };
  }

  try {
    await connectToDatabase();
    await write(parsed.data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    // Surface the common case in language the user can act on.
    if (message.includes("E11000")) {
      return { error: "That slug is already in use. Choose a different one." };
    }
    console.error("[admin] save failed:", error);
    return { error: `Could not save: ${message}` };
  }

  revalidatePublic();
  revalidatePath(adminPath);
  redirect(redirectTo);
}

async function remove(
  model: { deleteOne: (filter: { _id: string }) => Promise<unknown> },
  id: string,
  adminPath: string,
): Promise<void> {
  await requireSession();
  await connectToDatabase();
  await model.deleteOne({ _id: id });
  revalidatePublic();
  revalidatePath(adminPath);
}

/* --------------------------------------------------------------- projects */

export async function saveProject(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const id = text(formData, "id");

  const raw = {
    title: text(formData, "title"),
    slug: text(formData, "slug"),
    description: text(formData, "description"),
    fullDescription: text(formData, "fullDescription"),
    body: String(formData.get("body") ?? ""),
    technologies: csv(formData, "technologies"),
    coverImage: text(formData, "coverImage"),
    liveUrl: text(formData, "liveUrl"),
    repoUrl: text(formData, "repoUrl"),
    client: text(formData, "client"),
    category: text(formData, "category") || "Web",
    featured: bool(formData, "featured"),
    published: bool(formData, "published"),
    order: num(formData, "order"),
    completedAt: dateOrNull(formData, "completedAt"),
    seoTitle: text(formData, "seoTitle"),
    seoDescription: text(formData, "seoDescription"),
  };

  return persist(
    projectSchema,
    raw,
    async (data) => {
      if (id) {
        await Project.updateOne({ _id: id }, { $set: data });
      } else {
        await Project.create(data);
      }
    },
    "/admin/projects",
    "/admin/projects",
  );
}

export async function deleteProject(formData: FormData): Promise<void> {
  await remove(Project, text(formData, "id"), "/admin/projects");
}

/* ------------------------------------------------------------------ posts */

export async function savePost(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const id = text(formData, "id");

  const raw = {
    title: text(formData, "title"),
    slug: text(formData, "slug"),
    excerpt: text(formData, "excerpt"),
    body: String(formData.get("body") ?? ""),
    coverImage: text(formData, "coverImage"),
    category: text(formData, "category") || "Web Development",
    tags: csv(formData, "tags"),
    readTimeMinutes: num(formData, "readTimeMinutes", 5),
    published: bool(formData, "published"),
    featured: bool(formData, "featured"),
    publishedAt: dateOrNull(formData, "publishedAt") ?? new Date(),
    seoTitle: text(formData, "seoTitle"),
    seoDescription: text(formData, "seoDescription"),
  };

  return persist(
    postSchema,
    raw,
    async (data) => {
      if (id) {
        await Post.updateOne({ _id: id }, { $set: data });
      } else {
        await Post.create(data);
      }
    },
    "/admin/posts",
    "/admin/posts",
  );
}

export async function deletePost(formData: FormData): Promise<void> {
  await remove(Post, text(formData, "id"), "/admin/posts");
}

/* ----------------------------------------------------------- testimonials */

export async function saveTestimonial(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const id = text(formData, "id");

  const raw = {
    name: text(formData, "name"),
    role: text(formData, "role"),
    company: text(formData, "company"),
    content: text(formData, "content"),
    avatar: text(formData, "avatar"),
    avatarUrl: text(formData, "avatarUrl"),
    website: text(formData, "website"),
    rating: num(formData, "rating", 5),
    verified: bool(formData, "verified"),
    published: bool(formData, "published"),
    order: num(formData, "order"),
  };

  return persist(
    testimonialSchema,
    raw,
    async (data) => {
      if (id) {
        await Testimonial.updateOne({ _id: id }, { $set: data });
      } else {
        await Testimonial.create(data);
      }
    },
    "/admin/testimonials",
    "/admin/testimonials",
  );
}

export async function deleteTestimonial(formData: FormData): Promise<void> {
  await remove(Testimonial, text(formData, "id"), "/admin/testimonials");
}

/* --------------------------------------------------------------- packages */

export async function savePackage(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const id = text(formData, "id");

  const raw = {
    name: text(formData, "name"),
    slug: text(formData, "slug"),
    price: text(formData, "price"),
    priceValue: num(formData, "priceValue"),
    currency: text(formData, "currency") || "USD",
    period: text(formData, "period") || "one-time",
    description: text(formData, "description"),
    features: list(formData, "features"),
    deliveryTime: text(formData, "deliveryTime"),
    icon: text(formData, "icon") || "Sparkles",
    gradient: text(formData, "gradient") || "gold",
    highlighted: bool(formData, "highlighted"),
    published: bool(formData, "published"),
    order: num(formData, "order"),
  };

  return persist(
    servicePackageSchema,
    raw,
    async (data) => {
      if (id) {
        await ServicePackage.updateOne({ _id: id }, { $set: data });
      } else {
        await ServicePackage.create(data);
      }
    },
    "/admin/packages",
    "/admin/packages",
  );
}

export async function deletePackage(formData: FormData): Promise<void> {
  await remove(ServicePackage, text(formData, "id"), "/admin/packages");
}

export async function saveAddOn(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const id = text(formData, "id");

  const raw = {
    title: text(formData, "title"),
    price: text(formData, "price"),
    description: text(formData, "description"),
    published: bool(formData, "published"),
    order: num(formData, "order"),
  };

  return persist(
    addOnSchema,
    raw,
    async (data) => {
      if (id) {
        await AddOn.updateOne({ _id: id }, { $set: data });
      } else {
        await AddOn.create(data);
      }
    },
    "/admin/packages",
    "/admin/packages",
  );
}

export async function deleteAddOn(formData: FormData): Promise<void> {
  await remove(AddOn, text(formData, "id"), "/admin/packages");
}

/* ------------------------------------------------------------- experience */

export async function saveExperience(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const id = text(formData, "id");

  const raw = {
    role: text(formData, "role"),
    company: text(formData, "company"),
    companyUrl: text(formData, "companyUrl"),
    location: text(formData, "location"),
    period: text(formData, "period"),
    startDate: dateOrNull(formData, "startDate"),
    endDate: dateOrNull(formData, "endDate"),
    current: bool(formData, "current"),
    responsibilities: list(formData, "responsibilities"),
    published: bool(formData, "published"),
    order: num(formData, "order"),
  };

  return persist(
    experienceSchema,
    raw,
    async (data) => {
      if (id) {
        await Experience.updateOne({ _id: id }, { $set: data });
      } else {
        await Experience.create(data);
      }
    },
    "/admin/experience",
    "/admin/experience",
  );
}

export async function deleteExperience(formData: FormData): Promise<void> {
  await remove(Experience, text(formData, "id"), "/admin/experience");
}

/* ----------------------------------------------------------------- skills */

export async function saveSkillCategory(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const id = text(formData, "id");

  const raw = {
    title: text(formData, "title"),
    icon: text(formData, "icon") || "Code2",
    skills: list(formData, "skills"),
    published: bool(formData, "published"),
    order: num(formData, "order"),
  };

  return persist(
    skillCategorySchema,
    raw,
    async (data) => {
      if (id) {
        await SkillCategory.updateOne({ _id: id }, { $set: data });
      } else {
        await SkillCategory.create(data);
      }
    },
    "/admin/skills",
    "/admin/skills",
  );
}

export async function deleteSkillCategory(formData: FormData): Promise<void> {
  await remove(SkillCategory, text(formData, "id"), "/admin/skills");
}

/* --------------------------------------------------------------- messages */

export async function updateMessageStatus(formData: FormData): Promise<void> {
  await requireSession();
  const id = text(formData, "id");
  const status = text(formData, "status");

  if (!["unread", "read", "replied", "archived"].includes(status)) return;

  await connectToDatabase();
  await Message.updateOne({ _id: id }, { $set: { status } });
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

export async function deleteMessage(formData: FormData): Promise<void> {
  await requireSession();
  await connectToDatabase();
  await Message.deleteOne({ _id: text(formData, "id") });
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

/* --------------------------------------------------------------- settings */

export async function saveSettings(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireSession();

  const faqQuestions = formData.getAll("faqQuestion").map((value) => String(value).trim());
  const faqAnswers = formData.getAll("faqAnswer").map((value) => String(value).trim());
  const faqs = faqQuestions
    .map((question, index) => ({
      question,
      answer: faqAnswers[index] ?? "",
      order: index,
    }))
    .filter((faq) => faq.question && faq.answer);

  const raw = {
    fullName: text(formData, "fullName"),
    shortName: text(formData, "shortName"),
    initials: text(formData, "initials"),
    jobTitle: text(formData, "jobTitle"),
    tagline: text(formData, "tagline"),
    roles: list(formData, "roles"),
    heroHeadline: text(formData, "heroHeadline"),
    heroHighlight: text(formData, "heroHighlight"),
    heroIntro: text(formData, "heroIntro"),
    aboutParagraphs: String(formData.get("aboutParagraphs") ?? "")
      .split("\n\n")
      .map((paragraph) => paragraph.trim())
      .filter(Boolean),
    profileImage: text(formData, "profileImage") || "/profile.png",
    resumeUrl: text(formData, "resumeUrl"),
    yearsExperience: num(formData, "yearsExperience", 5),
    email: text(formData, "email"),
    phone: text(formData, "phone"),
    whatsapp: text(formData, "whatsapp"),
    location: text(formData, "location"),
    addressLocality: text(formData, "addressLocality"),
    addressCountry: text(formData, "addressCountry"),
    availability: text(formData, "availability"),
    social: {
      github: text(formData, "github"),
      linkedin: text(formData, "linkedin"),
      twitter: text(formData, "twitter"),
      instagram: text(formData, "instagram"),
      facebook: text(formData, "facebook"),
    },
    seo: {
      siteUrl: text(formData, "siteUrl") || "https://www.charmthiekshana.com",
      defaultTitle: text(formData, "defaultTitle"),
      titleTemplate: text(formData, "titleTemplate") || "%s | Charm Thiekshana",
      defaultDescription: text(formData, "defaultDescription"),
      keywords: csv(formData, "keywords"),
      ogImage: text(formData, "ogImage"),
      twitterHandle: text(formData, "twitterHandle"),
      googleSiteVerification: text(formData, "googleSiteVerification"),
      bingSiteVerification: text(formData, "bingSiteVerification"),
      gtmContainerId: text(formData, "gtmContainerId").toUpperCase(),
    },
    faqs,
    technologies: csv(formData, "technologies"),
  };

  const parsed = siteSettingsSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      error: "Please check the highlighted fields.",
      fieldErrors: toFieldErrors(parsed.error),
    };
  }

  try {
    await connectToDatabase();
    await SiteSettings.updateOne(
      { key: "default" },
      { $set: { ...parsed.data, key: "default" } },
      { upsert: true },
    );
  } catch (error) {
    console.error("[admin] settings save failed:", error);
    return { error: "Could not save settings." };
  }

  revalidatePublic();
  revalidatePath("/admin/settings");
  return { ok: true };
}

/* ------------------------------------------------------------------ admin */

export async function changePassword(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await requireSession();

  const current = text(formData, "currentPassword");
  const next = text(formData, "newPassword");
  const confirm = text(formData, "confirmPassword");

  if (next.length < 12) {
    return { error: "New password must be at least 12 characters." };
  }
  if (next !== confirm) {
    return { error: "New passwords do not match." };
  }

  // bcryptjs is imported lazily so it stays out of any Edge bundle.
  const bcrypt = (await import("bcryptjs")).default;

  await connectToDatabase();
  const user = await AdminUser.findById(session.sub);
  if (!user) return { error: "Account not found." };

  const isValid = await bcrypt.compare(current, user.passwordHash);
  if (!isValid) return { error: "Current password is incorrect." };

  await AdminUser.updateOne(
    { _id: user._id },
    { $set: { passwordHash: await bcrypt.hash(next, 12) } },
  );

  return { ok: true };
}
