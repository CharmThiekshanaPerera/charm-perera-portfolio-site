import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PostDoc } from "@charm/db";
import { Button } from "@charm/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import { PostCard } from "./post-card";

/**
 * Server-rendered grid rather than the previous client-only carousel: the
 * article titles and excerpts are now in the HTML, and each links to a real
 * article page.
 */
export function BlogSection({ posts }: { posts: PostDoc[] }) {
  if (posts.length === 0) return null;

  return (
    <section id="blog" className="relative overflow-hidden py-12 sm:py-16 md:py-24">
      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            title="Latest"
            highlight="Articles"
            description="Notes on development, architecture and building products that last."
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/blog">
                View all articles
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
