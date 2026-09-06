import { Briefcase, Calendar } from "lucide-react";
import type { ExperienceDoc } from "@charm/db";
import { SectionHeading } from "@/components/shared/section-heading";

export function ExperienceSection({ experiences }: { experiences: ExperienceDoc[] }) {
  if (experiences.length === 0) return null;

  return (
    <section id="experience" className="relative overflow-hidden bg-secondary/5 py-12 sm:py-16 md:py-24">
      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            title="Professional"
            highlight="Experience"
            description="Building digital products with teams in Sri Lanka and the UK."
          />

          <ol className="relative space-y-8">
            <div
              className="absolute bottom-0 left-8 top-0 hidden w-px bg-gradient-to-b from-primary via-primary/50 to-transparent md:block"
              aria-hidden="true"
            />

            {experiences.map((experience, index) => (
              <li
                key={`${experience.company}-${experience.role}`}
                className="relative animate-fade-in"
                style={{ animationDelay: `${index * 0.12}s` }}
              >
                <span
                  className="absolute left-6 top-8 hidden h-5 w-5 animate-glow rounded-full border-4 border-background bg-primary md:block"
                  aria-hidden="true"
                />

                <article className="rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-gold md:ml-20 sm:p-8">
                  <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="text-gradient mb-2 text-xl font-bold sm:text-2xl">
                        {experience.role}
                      </h3>
                      <p className="mb-1 flex items-center gap-2 text-lg text-foreground">
                        <Briefcase className="h-5 w-5 text-primary" aria-hidden="true" />
                        <span className="font-semibold">{experience.company}</span>
                      </p>
                      <p className="text-muted-foreground">{experience.location}</p>
                    </div>
                    <p className="flex items-center gap-2 whitespace-nowrap rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-muted-foreground">
                      <Calendar className="h-4 w-4" aria-hidden="true" />
                      {experience.period}
                    </p>
                  </div>

                  <ul className="space-y-3">
                    {experience.responsibilities?.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex gap-3">
                        <span
                          className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary"
                          aria-hidden="true"
                        />
                        <span className="leading-relaxed text-foreground/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
