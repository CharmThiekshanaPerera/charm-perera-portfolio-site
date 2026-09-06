import Link from "next/link";
import { Check } from "lucide-react";
import type { AddOnDoc, ServicePackageDoc } from "@charm/db";
import { Button } from "@charm/ui/button";
import { cn } from "@charm/ui/cn";
import { SectionHeading } from "@/components/shared/section-heading";
import { getIcon } from "@/lib/icons";
import { getGradient } from "@/lib/gradients";
import { whatsappLink } from "@/lib/format";

/**
 * Server component. The old version needed client JavaScript purely to call
 * `window.open` for the WhatsApp CTA; a plain anchor does the same thing with
 * no bundle cost and works if scripts fail.
 */
export function PackagesSection({
  packages,
  addOns,
  whatsapp,
  headingLevel = "h2",
}: {
  packages: ServicePackageDoc[];
  addOns: AddOnDoc[];
  whatsapp: string;
  headingLevel?: "h1" | "h2";
}) {
  if (packages.length === 0) return null;

  return (
    <section id="packages" className="relative overflow-hidden py-16 sm:py-20 md:py-28">
      <div
        className="absolute inset-0 bg-gradient-to-b from-secondary/5 via-background to-secondary/5"
        aria-hidden="true"
      />
      <div
        className="absolute right-16 top-20 h-80 w-80 animate-float rounded-full bg-primary/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            as={headingLevel}
            title="Freelance"
            highlight="Packages"
            description="Choose the package that fits your project. Every option includes transparent pricing, dedicated support and full source code."
          />

          <div className="mb-16 grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 sm:mb-20">
            {packages.map((pkg) => {
              const Icon = getIcon(pkg.icon);
              return (
                <article
                  key={pkg.slug}
                  id={pkg.slug}
                  className={cn(
                    "relative flex h-full flex-col rounded-3xl border-2 transition-all duration-500 hover:scale-[1.02] scroll-mt-24",
                    pkg.highlighted
                      ? "border-primary bg-gradient-to-b from-primary/5 to-background shadow-gold"
                      : "border-border bg-card hover:border-primary/50 hover:shadow-elegant",
                  )}
                >
                  {pkg.highlighted ? (
                    <span className="absolute -top-4 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-primary to-amber-400 px-6 py-2 text-sm font-bold text-primary-foreground shadow-gold">
                      Most Popular
                    </span>
                  ) : null}

                  <div className="flex h-full flex-col p-6 sm:p-8">
                    <span
                      className={cn(
                        "mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg",
                        getGradient(pkg.gradient),
                      )}
                    >
                      <Icon className="h-8 w-8 text-white" aria-hidden="true" />
                    </span>

                    <h3 className="mb-2 text-2xl font-bold sm:text-3xl">{pkg.name}</h3>

                    <p className="mb-4">
                      <span className="text-gradient text-4xl font-bold sm:text-5xl">
                        {pkg.price}
                      </span>
                      <span className="ml-2 text-muted-foreground">{pkg.period}</span>
                    </p>

                    {pkg.deliveryTime ? (
                      <p className="mb-6">
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                          {pkg.deliveryTime}
                        </span>
                      </p>
                    ) : null}

                    <p className="mb-8 leading-relaxed text-muted-foreground">
                      {pkg.description}
                    </p>

                    <ul className="mb-8 flex-grow space-y-3">
                      {pkg.features?.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <span
                            className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/10"
                            aria-hidden="true"
                          >
                            <Check className="h-3 w-3 text-primary" />
                          </span>
                          <span className="text-sm text-foreground/90">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="space-y-3">
                      <Button
                        asChild
                        size="lg"
                        variant={pkg.highlighted ? "gold" : "default"}
                        className="w-full"
                      >
                        <a
                          href={whatsappLink(
                            whatsapp,
                            `Hi Charm, I am interested in the ${pkg.name} package. Could you share more details?`,
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Get started
                        </a>
                      </Button>
                      <Button asChild size="lg" variant="outline" className="w-full">
                        <Link href={`/contact?package=${pkg.slug}`}>Contact for details</Link>
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {addOns.length > 0 ? (
            <div className="animate-fade-in">
              <div className="mb-10 text-center">
                <h3 className="mb-4 text-2xl font-bold sm:text-3xl">
                  Premium <span className="text-gradient">Add-ons</span>
                </h3>
                <p className="text-muted-foreground">
                  Extend any package with these additional services.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {addOns.map((addon) => (
                  <article
                    key={addon.title}
                    className="rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:scale-105 hover:border-primary/50 hover:shadow-gold"
                  >
                    <p className="text-gradient mb-4 text-2xl font-bold">{addon.price}</p>
                    <h4 className="mb-2 font-bold">{addon.title}</h4>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {addon.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-16 animate-fade-in text-center sm:mt-20">
            <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 p-8 sm:p-12">
              <h3 className="mb-4 text-2xl font-bold sm:text-3xl">Need a custom package?</h3>
              <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
                Every project is different. Tell me what you are building and I will put together
                a scope, timeline and price that fits.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button asChild size="lg" variant="gold">
                  <a
                    href={whatsappLink(
                      whatsapp,
                      "Hi Charm, I would like to discuss a custom project.",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp me
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/contact">Send a message</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
