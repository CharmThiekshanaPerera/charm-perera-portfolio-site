import type { CSSProperties } from "react";
import { Brain, Code2, Smartphone, Zap } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { getSocialLinks } from "@/lib/social";
import type { SiteSettingsData } from "@/lib/content";

const HIGHLIGHTS = [
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description:
      "Professional iOS and Android development with React Native expertise and shipped apps on the Google Play Store.",
  },
  {
    icon: Code2,
    title: "React & Web Development",
    description:
      "Modern web applications built with React, Next.js and TypeScript, designed to be fast and genuinely responsive.",
  },
  {
    icon: Brain,
    title: "AI Integration",
    description:
      "Practical AI features built into real products, from assistants to automated content workflows.",
  },
  {
    icon: Zap,
    title: "Performance First",
    description:
      "Server rendering, image optimisation and measured performance budgets on every build.",
  },
];

export function AboutSection({
  settings,
  headingLevel = "h2",
}: {
  settings: SiteSettingsData;
  headingLevel?: "h1" | "h2";
}) {
  const socials = getSocialLinks(settings.social);

  return (
    <section id="about" className="relative overflow-hidden py-12 sm:py-16 md:py-24">
      <div
        className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background"
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            as={headingLevel}
            title="Why Choose a"
            highlight="Freelance Developer in Sri Lanka?"
            description="Professional web and mobile development with global standards at competitive rates."
          />

          <div className="mb-16 grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="animate-fade-in space-y-5">
              {settings.aboutParagraphs?.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-base leading-relaxed text-foreground/90 sm:text-lg"
                >
                  {paragraph}
                </p>
              ))}

              <ul className="space-y-2 pt-2">
                {[
                  `Based in ${settings.location}`,
                  "Open to remote opportunities",
                  "Available for freelance projects",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                    <span className="text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>

              {socials.length > 0 ? (
                <ul className="flex flex-wrap gap-3 pt-2">
                  {socials.map(({ href, label, Icon, color }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="inline-flex rounded-full border border-border bg-card p-2.5 transition-all duration-300 hover:scale-110 hover:border-[var(--brand)] hover:text-[var(--brand)] hover:shadow-gold"
                        style={{ color, "--brand": color } as CSSProperties}
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            <div className="grid animate-fade-in gap-4 sm:grid-cols-2 sm:gap-6">
              {HIGHLIGHTS.map(({ icon: Icon, title, description }) => (
                <article
                  key={title}
                  className="rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:scale-105 hover:border-primary/50 hover:shadow-gold sm:p-6"
                >
                  <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </span>
                  <h3 className="mb-2 text-base font-semibold sm:text-lg">{title}</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
