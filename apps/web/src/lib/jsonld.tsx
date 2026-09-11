import type { PostDoc, ProjectDoc, ServicePackageDoc, TestimonialDoc } from "@charm/db";
import type { SiteSettingsData } from "./content";

/**
 * Structured data builders.
 *
 * Everything here is emitted server-side inside the rendered HTML, so crawlers
 * see it without executing JavaScript — the main thing the old client-rendered
 * SPA got wrong.
 */

type Json = Record<string, unknown>;

const strip = (value: string | undefined | null) => (value ? value.trim() : undefined);

function sameAs(settings: SiteSettingsData): string[] {
  return [
    settings.social?.github,
    settings.social?.linkedin,
    settings.social?.twitter,
    settings.social?.instagram,
    settings.social?.facebook,
  ].filter((url): url is string => Boolean(url));
}

export function personSchema(settings: SiteSettingsData, siteUrl: string): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: settings.fullName,
    jobTitle: settings.jobTitle,
    description: settings.seo?.defaultDescription,
    url: siteUrl,
    image: `${siteUrl}${settings.profileImage}`,
    email: strip(settings.email) ? `mailto:${settings.email}` : undefined,
    telephone: strip(settings.phone),
    sameAs: sameAs(settings),
    address: {
      "@type": "PostalAddress",
      addressLocality: settings.addressLocality,
      addressCountry: settings.addressCountry,
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Sri Lanka Institute of Information Technology",
    },
    knowsAbout: settings.technologies?.length
      ? settings.technologies
      : ["React Development", "Mobile App Development", "Web Development"],
  };
}

export function professionalServiceSchema(
  settings: SiteSettingsData,
  siteUrl: string,
  packages: ServicePackageDoc[],
  verifiedTestimonials: TestimonialDoc[],
): Json {
  const prices = packages.map((p) => p.priceValue).filter((v) => typeof v === "number" && v > 0);

  const schema: Json = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#business`,
    name: `${settings.fullName} — Freelance Web Developer`,
    description: settings.seo?.defaultDescription,
    url: siteUrl,
    image: `${siteUrl}${settings.profileImage}`,
    telephone: strip(settings.phone),
    email: strip(settings.email),
    priceRange: prices.length
      ? `$${Math.min(...prices)}-$${Math.max(...prices)}`
      : "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: settings.addressLocality,
      addressCountry: settings.addressCountry,
    },
    areaServed: [
      { "@type": "Country", name: "Sri Lanka" },
      { "@type": "Place", name: "Worldwide (remote)" },
    ],
    founder: { "@id": `${siteUrl}/#person` },
    sameAs: sameAs(settings),
  };

  // Packages are no longer shown on any public page, so a catalog referencing
  // them (and a dead /services#slug anchor) would be undeclared structured
  // data — a Google policy violation. Only emit it when packages are visible.
  if (packages.length > 0) {
    schema.hasOfferCatalog = {
      "@type": "OfferCatalog",
      name: "Web & Mobile Development Packages",
      itemListElement: packages.map((pkg) => ({
        "@type": "Offer",
        name: pkg.name,
        description: pkg.description,
        price: pkg.priceValue || undefined,
        priceCurrency: pkg.currency || "USD",
        url: `${siteUrl}/start`,
        itemOffered: {
          "@type": "Service",
          name: `${pkg.name} Web Development Package`,
          description: pkg.description,
        },
      })),
    };
  }

  /**
   * Review and AggregateRating markup is emitted ONLY for testimonials flagged
   * `verified` in the admin panel. Google requires that review snippets be
   * genuine and verifiable; marking up unverifiable praise is a policy
   * violation that can trigger a manual action on the whole domain. An empty
   * verified set simply omits the property, which is the safe default.
   */
  if (verifiedTestimonials.length > 0) {
    const ratings = verifiedTestimonials.map((t) => t.rating || 5);
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: (ratings.reduce((sum, r) => sum + r, 0) / ratings.length).toFixed(1),
      reviewCount: verifiedTestimonials.length,
      bestRating: 5,
      worstRating: 1,
    };
    schema.review = verifiedTestimonials.map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.name },
      reviewRating: {
        "@type": "Rating",
        ratingValue: t.rating || 5,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: t.content,
    }));
  }

  return schema;
}

export function websiteSchema(settings: SiteSettingsData, siteUrl: string): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: settings.seo?.defaultTitle || settings.fullName,
    description: settings.seo?.defaultDescription,
    publisher: { "@id": `${siteUrl}/#person` },
    inLanguage: "en",
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]): Json | null {
  if (!faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[],
  siteUrl: string,
): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  };
}

export function blogPostingSchema(
  post: PostDoc,
  settings: SiteSettingsData,
  siteUrl: string,
): Json {
  const url = `${siteUrl}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}/#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: post.title.slice(0, 110),
    description: post.seoDescription || post.excerpt,
    image: post.coverImage ? [post.coverImage] : [`${siteUrl}/opengraph-image`],
    datePublished: new Date(post.publishedAt).toISOString(),
    dateModified: new Date(post.updatedAt || post.publishedAt).toISOString(),
    author: { "@id": `${siteUrl}/#person` },
    publisher: { "@id": `${siteUrl}/#person` },
    keywords: post.tags?.join(", "),
    articleSection: post.category,
    inLanguage: "en",
  };
}

export function projectSchema(
  project: ProjectDoc,
  settings: SiteSettingsData,
  siteUrl: string,
): Json {
  const url = `${siteUrl}/projects/${project.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${url}/#project`,
    name: project.title,
    description: project.seoDescription || project.description,
    url,
    image: project.coverImage || `${siteUrl}/opengraph-image`,
    creator: { "@id": `${siteUrl}/#person` },
    keywords: project.technologies?.join(", "),
    dateCreated: project.completedAt
      ? new Date(project.completedAt).toISOString()
      : undefined,
    inLanguage: "en",
  };
}

/** Renders a JSON-LD block. Values that are `undefined` are dropped by JSON.stringify. */
export function JsonLd({ data }: { data: Json | Json[] | null }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      // Content is built from our own database, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
