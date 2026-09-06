import Link from "next/link";
import { Facebook, Github, Instagram, Linkedin, Mail, Phone, Twitter } from "lucide-react";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { whatsappLink } from "@/lib/format";
import type { SiteSettingsData } from "@/lib/content";

const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/** Server component — no interactivity, so none of this ships as JavaScript. */
export function SiteFooter({ settings }: { settings: SiteSettingsData }) {
  const year = new Date().getFullYear();

  const socials = [
    { href: settings.social?.github, label: "GitHub", Icon: Github },
    { href: settings.social?.linkedin, label: "LinkedIn", Icon: Linkedin },
    { href: settings.social?.twitter, label: "Twitter", Icon: Twitter },
    { href: settings.social?.instagram, label: "Instagram", Icon: Instagram },
    { href: settings.social?.facebook, label: "Facebook", Icon: Facebook },
  ].filter((item): item is { href: string; label: string; Icon: typeof Github } =>
    Boolean(item.href),
  );

  return (
    <footer className="relative overflow-hidden border-t border-border bg-gradient-to-b from-background to-secondary/10">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

      <div className="container relative z-10 mx-auto px-6 py-12">
        <div className="mb-8 grid gap-8 md:grid-cols-4">
          <div className="space-y-4 md:col-span-2">
            <p className="text-gradient font-display text-2xl font-bold">{settings.fullName}</p>
            <p className="max-w-md leading-relaxed text-muted-foreground">
              {settings.seo?.defaultDescription}
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              {settings.email ? (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" aria-hidden="true" />
                  <a
                    href={`mailto:${settings.email}`}
                    className="transition-colors hover:text-primary"
                  >
                    {settings.email}
                  </a>
                </div>
              ) : null}
              {settings.phone ? (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
                  <a
                    href={`tel:${settings.phone}`}
                    className="transition-colors hover:text-primary"
                  >
                    {settings.phone}
                  </a>
                </div>
              ) : null}
            </div>
          </div>

          <nav aria-label="Footer">
            <h2 className="mb-4 text-lg font-semibold">Quick Links</h2>
            <ul className="space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-4 text-lg font-semibold">Connect</h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Follow along for updates, tech insights and new work.
            </p>
            <ul className="flex flex-wrap gap-3">
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex rounded-full border border-primary/20 bg-primary/10 p-3 transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-primary-foreground hover:shadow-gold"
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                </li>
              ))}
              {settings.whatsapp ? (
                <li>
                  <a
                    href={whatsappLink(settings.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="inline-flex rounded-full border border-[#25D366]/30 bg-[#25D366]/10 p-3 text-[#25D366] transition-all duration-300 hover:scale-110 hover:bg-[#25D366] hover:text-white"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
            <p>
              © {year} {settings.fullName}. All rights reserved.
            </p>
            <p>Built with Next.js, TypeScript &amp; MongoDB</p>
            {settings.availability ? (
              <p className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs">
                {settings.availability}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  );
}
