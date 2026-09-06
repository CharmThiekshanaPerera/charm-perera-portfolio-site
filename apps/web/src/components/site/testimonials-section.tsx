"use client";

import Autoplay from "embla-carousel-autoplay";
import { ExternalLink, Quote } from "lucide-react";
import type { TestimonialDoc } from "@charm/db";
import { Card, CardContent } from "@charm/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@charm/ui/carousel";

export function TestimonialsSection({ testimonials }: { testimonials: TestimonialDoc[] }) {
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="relative overflow-hidden py-16 sm:py-24">
      <div className="container relative z-10 mx-auto px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 animate-fade-in text-center sm:mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
              Client <span className="text-gradient">Testimonials</span>
            </h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              What clients say about working with me
            </p>
          </div>

          <Carousel
            opts={{ align: "start", loop: true }}
            plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
            className="mx-auto w-full max-w-5xl"
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial._id} className="md:basis-1/2">
                  <div className="h-full p-2">
                    <Card className="group flex h-full flex-col transition-all duration-300 hover:border-primary/50 hover:shadow-gold">
                      <CardContent className="flex h-full flex-col p-6 sm:p-8">
                        <Quote
                          className="mb-4 h-10 w-10 flex-shrink-0 text-primary opacity-50 transition-opacity group-hover:opacity-100"
                          aria-hidden="true"
                        />
                        <blockquote className="mb-6 flex-grow text-sm italic leading-relaxed text-foreground/90 sm:text-base">
                          {testimonial.content}
                        </blockquote>
                        <footer className="flex items-center gap-4">
                          <span
                            className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-gold font-bold text-primary-foreground"
                            aria-hidden="true"
                          >
                            {testimonial.avatar}
                          </span>
                          <div className="flex-1">
                            <p className="font-semibold text-foreground">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {testimonial.role}
                              {testimonial.company ? ` at ${testimonial.company}` : ""}
                            </p>
                            {testimonial.website ? (
                              <a
                                href={testimonial.website}
                                target="_blank"
                                rel="noopener noreferrer nofollow"
                                className="mt-1 inline-flex items-center gap-1 text-xs text-primary hover:underline"
                              >
                                Visit website
                                <ExternalLink className="h-3 w-3" aria-hidden="true" />
                              </a>
                            ) : null}
                          </div>
                        </footer>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border-2 border-primary/70 bg-primary/20 text-primary hover:bg-primary hover:text-primary-foreground" />
            <CarouselNext className="border-2 border-primary/70 bg-primary/20 text-primary hover:bg-primary hover:text-primary-foreground" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
