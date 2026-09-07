import type { PostDoc, ProjectDoc, TestimonialDoc } from "@charm/db";

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

export function toProjectCard(project: ProjectDoc): ProjectCardData {
  return {
    slug: project.slug,
    title: project.title,
    description: project.description,
    technologies: project.technologies ?? [],
    coverImage: project.coverImage ?? "",
    liveUrl: project.liveUrl ?? "",
    repoUrl: project.repoUrl ?? "",
    featured: Boolean(project.featured),
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
