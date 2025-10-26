import { Card, CardContent } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "./ui/carousel";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "./ui/button";

const Blog = () => {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;
  }, [api]);

  const blogPosts = [
    {
      title: "Building Scalable Mobile Applications with React Native",
      excerpt: "Learn the best practices and architectural patterns for creating high-performance mobile apps that can scale to millions of users. Explore state management, optimization techniques, and deployment strategies.",
      date: "October 15, 2024",
      readTime: "8 min read",
      category: "Mobile Development",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop",
      tags: ["React Native", "Mobile", "Architecture"]
    },
    {
      title: "The Future of Frontend Development in 2025",
      excerpt: "Discover emerging trends in frontend development including AI-assisted coding, advanced animations, micro-frontends, and the evolution of web frameworks. Stay ahead of the curve with insights into what's coming next.",
      date: "October 10, 2024",
      readTime: "6 min read",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
      tags: ["Frontend", "Trends", "AI"]
    },
    {
      title: "Mastering UI/UX Design Principles for Developers",
      excerpt: "A comprehensive guide to understanding design principles that every developer should know. Learn about color theory, typography, spacing, and creating intuitive user interfaces that delight users.",
      date: "October 5, 2024",
      readTime: "10 min read",
      category: "Design",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop",
      tags: ["UI/UX", "Design", "Best Practices"]
    },
    {
      title: "Optimizing React Performance: Tips and Tricks",
      excerpt: "Deep dive into React performance optimization techniques including memoization, lazy loading, code splitting, and profiling. Learn how to make your React applications lightning fast.",
      date: "September 28, 2024",
      readTime: "7 min read",
      category: "React",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=500&fit=crop",
      tags: ["React", "Performance", "Optimization"]
    },
    {
      title: "Building a Successful Career as a Frontend Developer",
      excerpt: "Practical advice and career insights for aspiring and experienced frontend developers. Learn about skill development, portfolio building, networking, and navigating the job market effectively.",
      date: "September 20, 2024",
      readTime: "9 min read",
      category: "Career",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop",
      tags: ["Career", "Tips", "Growth"]
    },
    {
      title: "Integrating AI Features into Modern Web Applications",
      excerpt: "Explore how to incorporate AI capabilities into your web apps using modern APIs and frameworks. From chatbots to image recognition, discover practical implementations and use cases.",
      date: "September 15, 2024",
      readTime: "11 min read",
      category: "AI & ML",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop",
      tags: ["AI", "Machine Learning", "APIs"]
    },
    {
      title: "TypeScript Best Practices for Large-Scale Applications",
      excerpt: "Advanced TypeScript patterns and practices for building maintainable enterprise applications. Learn about type safety, generics, utility types, and organizing complex codebases.",
      date: "September 8, 2024",
      readTime: "8 min read",
      category: "TypeScript",
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=500&fit=crop",
      tags: ["TypeScript", "Best Practices", "Architecture"]
    },
    {
      title: "Effective Testing Strategies for Mobile Applications",
      excerpt: "Comprehensive guide to testing mobile apps covering unit tests, integration tests, E2E testing, and continuous integration. Ensure your apps are bug-free and reliable.",
      date: "September 1, 2024",
      readTime: "10 min read",
      category: "Testing",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop",
      tags: ["Testing", "Quality Assurance", "Mobile"]
    }
  ];

  return (
    <section id="blog" className="py-12 sm:py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Latest <span className="text-gradient">Blog Posts</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Insights, tutorials, and thoughts on development and technology
            </p>
          </div>

          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 5000,
                stopOnInteraction: true,
              }),
            ]}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent>
              {blogPosts.map((post, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-2">
                    <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-gold animate-fade-in group h-full">
                      <CardContent className="p-0">
                        <div className="relative overflow-hidden rounded-t-xl">
                          <img 
                            src={post.image} 
                            alt={post.title}
                            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                              {post.category}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-6 space-y-4">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{post.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{post.readTime}</span>
                            </div>
                          </div>

                          <h3 className="text-xl font-bold text-foreground group-hover:text-gradient transition-all duration-300 line-clamp-2">
                            {post.title}
                          </h3>

                          <p className="text-foreground/70 text-sm leading-relaxed line-clamp-3">
                            {post.excerpt}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag, idx) => (
                              <span 
                                key={idx}
                                className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                              >
                                <Tag className="w-3 h-3" />
                                {tag}
                              </span>
                            ))}
                          </div>

                          <Button 
                            variant="ghost" 
                            className="w-full justify-between group/btn hover:bg-primary/10 hover:text-primary"
                          >
                            Read More
                            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border-primary text-primary hover:bg-primary hover:text-primary-foreground" />
            <CarouselNext className="border-primary text-primary hover:bg-primary hover:text-primary-foreground" />
          </Carousel>

          <div className="text-center mt-12 animate-fade-in">
            <Button 
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105"
            >
              View All Posts
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
};

export default Blog;
