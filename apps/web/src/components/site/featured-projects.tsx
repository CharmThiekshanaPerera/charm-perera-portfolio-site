"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, ChevronUp, Github } from "lucide-react";
import type { ProjectDoc } from "@charm/db";
import { Button } from "@charm/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProjectCard } from "./project-card";

const COLLAPSED_COUNT = 6;

/**
 * Home page project grid.
 *
 * Mirrors the original site: six cards by default with a "View all N projects"
 * toggle that expands the rest in place. Every card also links to its own
 * /projects/[slug] page, which is what search engines index — the toggle is a
 * browsing convenience, not the canonical route to the content.
 */
export function FeaturedProjects({
  projects,
  githubUrl,
}: {
  projects: ProjectDoc[];
  githubUrl?: string;
}) {
  const [showAll, setShowAll] = useState(false);

  if (projects.length === 0) return null;

  const hasMore = projects.length > COLLAPSED_COUNT;
  const visible = showAll ? projects : projects.slice(0, COLLAPSED_COUNT);

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-secondary/5 py-12 sm:py-16 md:py-24"
    >
      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            title="Featured"
            highlight="Projects"
            description="A showcase of my best work in mobile and web development."
          />

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 md:gap-8">
            {visible.map((project) => (
              <ProjectCard key={project.slug} project={project} wide={project.featured} />
            ))}
          </div>

          <div className="mt-12 space-y-6 text-center">
            {hasMore ? (
              <Button
                onClick={() => setShowAll((open) => !open)}
                variant="outline"
                size="lg"
                aria-expanded={showAll}
              >
                {showAll ? (
                  <>
                    <ChevronUp className="h-5 w-5" aria-hidden="true" />
                    Show fewer projects
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-5 w-5" aria-hidden="true" />
                    View all {projects.length} projects
                  </>
                )}
              </Button>
            ) : null}

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/projects">
                  Browse all case studies
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>

              {githubUrl ? (
                <Button asChild size="lg" variant="outline">
                  <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" aria-hidden="true" />
                    View GitHub profile
                  </a>
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
