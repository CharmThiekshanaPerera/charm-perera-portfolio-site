import type { PostDoc, ProjectDoc, TestimonialDoc } from "@charm/db";
import { checkFrameable, isLikelyEmbeddable } from "./live-preview";

/**
 * Narrow shapes for the cards rendered inside client components.
 *
 * Anything handed to a client component is serialized into the RSC payload
 * embedded in the HTML. Passing whole Mongoose documents meant the home page
 * shipped every project's Markdown case study and every article's full body -
 * content the cards never render - which is why it weighed several times more
 * than any other page.
 *
 * These projections keep only what a card actually draws. Full bodies stay on
 * the detail routes that render them.
 */

export type ProjectCardData = {
  slug: string;
  title: string;
  description: string;
  technologies: string[];
  coverImage: string;
  liveUrl: string;
  repoUrl: string;
  featured: boolean;
  category: string;
  /** Resolved server-side (see live-preview.ts) — whether liveUrl's own
   *  response headers actually allow it to be embedded in an iframe. Ready
   *  to render as-is; ProjectCard never needs to do this check itself. */
  previewEmbeddable: boolean;
};

export type PostCardData = {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readTimeMinutes: number;
};

export type TestimonialCardData = {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  website: string;
};

/**
 * Async because it may do a real network round-trip (checkFrameable) — call
 * sites must `Promise.all(projects.map(toProjectCard))`, not a plain `.map`.
 * Only actually fetches when there's no coverImage to prefer instead and the
 * URL isn't already excluded by the cheap host-based check.
 */
export async function toProjectCard(project: ProjectDoc): Promise<ProjectCardData> {
  const coverImage = project.coverImage ?? "";
  const liveUrl = project.liveUrl ?? "";
  const previewEmbeddable =
    !coverImage && liveUrl && isLikelyEmbeddable(liveUrl) ? await checkFrameable(liveUrl) : false;

  return {
    slug: project.slug,
    title: project.title,
    description: project.description,
    technologies: project.technologies ?? [],
    coverImage,
    liveUrl,
    repoUrl: project.repoUrl ?? "",
    featured: Boolean(project.featured),
    category: project.category ?? "",
    previewEmbeddable,
  };
}

export function toPostCard(post: PostDoc): PostCardData {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    coverImage: post.coverImage ?? "",
    category: post.category ?? "",
    tags: post.tags ?? [],
    publishedAt: new Date(post.publishedAt).toISOString(),
    readTimeMinutes: post.readTimeMinutes ?? 5,
  };
}

export function toTestimonialCard(testimonial: TestimonialDoc): TestimonialCardData {
  return {
    id: String(testimonial._id),
    name: testimonial.name,
    role: testimonial.role ?? "",
    company: testimonial.company ?? "",
    content: testimonial.content,
    avatar: testimonial.avatar ?? "",
    website: testimonial.website ?? "",
  };
}
