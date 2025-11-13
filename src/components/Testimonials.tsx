import { Card, CardContent } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "./ui/carousel";
import { Quote, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

const Testimonials = () => {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;
  }, [api]);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager at TechCorp",
      content: "Working with Charm was exceptional. His attention to detail and ability to transform complex requirements into elegant solutions is remarkable. The mobile app he developed exceeded our expectations.",
      avatar: "SJ",
      website: "https://techcorp.com"
    },
    {
      name: "Dr. Michael Chen",
      role: "CEO at Space IT Labs",
      content: "Charm's work on the Lifesaylor Affirmation app has been transformative for our healthcare initiatives. His technical expertise combined with genuine understanding of user needs resulted in an app that's making real difference in people's lives.",
      avatar: "MC",
      website: "https://spaceitlabs.com"
    },
    {
      name: "Emma Rodriguez",
      role: "Healthcare Director at Wellness Plus",
      content: "The Lifesaylor app has made a significant impact on our patients' daily motivation. Charm's understanding of user needs and technical implementation is top-notch. Highly professional and delivers beyond expectations.",
      avatar: "ER",
      website: "https://wellnessplus.health"
    },
    {
      name: "David Thompson",
      role: "Founder at StartupHub",
      content: "Charm's frontend development skills are exceptional. He consistently delivers pixel-perfect designs with smooth animations and excellent performance. A true professional who understands both design and development.",
      avatar: "DT",
      website: "https://startuphub.io"
    },
    {
      name: "Lisa Anderson",
      role: "Marketing Director at Digital Ventures",
      content: "Outstanding work on our web platform. Charm's ability to understand business requirements and translate them into beautiful, functional interfaces is impressive. The results exceeded our ROI projections.",
      avatar: "LA",
      website: "https://digitalventures.com"
    },
    {
      name: "James Wilson",
      role: "CTO at InnovateTech Solutions",
      content: "Charm's technical expertise and problem-solving skills are outstanding. He delivered our mobile app ahead of schedule with exceptional quality and performance. The code quality and architecture are exemplary.",
      avatar: "JW",
      website: "https://innovatetech.io"
    },
    {
      name: "Sophie Martinez",
      role: "Lead Designer at CreativeStudio",
      content: "Working with Charm was a pleasure! He perfectly implemented our designs with pixel-perfect accuracy and added thoughtful animations that enhanced the user experience. True collaboration at its best.",
      avatar: "SM",
      website: "https://creativestudio.design"
    },
    {
      name: "Robert Kim",
      role: "Business Owner at Kim's Retail Group",
      content: "Charm transformed our outdated website into a modern, fast, and beautiful platform. Our conversion rates improved by 40% after the redesign. Highly professional and great communication throughout.",
      avatar: "RK",
      website: "https://kimsretail.com"
    },
    {
      name: "Emily Foster",
      role: "Project Manager at DigitalHub Agency",
      content: "Exceptional communication and delivery. Charm kept us updated throughout the project and was always available to discuss improvements. The final product exceeded expectations and our client was thrilled.",
      avatar: "EF",
      website: "https://digitalhub.agency"
    },
    {
      name: "Dr. Thomas Brown",
      role: "Healthcare Administrator at MediCare Systems",
      content: "The applications Charm developed have revolutionized how we engage with our patients. His attention to healthcare-specific requirements and user experience is remarkable. HIPAA compliance was handled perfectly.",
      avatar: "TB",
      website: "https://medicare-systems.health"
    },
    {
      name: "Rachel Cooper",
      role: "Operations Manager at RestaurantPro",
      content: "The restaurant management system Charm built has transformed our operations. Reduced costs by 30% and improved efficiency dramatically. Best investment we've made in technology.",
      avatar: "RC",
      website: "https://restaurantpro.com"
    },
    {
      name: "Antonio Rossi",
      role: "Director at GlobalTech Italia",
      content: "Charm's work on our corporate website was exceptional. The multilingual support and modern design perfectly represent our brand internationally. Professional, timely, and excellent quality.",
      avatar: "AR",
      website: "https://globaltech.it"
    },
    {
      name: "Patricia Hughes",
      role: "Founder at PetCare Connect",
      content: "The Perera's Paws platform exceeded our expectations. Charm understood our vision for connecting pet lovers with services and created a beautiful, functional solution that our users love.",
      avatar: "PH",
      website: "https://petcareconnect.com"
    },
    {
      name: "Kevin Zhang",
      role: "CEO at Analytics Pro",
      content: "The AI-powered analytics dashboard Charm developed has become central to our business operations. The insights and automation have helped us increase client ROI by 45%. Outstanding work!",
      avatar: "KZ",
      website: "https://analyticspro.io"
    },
    {
      name: "Maria Santos",
      role: "Director at EduLearn Platform",
      content: "Our online learning platform built by Charm has scaled to thousands of students. The video streaming, live classes, and certificate system work flawlessly. Highly recommended for educational projects.",
      avatar: "MS",
      website: "https://edulearn.com"
    }
  ];

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Client <span className="text-gradient">Testimonials</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              What clients say about working with me
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
                delay: 4000,
                stopOnInteraction: true,
              }),
            ]}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                  <div className="p-2 h-full">
                    <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-gold animate-fade-in group h-full flex flex-col">
                      <CardContent className="p-6 sm:p-8 flex flex-col h-full">
                        <Quote className="w-10 h-10 text-primary mb-4 opacity-50 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                        <p className="text-foreground/90 mb-6 leading-relaxed italic flex-grow text-sm sm:text-base line-clamp-6">
                          "{testimonial.content}"
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center text-primary-foreground font-bold">
                            {testimonial.avatar}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                            {(testimonial as any).website && (
                              <a 
                                href={(testimonial as any).website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-primary hover:underline inline-flex items-center gap-1 mt-1"
                              >
                                Visit Website
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-primary/20 border-2 border-primary/70 text-primary hover:bg-primary hover:text-primary-foreground shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-110 w-12 h-12" />
            <CarouselNext className="bg-primary/20 border-2 border-primary/70 text-primary hover:bg-primary hover:text-primary-foreground shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-110 w-12 h-12" />
          </Carousel>
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
};

export default Testimonials;
