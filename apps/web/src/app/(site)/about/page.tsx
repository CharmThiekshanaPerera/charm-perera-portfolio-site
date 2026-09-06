import type { Metadata } from "next";
import { AboutSection } from "@/components/site/about-section";
import { ExperienceSection } from "@/components/site/experience-section";
import { SkillsSection } from "@/components/site/skills-section";
import { FaqSection } from "@/components/site/faq-section";
import {
  getExperiences,
  getSiteSettings,
  getSiteUrl,
  getSkillCategories,
} from "@/lib/content";
import { JsonLd, breadcrumbSchema, faqSchema, personSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  const title = `About ${settings.fullName} — ${settings.jobTitle}`;
  const description = `${settings.yearsExperience}+ years building React, Next.js and mobile applications. Based in ${settings.location}, working with clients worldwide.`;

  return {
    title,
    description,
    alternates: { canonical: "/about" },
    openGraph: { title, description, url: "/about", type: "profile" },
  };
}

export default async function AboutPage() {
  const [settings, experiences, skillCategories] = await Promise.all([
    getSiteSettings(),
    getExperiences(),
    getSkillCategories(),
  ]);

  const siteUrl = getSiteUrl(settings);

  return (
    <>
      <JsonLd
        data={[
          personSchema(settings, siteUrl),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "About", url: "/about" },
            ],
            siteUrl,
          ),
          faqSchema(settings.faqs ?? []),
        ].filter((schema): schema is Record<string, unknown> => schema !== null)}
      />

      <div className="pt-20">
        <AboutSection settings={settings} headingLevel="h1" />
        <ExperienceSection experiences={experiences} />
        <SkillsSection categories={skillCategories} technologies={settings.technologies ?? []} />
        <FaqSection faqs={settings.faqs ?? []} />
      </div>
    </>
  );
}
