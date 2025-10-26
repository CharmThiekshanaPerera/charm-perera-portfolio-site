import { ExternalLink, Github, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

const Projects = () => {
  const [expandedProjects, setExpandedProjects] = useState<number[]>([]);
  const [showAllProjects, setShowAllProjects] = useState(false);

  const toggleProject = (index: number) => {
    setExpandedProjects(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const projects = [
    {
      title: "Lifesaylor",
      description: "A daily motivation mobile app designed to inspire users through meaningful quotes and affirmations. Successfully launched on Google Play Store with significant impact in the healthcare sector.",
      fullDescription: "Lifesaylor is a comprehensive mobile application that delivers daily motivation through carefully curated quotes, affirmations, and mindfulness exercises. The app features a beautiful, intuitive interface with smooth animations and personalized content delivery. Successfully launched on Google Play Store, it has helped thousands of users in the healthcare sector maintain positive mental health and daily motivation. Key features include customizable notification schedules, favorite quotes collection, and progress tracking.",
      technologies: ["Mobile App", "Android", "iOS", "Healthcare"],
      link: "https://play.google.com/store/apps/details?id=com.lifesaylor",
      github: "https://github.com/CharmThiekshanaPerera",
      featured: true
    },
    {
      title: "Lifesaylor Affirmation",
      description: "A companion app focused on personal growth and positive mindset reinforcement. Features engaging UI/UX design and comprehensive testing for optimal performance.",
      fullDescription: "This companion app takes personal growth to the next level with an advanced affirmation system. Users can create custom affirmations, set personalized goals, and track their journey with detailed analytics. The app features voice recording for self-affirmations, background audio support, and integration with wellness tracking. Extensive UI/UX testing ensures a seamless experience across all devices.",
      technologies: ["Mobile App", "UI/UX", "Personal Growth"],
      link: "https://play.google.com/store/apps/details?id=com.lifesaylor.affirmation",
      github: "https://github.com/CharmThiekshanaPerera",
      featured: true
    },
    {
      title: "E-Commerce Platform",
      description: "A modern e-commerce solution with real-time inventory management, secure payment processing, and advanced analytics dashboard.",
      fullDescription: "Built a full-featured e-commerce platform with seamless shopping experience, integrated payment gateways including Stripe and PayPal, real-time order tracking, and comprehensive admin dashboard. Features include product recommendations, wishlist functionality, and automated email notifications.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
      link: "https://ecommerce-demo.nesturelabs.com",
      github: "https://github.com/CharmThiekshanaPerera",
      featured: true
    },
    {
      title: "Healthcare Management System",
      description: "Comprehensive patient management system with appointment scheduling, medical records, and telemedicine capabilities.",
      fullDescription: "Developed a HIPAA-compliant healthcare platform that streamlines clinic operations. Features include patient portal, doctor dashboards, appointment scheduling, prescription management, video consultations, and integrated billing. The system improved operational efficiency by 60% for partner clinics.",
      technologies: ["React", "TypeScript", "PostgreSQL", "WebRTC"],
      link: "https://healthcare-demo.nesturelabs.com",
      github: "https://github.com/CharmThiekshanaPerera",
      featured: true
    },
    {
      title: "AI-Powered Analytics Dashboard",
      description: "Business intelligence platform with machine learning insights, predictive analytics, and automated reporting.",
      fullDescription: "Created an enterprise analytics solution that processes millions of data points to deliver actionable insights. Features AI-powered trend detection, custom report generation, real-time data visualization, and automated alerts. Helped clients increase ROI by 45% through data-driven decisions.",
      technologies: ["React", "Python", "TensorFlow", "D3.js"],
      link: "https://analytics.nesturelabs.com",
      github: "https://github.com/CharmThiekshanaPerera",
      featured: true
    },
    {
      title: "Restaurant Management Suite",
      description: "All-in-one restaurant solution with POS, inventory, delivery tracking, and customer loyalty programs.",
      fullDescription: "Built a complete restaurant management ecosystem handling orders, kitchen operations, staff management, and customer engagement. Integrated with delivery platforms, payment processors, and accounting software. Reduced operational costs by 30% for restaurant chains.",
      technologies: ["React Native", "Node.js", "Firebase", "Stripe"],
      link: "https://restaurant-demo.nesturelabs.com",
      github: "https://github.com/CharmThiekshanaPerera",
      featured: true
    },
    {
      title: "Perera's Paws",
      description: "A pet care and adoption platform connecting pet lovers with shelters and services. Professional website with modern design and user-friendly interface.",
      technologies: ["Web App", "React", "Frontend"],
      link: "https://pereras-paws.com",
      featured: false
    },
    {
      title: "Real Estate Portal",
      description: "A property listing platform with advanced search filters, virtual tours, mortgage calculator, and integrated booking system.",
      technologies: ["Next.js", "Tailwind CSS", "Map Integration"],
      link: "https://realestate-demo.nesturelabs.com",
      featured: false
    },
    {
      title: "Fitness Tracker App",
      description: "A comprehensive fitness application with workout plans, nutrition tracking, progress analytics, and social features for fitness enthusiasts.",
      technologies: ["React Native", "Firebase", "HealthKit"],
      link: "https://fitness-demo.nesturelabs.com",
      featured: false
    },
    {
      title: "Social Media Management Tool",
      description: "Multi-platform social media scheduler with analytics, content calendar, and team collaboration features for businesses.",
      technologies: ["React", "Redux", "GraphQL", "AWS"],
      link: "https://socialmedia.nesturelabs.com",
      featured: false
    },
    {
      title: "Online Learning Platform",
      description: "Educational platform with video courses, live classes, assignments, progress tracking, and certification system.",
      technologies: ["React", "WebRTC", "MongoDB", "AWS S3"],
      link: "https://learning.nesturelabs.com",
      featured: false
    },
    {
      title: "Event Management System",
      description: "Complete event planning solution with ticketing, attendee management, check-in system, and real-time analytics.",
      technologies: ["React", "Node.js", "QR Code", "Payment Gateway"],
      link: "https://events.nesturelabs.com",
      featured: false
    },
    {
      title: "Hotel Booking Platform",
      description: "Hotel reservation system with availability calendar, pricing engine, payment processing, and guest management features.",
      technologies: ["Next.js", "Prisma", "Stripe", "AWS"],
      link: "https://hotel-booking.nesturelabs.com",
      featured: false
    },
    {
      title: "Inventory Management System",
      description: "Advanced inventory tracking with barcode scanning, automated reordering, supplier management, and multi-location support.",
      technologies: ["React", "Node.js", "PostgreSQL", "Redis"],
      link: "https://inventory.nesturelabs.com",
      featured: false
    },
    {
      title: "Delivery Tracking App",
      description: "Real-time delivery tracking system with driver management, route optimization, and customer notifications.",
      technologies: ["React Native", "Google Maps", "Socket.io", "Node.js"],
      link: "https://delivery.nesturelabs.com",
      featured: false
    },
    {
      title: "Charm Thiekshana Portfolio",
      description: "A personal portfolio website highlighting professional achievements, projects, and skills. Built with modern technologies and responsive design.",
      technologies: ["Portfolio", "React", "Vite", "Responsive"],
      link: "https://www.charmthiekshana.com",
      featured: false
    },
    {
      title: "Nesture Labs",
      description: "The official website for my IT solutions startup offering web, mobile, and AI development services. Comprehensive platform showcasing technical capabilities.",
      technologies: ["Corporate", "IT Solutions", "Full Stack"],
      link: "https://nesturelabs.com",
      featured: false
    },
    {
      title: "CRM System",
      description: "Customer relationship management platform with lead tracking, pipeline management, email campaigns, and reporting.",
      technologies: ["React", "TypeScript", "PostgreSQL", "SendGrid"],
      link: "https://crm.nesturelabs.com",
      featured: false
    },
    {
      title: "Appointment Booking System",
      description: "Flexible scheduling solution for service businesses with calendar sync, reminders, and payment integration.",
      technologies: ["React", "Node.js", "Calendly API", "Stripe"],
      link: "https://appointments.nesturelabs.com",
      featured: false
    },
    {
      title: "Financial Dashboard",
      description: "Personal finance tracking with budget management, expense categorization, investment tracking, and financial goals.",
      technologies: ["React", "Chart.js", "Plaid API", "Firebase"],
      link: "https://finance.nesturelabs.com",
      featured: false
    }
  ];

  return (
    <section id="projects" className="py-12 sm:py-16 md:py-24 relative overflow-hidden bg-secondary/5">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              A showcase of my best work in mobile and web development
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {(showAllProjects ? projects : projects.slice(0, 6)).map((project, index) => (
              <div 
                key={index}
                className={`group relative bg-card rounded-2xl border border-border hover:border-primary/50 transition-all duration-500 overflow-hidden animate-fade-in hover:shadow-gold ${
                  project.featured ? 'sm:col-span-2' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4 mb-4">
                    <h3 className="text-xl sm:text-2xl font-bold group-hover:text-gradient transition-all duration-300 flex-1">
                      {project.title}
                    </h3>
                    <div className="flex gap-2 flex-shrink-0">
                      {project.link && (
                        <a 
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                          title="View Project"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                      {(project as any).github && (
                        <a 
                          href={(project as any).github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                          title="View GitHub"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                      {project.featured && (
                        <button
                          onClick={() => toggleProject(index)}
                          className="p-2 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                        >
                          {expandedProjects.includes(index) ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-foreground/80 leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {expandedProjects.includes(index) && project.featured && (
                    <div className="mb-6 p-4 bg-primary/5 rounded-xl border border-primary/20 animate-fade-in">
                      <h4 className="font-semibold text-primary mb-2">Project Details</h4>
                      <p className="text-foreground/80 text-sm leading-relaxed">
                        {(project as any).fullDescription}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs font-medium text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            ))}
          </div>

          <div className="text-center mt-12 animate-fade-in space-y-6" style={{ animationDelay: '0.6s' }}>
            <Button 
              onClick={() => setShowAllProjects(!showAllProjects)}
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105"
            >
              {showAllProjects ? (
                <>
                  <ChevronUp className="w-5 h-5 mr-2" />
                  Show Less Projects
                </>
              ) : (
                <>
                  <ChevronDown className="w-5 h-5 mr-2" />
                  View All {projects.length} Projects
                </>
              )}
            </Button>
            
            <div>
              <p className="text-muted-foreground mb-6">
                Want to see more? Check out my GitHub for additional projects and contributions.
              </p>
              <a 
                href="https://github.com/CharmThiekshanaPerera"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-primary text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105"
                >
                  <Github className="w-5 h-5 mr-2" />
                  View GitHub Profile
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
