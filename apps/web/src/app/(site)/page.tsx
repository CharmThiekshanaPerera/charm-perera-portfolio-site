import type { Metadata } from "next";
import { Hero } from "@/components/site/hero";
import { AboutSection } from "@/components/site/about-section";
import { ExperienceSection } from "@/components/site/experience-section";
import { SkillsSection } from "@/components/site/skills-section";
import { FeaturedProjects } from "@/components/site/featured-projects";
import { PackagesSection } from "@/components/site/packages-section";
import { BlogSection } from "@/components/site/blog-section";
import { TestimonialsSection } from "@/components/site/testimonials-section";
import { FaqSection } from "@/components/site/faq-section";
import { ContactSection } from "@/components/site/contact-section";
import {
  getAddOns,
  getExperiences,
  getPosts,
  getProjects,
  getServicePackages,
  getSiteSettings,
  getSiteUrl,
  getSkillCategories,
  getTestimonials,
} from "@/lib/content";
import {
  JsonLd,
  faqSchema,
  personSchema,
  professionalServiceSchema,
  websiteSchema,
} from "@/lib/jsonld";

/** ISR: pages rebuild at most hourly, and instantly when the admin saves. */
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: {
      absolute: settings.seo.defaultTitle || settings.fullName,
    },
    description: settings.seo.defaultDescription,
    alternates: { canonical: "/" },
  };
}

export default async function HomePage() {
  const [
    settings,
    projects,
    posts,
    testimonials,
    packages,
    addOns,
    experiences,
    skillCategories,
  ] = await Promise.all([
    getSiteSettings(),
    getProjects(),
    getPosts(),
    getTestimonials(),
    getServicePackages(),
    getAddOns(),
    getExperiences(),
    getSkillCategories(),
  ]);

  const siteUrl = getSiteUrl(settings);
  const verifiedTestimonials = testimonials.filter((testimonial) => testimonial.verified);

  // Featured projects lead the grid, the rest follow behind the "view all"
  // toggle, matching the ordering the original site used.
  const orderedProjects = [
    ...projects.filter((project) => project.featured),
    ...projects.filter((project) => !project.featured),
  ];

  return (
    <>
      <JsonLd
        data={[
          personSchema(settings, siteUrl),
          websiteSchema(settings, siteUrl),
          professionalServiceSchema(settings, siteUrl, packages, verifiedTestimonials),
          faqSchema(settings.faqs ?? []),
        ].filter((schema): schema is Record<string, unknown> => schema !== null)}
      />

      <Hero settings={settings} />
      <AboutSection settings={settings} />
      <ExperienceSection experiences={experiences} />
      <SkillsSection categories={skillCategories} technologies={settings.technologies ?? []} />
      <FeaturedProjects projects={orderedProjects} githubUrl={settings.social?.github} />
      <PackagesSection packages={packages} addOns={addOns} whatsapp={settings.whatsapp} />
      <BlogSection posts={posts} />
      <TestimonialsSection testimonials={testimonials} />
      <FaqSection faqs={settings.faqs ?? []} />
      <ContactSection settings={settings} />
    </>
  );
}
