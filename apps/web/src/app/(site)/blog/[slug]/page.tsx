import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { Button } from "@charm/ui/button";
import { Markdown } from "@/components/site/markdown";
import {
  getPostBySlug,
  getPosts,
  getRelatedPosts,
  getSiteSettings,
  getSiteUrl,
} from "@/lib/content";
import { JsonLd, blogPostingSchema, breadcrumbSchema } from "@/lib/jsonld";
import { formatDate, isoDate } from "@/lib/format";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Article not found", robots: { index: false, follow: false } };
  }

  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;

  return {
    title,
    description,
    keywords: post.tags,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title,
      description,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: isoDate(post.publishedAt),
      modifiedTime: isoDate(post.updatedAt || post.publishedAt),
      tags: post.tags,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const [post, settings] = await Promise.all([getPostBySlug(slug), getSiteSettings()]);

  if (!post) notFound();

  const siteUrl = getSiteUrl(settings);
  const related = await getRelatedPosts(post.slug, post.tags ?? []);

  return (
    <>
      <JsonLd
        data={[
          blogPostingSchema(post, settings, siteUrl),
          breadcrumbSchema(
            [
              { name: "Home", url: "/" },
              { name: "Blog", url: "/blog" },
              { name: post.title, url: `/blog/${post.slug}` },
            ],
            siteUrl,
          ),
        ]}
      />

      <article className="container mx-auto px-4 pb-16 pt-32 sm:px-6 sm:pb-24 sm:pt-40">
        <div className="mx-auto max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              All articles
            </Link>
          </nav>

          <header className="mb-10">
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
              {post.category}
            </span>

            <h1 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            <p className="mb-6 text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                <time dateTime={isoDate(post.publishedAt)}>{formatDate(post.publishedAt)}</time>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" aria-hidden="true" />
                {post.readTimeMinutes} min read
              </span>
              <span>By {settings.fullName}</span>
            </div>
          </header>

          {post.coverImage ? (
            <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-2xl border border-border">
              <Image
                src={post.coverImage}
                alt=""
                fill
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
          ) : null}

          <Markdown>{post.body}</Markdown>

          {post.tags?.length ? (
            <ul className="mt-10 flex flex-wrap gap-2 border-t border-border pt-8">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground"
                >
                  <Tag className="h-3 w-3" aria-hidden="true" />
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}

          <aside className="mt-12 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 p-8 text-center">
            <h2 className="mb-3 text-2xl font-bold">Need help building this?</h2>
            <p className="mx-auto mb-6 max-w-xl text-muted-foreground">
              I work with businesses on React, Next.js and mobile projects from {settings.location}.
            </p>
            <Button asChild size="lg">
              <Link href="/contact">Get in touch</Link>
            </Button>
          </aside>

          {related.length > 0 ? (
            <section className="mt-16" aria-labelledby="related-heading">
              <h2 id="related-heading" className="mb-6 text-2xl font-bold">
                Related reading
              </h2>
              <ul className="grid gap-4 sm:grid-cols-3">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/blog/${item.slug}`}
                      className="block h-full rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-gold"
                    >
                      <p className="mb-2 line-clamp-2 font-semibold">{item.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.readTimeMinutes} min read
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </article>
    </>
  );
}
