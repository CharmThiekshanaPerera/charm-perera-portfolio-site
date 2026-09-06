import { Suspense } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { Skeleton } from "@charm/ui/skeleton";
import { SectionHeading } from "@/components/shared/section-heading";
import { ContactForm } from "./contact-form";
import type { SiteSettingsData } from "@/lib/content";

export function ContactSection({
  settings,
  headingLevel = "h2",
}: {
  settings: SiteSettingsData;
  headingLevel?: "h1" | "h2";
}) {
  const contactDetails = [
    settings.email
      ? {
          icon: Mail,
          label: "Email",
          value: settings.email,
          href: `mailto:${settings.email}`,
        }
      : null,
    settings.phone
      ? { icon: Phone, label: "Phone", value: settings.phone, href: `tel:${settings.phone}` }
      : null,
    settings.location
      ? { icon: MapPin, label: "Location", value: settings.location, href: null }
      : null,
  ].filter((item): item is NonNullable<typeof item> => item !== null);

  return (
    <section id="contact" className="relative overflow-hidden py-16 sm:py-24">
      <div
        className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background"
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto px-6">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            as={headingLevel}
            title="Hire the"
            highlight="Best Freelance Developer"
            description="Ready to start your web or mobile project? Send a message and I will reply within one working day."
          />

          <div className="grid gap-12 lg:grid-cols-5">
            <div className="animate-fade-in space-y-8 lg:col-span-2">
              <div>
                <h3 className="mb-6 text-2xl font-bold">Get in touch</h3>
                <p className="mb-8 leading-relaxed text-muted-foreground">
                  Available for web development, mobile app projects and AI integration work.
                  Based in {settings.location}, serving clients locally and internationally.
                </p>
              </div>

              <ul className="space-y-6">
                {contactDetails.map(({ icon: Icon, label, value, href }) => (
                  <li key={label} className="flex items-start gap-4">
                    <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="mb-1 text-sm text-muted-foreground">{label}</p>
                      {href ? (
                        <a
                          href={href}
                          className="font-medium text-foreground transition-colors hover:text-primary"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="font-medium text-foreground">{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="animate-fade-in lg:col-span-3">
              {/* useSearchParams needs a Suspense boundary to keep this page static. */}
              <Suspense fallback={<Skeleton className="h-[640px] w-full rounded-2xl" />}>
                <ContactForm whatsapp={settings.whatsapp} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
