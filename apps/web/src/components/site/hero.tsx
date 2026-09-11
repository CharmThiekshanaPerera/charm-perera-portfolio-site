import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowDown, Mail, Phone } from "lucide-react";
import { Button } from "@charm/ui/button";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { RoleTyper } from "./role-typer";
import { whatsappLink } from "@/lib/format";
import { getSocialLinks } from "@/lib/social";
import type { SiteSettingsData } from "@/lib/content";

/**
 * Server component: the h1, intro paragraph and profile image are in the
 * initial HTML. Only the small typewriter is hydrated.
 */
export function Hero({ settings }: { settings: SiteSettingsData }) {
  const socials = getSocialLinks(settings.social);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20"
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20"
        aria-hidden="true"
      />
      <div
        className="absolute right-10 top-24 h-72 w-72 animate-float rounded-full bg-primary/10 blur-3xl lg:h-96 lg:w-96"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-16 left-10 h-72 w-72 animate-float rounded-full bg-accent/10 blur-3xl lg:h-96 lg:w-96"
        style={{ animationDelay: "3s" }}
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="order-2 animate-fade-in space-y-5 lg:order-1">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
              Welcome to my portfolio
            </span>

            <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
              <span className="text-gradient">{settings.heroHeadline}</span>
              <br />
              <span className="text-foreground">{settings.heroHighlight}</span>
            </h1>

            <p className="min-h-[2rem] text-xl font-light text-muted-foreground sm:min-h-[2.5rem] sm:text-2xl lg:text-3xl">
              <RoleTyper roles={settings.roles ?? []} />
            </p>

            <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {settings.heroIntro}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button asChild size="lg">
                <Link href="/projects">View My Work</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">Get In Touch</Link>
              </Button>
            </div>

            <ul className="flex flex-wrap gap-3 pt-4">
              {socials.map(({ href, label, Icon, color }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex rounded-full border border-border bg-card p-3 transition-all duration-300 hover:scale-110 hover:border-[var(--brand)] hover:text-[var(--brand)] hover:shadow-gold"
                    style={{ color, "--brand": color } as CSSProperties}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                </li>
              ))}
              {settings.email ? (
                <li>
                  <a
                    href={`mailto:${settings.email}`}
                    aria-label="Email"
                    className="inline-flex rounded-full border border-border bg-card p-3 text-primary transition-all duration-300 hover:scale-110 hover:border-primary hover:shadow-gold"
                  >
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </a>
                </li>
              ) : null}
              {settings.phone ? (
                <li>
                  <a
                    href={`tel:${settings.phone}`}
                    aria-label="Phone"
                    className="inline-flex rounded-full border border-border bg-card p-3 text-primary transition-all duration-300 hover:scale-110 hover:border-primary hover:shadow-gold"
                  >
                    <Phone className="h-5 w-5" aria-hidden="true" />
                  </a>
                </li>
              ) : null}
              {settings.whatsapp ? (
                <li>
                  <a
                    href={whatsappLink(settings.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="inline-flex rounded-full border border-[#25D366]/30 bg-[#25D366]/10 p-3 text-[#25D366] transition-all duration-300 hover:scale-110"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                  </a>
                </li>
              ) : null}
            </ul>
          </div>

          <div className="order-1 animate-fade-in lg:order-2">
            <div className="relative mx-auto w-full max-w-md">
              <div
                className="absolute inset-0 animate-glow rounded-3xl bg-gradient-to-br from-primary to-accent opacity-20 blur-2xl"
                aria-hidden="true"
              />
              <div className="relative overflow-hidden rounded-3xl border-2 border-primary/30 shadow-elegant">
                <Image
                  src={settings.profileImage || "/profile.png"}
                  alt={`${settings.fullName} — ${settings.jobTitle} based in ${settings.location}`}
                  width={640}
                  height={800}
                  // The hero image is the LCP element, so it must not lazy-load.
                  priority
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center lg:mt-16">
          <a
            href="#about"
            aria-label="Scroll to about section"
            className="animate-bounce rounded-full border border-primary/30 p-2 transition-colors hover:border-primary"
          >
            <ArrowDown className="h-6 w-6 text-primary" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
