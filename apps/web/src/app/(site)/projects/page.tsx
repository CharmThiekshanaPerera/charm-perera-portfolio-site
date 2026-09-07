import type { Metadata } from "next";
import { ProjectCard } from "@/components/site/project-card";
import { toProjectCard } from "@/lib/card-data";
import { SectionHeading } from "@/components/shared/section-heading";
import { getProjects, getSiteSettings, getSiteUrl } from "@/lib/content";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const projects = await getProjects();

  const title = "Web & Mobile Development Projects";
  const description = `A portfolio of ${projects.length} React, Next.js and mobile app projects built by ${settings.fullName}, a freelance developer based in ${settings.location}.`;

  return {
    title,
    description,
    alternates: { canonical: "/projects" },
    openGraph: { title, description, url: "/projects", type: "website" },
  };
}

export default async function ProjectsPage() {
  const [settings, projects] = await Promise.all([getSiteSettings(), getProjects()]);
  const siteUrl = getSiteUrl(settings);

  // Card shape only: the listing never renders a case-study body.
  const featured = projects.filter((p) => p.featured).map(toProjectCard);
  const others = projects.filter((p) => !p.featured).map(toProjectCard);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Projects", url: "/projects" },
            ],
            siteUrl,
          ),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Projects",
            description: `Web and mobile development projects by ${settings.fullName}`,
            url: `${siteUrl}/projects`,
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: projects.length,
              itemListElement: projects.map((project, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: project.title,
                url: `${siteUrl}/projects/${project.slug}`,
              })),
            },
          },
        ]}
      />

      <div className="container mx-auto px-4 pb-16 pt-32 sm:px-6 sm:pb-24 sm:pt-40">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            as="h1"
            eyebrow="Portfolio"
            title="Projects &"
            highlight="Case Studies"
            description="Mobile apps, web platforms and AI-powered products built for clients in Sri Lanka and internationally."
          />

          {projects.length === 0 ? (
            <p className="text-center text-muted-foreground">
              Projects are being updated. Please check back shortly.
            </p>
          ) : null}

          {featured.length > 0 ? (
            <section aria-labelledby="featured-heading" className="mb-16">
              <h2 id="featured-heading" className="mb-6 text-2xl font-bold">
                Featured work
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 md:gap-8">
                {featured.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </section>
          ) : null}

          {others.length > 0 ? (
            <section aria-labelledby="more-heading">
              <h2 id="more-heading" className="mb-6 text-2xl font-bold">
                More projects
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {others.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </>
  );
}
