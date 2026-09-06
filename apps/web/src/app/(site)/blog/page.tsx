import type { Metadata } from "next";
import { PostCard } from "@/components/site/post-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { getPosts, getSiteSettings, getSiteUrl } from "@/lib/content";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  const title = "Blog — Web & Mobile Development Articles";
  const description = `Practical articles on React, Next.js, React Native, TypeScript and building products, written by ${settings.fullName}.`;

  return {
    title,
    description,
    alternates: { canonical: "/blog", types: { "application/rss+xml": "/blog/rss.xml" } },
    openGraph: { title, description, url: "/blog", type: "website" },
  };
}

export default async function BlogPage() {
  const [settings, posts] = await Promise.all([getSiteSettings(), getPosts()]);
  const siteUrl = getSiteUrl(settings);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Blog", url: "/blog" },
            ],
            siteUrl,
          ),
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            "@id": `${siteUrl}/blog/#blog`,
            name: `${settings.fullName} — Blog`,
            description:
              "Articles on React, mobile development, TypeScript and building software products.",
            url: `${siteUrl}/blog`,
            author: { "@id": `${siteUrl}/#person` },
            blogPost: posts.slice(0, 10).map((post) => ({
              "@type": "BlogPosting",
              headline: post.title,
              url: `${siteUrl}/blog/${post.slug}`,
              datePublished: new Date(post.publishedAt).toISOString(),
            })),
          },
        ]}
      />

      <div className="container mx-auto px-4 pb-16 pt-32 sm:px-6 sm:pb-24 sm:pt-40">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            as="h1"
            eyebrow="Writing"
            title="Development"
            highlight="Articles"
            description="Notes on React, mobile development, TypeScript and shipping software that lasts."
          />

          {posts.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No articles published yet. Check back soon.
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
