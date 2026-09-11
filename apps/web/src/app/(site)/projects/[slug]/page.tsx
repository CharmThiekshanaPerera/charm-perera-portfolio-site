import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Button } from "@charm/ui/button";
import { Markdown } from "@/components/site/markdown";
import { LivePreviewFrame } from "@/components/site/live-preview-frame";
import { getProjectBySlug, getProjects, getSiteSettings, getSiteUrl } from "@/lib/content";
import { JsonLd, breadcrumbSchema, projectSchema } from "@/lib/jsonld";
import { formatDate } from "@/lib/format";
import { isLikelyEmbeddable } from "@/lib/live-preview";

export const revalidate = 3600;
/** Any slug not pre-rendered is generated on first request, then cached. */
export const dynamicParams = true;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found", robots: { index: false, follow: false } };
  }

  const title = project.seoTitle || project.title;
  const description = project.seoDescription || project.description;

  return {
    title,
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title,
      description,
      url: `/projects/${project.slug}`,
      type: "article",
      images: project.coverImage ? [{ url: project.coverImage }] : undefined,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const [project, settings] = await Promise.all([getProjectBySlug(slug), getSiteSettings()]);

  if (!project) notFound();

  const siteUrl = getSiteUrl(settings);
  const allProjects = await getProjects();
  const related = allProjects
    .filter((item) => item.slug !== project.slug && item.category === project.category)
    .slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          projectSchema(project, settings, siteUrl),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Projects", url: "/projects" },
              { name: project.title, url: `/projects/${project.slug}` },
            ],
            siteUrl,
          ),
        ]}
      />

      <article className="container mx-auto px-4 pb-16 pt-32 sm:px-6 sm:pb-24 sm:pt-40">
        <div className="mx-auto max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-8">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              All projects
            </Link>
          </nav>

          <header className="mb-10">
            {project.category ? (
              <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
                {project.category}
              </span>
            ) : null}

            <h1 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              {project.title}
            </h1>

            <p className="text-lg leading-relaxed text-muted-foreground">
              {project.description}
            </p>

            <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm">
              {project.client ? (
                <div>
                  <dt className="text-muted-foreground">Client</dt>
                  <dd className="font-medium">{project.client}</dd>
                </div>
              ) : null}
              {project.completedAt ? (
                <div>
                  <dt className="text-muted-foreground">Completed</dt>
                  <dd className="font-medium">{formatDate(project.completedAt)}</dd>
                </div>
              ) : null}
            </dl>

            {project.technologies?.length ? (
              <ul className="mt-6 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            ) : null}

            {project.liveUrl || project.repoUrl ? (
              <div className="mt-8 flex flex-wrap gap-3">
                {project.liveUrl ? (
                  <Button asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      View live project
                    </a>
                  </Button>
                ) : null}
                {project.repoUrl ? (
                  <Button asChild variant="outline">
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" aria-hidden="true" />
                      Source code
                    </a>
                  </Button>
                ) : null}
              </div>
            ) : null}
          </header>

          {project.coverImage ? (
            <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-2xl border border-border">
              <Image
                src={project.coverImage}
                alt={`${project.title} screenshot`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
          ) : project.liveUrl && isLikelyEmbeddable(project.liveUrl, { allowSelf: true }) ? (
            <LivePreviewFrame
              url={project.liveUrl}
              title={project.title}
              className="mb-10 aspect-[16/9] rounded-2xl border border-border"
            />
          ) : null}

          {project.body ? (
            <Markdown>{project.body}</Markdown>
          ) : project.fullDescription ? (
            <p className="text-lg leading-relaxed text-foreground/90">
              {project.fullDescription}
            </p>
          ) : null}

          <aside className="mt-16 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 p-8 text-center">
            <h2 className="mb-3 text-2xl font-bold">Building something similar?</h2>
            <p className="mx-auto mb-6 max-w-xl text-muted-foreground">
              I take on a small number of freelance projects at a time. Tell me what you have in
              mind and I will come back with a scope and timeline.
            </p>
            <Button asChild size="lg">
              <Link href="/contact">Start a conversation</Link>
            </Button>
          </aside>

          {related.length > 0 ? (
            <section className="mt-16" aria-labelledby="related-heading">
              <h2 id="related-heading" className="mb-6 text-2xl font-bold">
                Related projects
              </h2>
              <ul className="grid gap-4 sm:grid-cols-3">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/projects/${item.slug}`}
                      className="block h-full rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-gold"
                    >
                      <p className="mb-2 font-semibold">{item.title}</p>
                      <p className="line-clamp-2 text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </article>
    </>
  );
}
