import Link from "next/link";
import Image from "next/image";
import { Github } from "lucide-react";
import { Icon } from "@/components/shared/icon";
import { LivePreviewFrame } from "./live-preview-frame";
import type { ProjectCardData } from "@/lib/card-data";
import { isLikelyEmbeddable } from "@/lib/live-preview";
import { cn } from "@charm/ui/cn";

/**
 * Each card links to a real /projects/[slug] page. The old site expanded detail
 * into a client-side accordion, which meant that content never existed in the
 * HTML and could not be indexed or linked to.
 */
export function ProjectCard({
  project,
  wide = false,
}: {
  project: ProjectCardData;
  wide?: boolean;
}) {
  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:border-primary/50 hover:shadow-gold",
        wide && "sm:col-span-2",
      )}
    >
      {project.coverImage ? (
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={project.coverImage}
            alt={`${project.title} — project screenshot`}
            fill
            sizes={wide ? "(max-width: 640px) 100vw, 66vw" : "(max-width: 640px) 100vw, 33vw"}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : project.liveUrl && isLikelyEmbeddable(project.liveUrl) ? (
        <LivePreviewFrame
          url={project.liveUrl}
          title={project.title}
          className="aspect-[16/9]"
          href={`/projects/${project.slug}`}
        />
      ) : null}

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="mb-4 flex items-start justify-between gap-4">
          <h3 className="flex-1 text-xl font-bold transition-colors group-hover:text-primary sm:text-2xl">
            <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0">
              {project.title}
            </Link>
          </h3>

          {/* Sits above the card-wide link overlay so these stay clickable. */}
          <div className="relative z-10 flex flex-shrink-0 gap-2">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={`Visit ${project.title}`}
                aria-label={`Visit ${project.title} (opens in a new tab)`}
                className="rounded-full bg-primary/10 p-2 transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
              >
                <Icon name="external-link" className="h-4 w-4" />
              </a>
            ) : null}
            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={`${project.title} source`}
                aria-label={`${project.title} source on GitHub (opens in a new tab)`}
                className="rounded-full bg-primary/10 p-2 transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : null}
          </div>
        </div>

        <p className="mb-6 flex-1 leading-relaxed text-foreground/80">{project.description}</p>

        <div className="flex flex-wrap items-center gap-2">
          {project.technologies?.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary"
            >
              {tech}
            </span>
          ))}
        </div>

        <p className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary">
          Read case study
          <Icon name="arrow-up-right" className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </p>
      </div>
    </article>
  );
}
