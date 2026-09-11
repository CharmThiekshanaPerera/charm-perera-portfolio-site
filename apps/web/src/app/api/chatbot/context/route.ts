import { NextResponse } from "next/server";
import { getExperiences, getProjects, getSiteSettings, getTestimonials } from "@/lib/content";
import type { ChatbotContext } from "@/lib/chatbot-context";

// Mongoose requires the Node runtime.
export const runtime = "nodejs";
// Cached for 5 minutes so an open-chat burst doesn't hit Mongo per visitor.
// Must not read headers()/cookies() below, or Next silently drops this cache.
export const revalidate = 300;

/**
 * Curated, read-only snapshot the chatbot's keyword matcher answers from.
 * Deliberately excludes ServicePackage/AddOn — pricing/packages are hidden
 * site-wide (see /services -> /start redirect), and the bot must not leak
 * them either; pricing questions are pointed at /start instead.
 */
export async function GET() {
  const [settings, projects, testimonials, experiences] = await Promise.all([
    getSiteSettings(),
    getProjects(),
    getTestimonials(),
    getExperiences(),
  ]);

  const social: ChatbotContext["social"] = {};
  if (settings.social?.github) social.github = settings.social.github;
  if (settings.social?.linkedin) social.linkedin = settings.social.linkedin;
  if (settings.social?.twitter) social.twitter = settings.social.twitter;
  if (settings.social?.upwork) social.upwork = settings.social.upwork;
  if (settings.social?.fiverr) social.fiverr = settings.social.fiverr;

  const context: ChatbotContext = {
    fullName: settings.fullName,
    jobTitle: settings.jobTitle,
    tagline: settings.tagline,
    yearsExperience: settings.yearsExperience,
    location: settings.location,
    availability: settings.availability,
    email: settings.email,
    phone: settings.phone,
    whatsapp: settings.whatsapp,
    avatarUrl: settings.profileImage || "/profile.png",
    social,
    technologies: settings.technologies ?? [],
    about: (settings.aboutParagraphs ?? []).slice(0, 3),
    experiences: experiences.slice(0, 6).map((exp) => ({
      role: exp.role,
      company: exp.company,
      period: exp.period ?? "",
      current: Boolean(exp.current),
    })),
    projects: projects.slice(0, 8).map((project) => ({
      title: project.title,
      slug: project.slug,
      category: project.category ?? "",
    })),
    // Only real, admin-verified praise ever reaches the bot — never fabricated.
    testimonials: testimonials
      .filter((testimonial) => testimonial.verified)
      .slice(0, 3)
      .map((testimonial) => ({
        name: testimonial.name,
        role: testimonial.role ?? "",
        company: testimonial.company ?? "",
        content:
          testimonial.content.length > 140
            ? `${testimonial.content.slice(0, 140).trimEnd()}...`
            : testimonial.content,
      })),
    faqs: (settings.faqs ?? [])
      .slice()
      .sort((a, b) => a.order - b.order)
      .map((faq) => ({ question: faq.question, answer: faq.answer })),
  };

  return NextResponse.json(context);
}
