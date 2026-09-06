import Link from "next/link";
import { ArrowRight, Github } from "lucide-react";
import type { ProjectDoc } from "@charm/db";
import { Button } from "@charm/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProjectCard } from "./project-card";

export function FeaturedProjects({
  projects,
  githubUrl,
}: {
  projects: ProjectDoc[];
  githubUrl?: string;
}) {
  if (projects.length === 0) return null;

  return (
    <section id="projects" className="relative overflow-hidden bg-secondary/5 py-12 sm:py-16 md:py-24">
      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            title="Featured"
            highlight="Projects"
            description="A selection of recent work in mobile and web development."
          />

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 md:gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} wide={project.featured} />
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg">
              <Link href="/projects">
                View all projects
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            {githubUrl ? (
              <Button asChild size="lg" variant="outline">
                <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  GitHub profile
                </a>
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
