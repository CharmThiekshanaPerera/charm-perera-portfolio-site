import "server-only";

import { cache } from "react";
import {
  AddOn,
  Experience,
  Post,
  Project,
  ServicePackage,
  SiteSettings,
  SkillCategory,
  Testimonial,
  connectToDatabase,
  serialize,
  type AddOnDoc,
  type ExperienceDoc,
  type PostDoc,
  type ProjectDoc,
  type ServicePackageDoc,
  type SiteSettingsDoc,
  type SkillCategoryDoc,
  type TestimonialDoc,
} from "@charm/db";

/**
 * Read-side data access for the public site.
 *
 * Every function is wrapped in React's `cache()` so a single render pass hits
 * Mongo at most once per query, even when several components ask for the same
 * data. Pages layer ISR on top via `export const revalidate`.
 */

/** Fallback used when the database is unreachable, so the site still renders. */
const FALLBACK_SETTINGS = {
  fullName: "Charm Thiekshana Perera",
  shortName: "Charm Thiekshana",
  initials: "CT",
  jobTitle: "Senior Freelance Web Developer",
  tagline: "React, iOS & Android development from Colombo, Sri Lanka",
  roles: ["Senior Frontend Developer", "Mobile App Developer", "React Expert"],
  heroHeadline: "Best Freelance Web Developer",
  heroHighlight: "in Sri Lanka",
  heroIntro: "",
  aboutParagraphs: [] as string[],
  profileImage: "/profile.png",
  resumeUrl: "",
  yearsExperience: 5,
  email: "charmthiekshana97@gmail.com",
  phone: "+94754465955",
  whatsapp: "94754465955",
  location: "Colombo, Sri Lanka",
  addressLocality: "Colombo",
  addressCountry: "LK",
  availability: "Available for freelance opportunities",
  social: {
    github: "",
    linkedin: "",
    twitter: "",
    instagram: "",
    facebook: "",
    youtube: "",
    tiktok: "",
    behance: "",
    dribbble: "",
    upwork: "",
    fiverr: "",
  },
  seo: {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.charmthiekshana.com",
    defaultTitle: "Best Freelance Web Developer in Sri Lanka | Charm Thiekshana",
    titleTemplate: "%s | Charm Thiekshana",
    defaultDescription:
      "Top-rated freelance web & mobile developer in Sri Lanka. Specializing in React, iOS/Android apps, and AI integration.",
    keywords: [] as string[],
    ogImage: "",
    twitterHandle: "@CharmThiekshana",
    googleSiteVerification: "",
    bingSiteVerification: "",
    gtmContainerId: "",
  },
  faqs: [] as { question: string; answer: string; order: number }[],
  technologies: [] as string[],
  privacyPolicy: "" as string,
};

export type SiteSettingsData = typeof FALLBACK_SETTINGS;

export const getSiteSettings = cache(async (): Promise<SiteSettingsData> => {
  try {
    await connectToDatabase();
    const doc = await SiteSettings.findOne({ key: "default" }).lean<SiteSettingsDoc>();
    if (!doc) return FALLBACK_SETTINGS;
    // Merge over the fallback so a partially-filled document never yields
    // undefined fields in a template.
    return { ...FALLBACK_SETTINGS, ...serialize(doc) } as SiteSettingsData;
  } catch (error) {
    console.error("[content] getSiteSettings failed:", error);
    return FALLBACK_SETTINGS;
  }
});

export const getProjects = cache(async (): Promise<ProjectDoc[]> => {
  try {
    await connectToDatabase();
    const docs = await Project.find({ published: true })
      .sort({ featured: -1, order: 1, createdAt: -1 })
      .lean<ProjectDoc[]>();
    return serialize(docs);
  } catch (error) {
    console.error("[content] getProjects failed:", error);
    return [];
  }
});

export const getProjectBySlug = cache(async (slug: string): Promise<ProjectDoc | null> => {
  try {
    await connectToDatabase();
    const doc = await Project.findOne({ slug, published: true }).lean<ProjectDoc>();
    return doc ? serialize(doc) : null;
  } catch (error) {
    console.error("[content] getProjectBySlug failed:", error);
    return null;
  }
});

export const getPosts = cache(async (): Promise<PostDoc[]> => {
  try {
    await connectToDatabase();
    const docs = await Post.find({ published: true })
      .sort({ publishedAt: -1 })
      .lean<PostDoc[]>();
    return serialize(docs);
  } catch (error) {
    console.error("[content] getPosts failed:", error);
    return [];
  }
});

export const getPostBySlug = cache(async (slug: string): Promise<PostDoc | null> => {
  try {
    await connectToDatabase();
    const doc = await Post.findOne({ slug, published: true }).lean<PostDoc>();
    return doc ? serialize(doc) : null;
  } catch (error) {
    console.error("[content] getPostBySlug failed:", error);
    return null;
  }
});

/** Posts sharing a tag with the given one, for internal linking between articles. */
export const getRelatedPosts = cache(
  async (slug: string, tags: string[], limit = 3): Promise<PostDoc[]> => {
    try {
      await connectToDatabase();
      const docs = await Post.find({ published: true, slug: { $ne: slug }, tags: { $in: tags } })
        .sort({ publishedAt: -1 })
        .limit(limit)
        .lean<PostDoc[]>();
      return serialize(docs);
    } catch (error) {
      console.error("[content] getRelatedPosts failed:", error);
      return [];
    }
  },
);

export const getTestimonials = cache(async (): Promise<TestimonialDoc[]> => {
  try {
    await connectToDatabase();
    const docs = await Testimonial.find({ published: true })
      .sort({ order: 1, createdAt: 1 })
      .lean<TestimonialDoc[]>();
    return serialize(docs);
  } catch (error) {
    console.error("[content] getTestimonials failed:", error);
    return [];
  }
});

export const getServicePackages = cache(async (): Promise<ServicePackageDoc[]> => {
  try {
    await connectToDatabase();
    const docs = await ServicePackage.find({ published: true })
      .sort({ order: 1 })
      .lean<ServicePackageDoc[]>();
    return serialize(docs);
  } catch (error) {
    console.error("[content] getServicePackages failed:", error);
    return [];
  }
});

export const getAddOns = cache(async (): Promise<AddOnDoc[]> => {
  try {
    await connectToDatabase();
    const docs = await AddOn.find({ published: true }).sort({ order: 1 }).lean<AddOnDoc[]>();
    return serialize(docs);
  } catch (error) {
    console.error("[content] getAddOns failed:", error);
    return [];
  }
});

export const getExperiences = cache(async (): Promise<ExperienceDoc[]> => {
  try {
    await connectToDatabase();
    const docs = await Experience.find({ published: true })
      .sort({ order: 1 })
      .lean<ExperienceDoc[]>();
    return serialize(docs);
  } catch (error) {
    console.error("[content] getExperiences failed:", error);
    return [];
  }
});

export const getSkillCategories = cache(async (): Promise<SkillCategoryDoc[]> => {
  try {
    await connectToDatabase();
    const docs = await SkillCategory.find({ published: true })
      .sort({ order: 1 })
      .lean<SkillCategoryDoc[]>();
    return serialize(docs);
  } catch (error) {
    console.error("[content] getSkillCategories failed:", error);
    return [];
  }
});

/** Canonical origin, without a trailing slash. */
export function getSiteUrl(settings?: SiteSettingsData): string {
  const url =
    settings?.seo?.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || "https://www.charmthiekshana.com";
  return url.replace(/\/$/, "");
}
