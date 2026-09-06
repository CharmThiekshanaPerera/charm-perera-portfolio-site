"use client";

import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight } from "lucide-react";
import type { PostDoc } from "@charm/db";
import { Button } from "@charm/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@charm/ui/carousel";
import { SectionHeading } from "@/components/shared/section-heading";
import { PostCard } from "./post-card";

/**
 * Home page article carousel, matching the original site's autoplay behaviour.
 *
 * Unlike the old version, each card links to a real /blog/[slug] page instead
 * of opening a modal, so the article text exists as its own indexable document
 * rather than only inside a dialog.
 */
export function BlogSection({ posts }: { posts: PostDoc[] }) {
  if (posts.length === 0) return null;

  return (
    <section id="blog" className="relative overflow-hidden py-12 sm:py-16 md:py-24">
      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            title="Latest"
            highlight="Blog Posts"
            description="Insights, tutorials and thoughts on development and technology."
          />

          <Carousel
            opts={{ align: "start", loop: true }}
            plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
            className="mx-auto w-full max-w-6xl"
          >
            <CarouselContent>
              {posts.map((post) => (
                <CarouselItem key={post.slug} className="md:basis-1/2 lg:basis-1/3">
                  <div className="h-full p-2">
                    <PostCard post={post} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border-primary text-primary hover:bg-primary hover:text-primary-foreground" />
            <CarouselNext className="border-primary text-primary hover:bg-primary hover:text-primary-foreground" />
          </Carousel>

          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/blog">
                View all posts
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
