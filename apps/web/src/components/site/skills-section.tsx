import type { SkillCategoryDoc } from "@charm/db";
import { SectionHeading } from "@/components/shared/section-heading";
import { getIcon } from "@/lib/icons";

export function SkillsSection({
  categories,
  technologies,
}: {
  categories: SkillCategoryDoc[];
  technologies: string[];
}) {
  if (categories.length === 0 && technologies.length === 0) return null;

  return (
    <section id="skills" className="relative overflow-hidden py-12 sm:py-16 md:py-24">
      <div
        className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/5"
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            title="Professional"
            highlight="Web Development Services"
            description="React, mobile and AI expertise for Sri Lankan and international clients."
          />

          <div className="mb-12 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 sm:mb-16">
            {categories.map((category, index) => {
              const Icon = getIcon(category.icon);
              return (
                <article
                  key={category.title}
                  className="animate-fade-in rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:scale-105 hover:border-primary/50 hover:shadow-gold sm:p-6"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </span>
                  <h3 className="mb-4 text-lg font-bold sm:text-xl">{category.title}</h3>
                  <ul className="space-y-2">
                    {category.skills?.map((skill) => (
                      <li key={skill} className="flex items-center gap-2 text-foreground/80">
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-primary"
                          aria-hidden="true"
                        />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>

          {technologies.length > 0 ? (
            <div className="animate-fade-in">
              <h3 className="mb-6 text-center text-xl font-bold sm:text-2xl">
                Technologies &amp; Tools
              </h3>
              <ul className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {technologies.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-border bg-card px-4 py-2 text-xs font-medium transition-all duration-300 hover:scale-110 hover:border-primary hover:bg-primary/10 sm:px-5 sm:py-2.5 sm:text-sm"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
