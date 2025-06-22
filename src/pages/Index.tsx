
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Mail, Phone, Linkedin, Github, ExternalLink, MapPin, Calendar, Building2, Moon, Sun, Download, ChevronDown, Filter, Smartphone, Code, Cloud, Brain, Database, Palette } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import FloatingElements from "@/components/FloatingElements";
import SocialMediaSlider from "@/components/SocialMediaSlider";
import DynamicTyping from "@/components/DynamicTyping";
import AIChatbot from "@/components/AIChatbot";
import ContactForms from "@/components/ContactForms";
import BackgroundImageSlider from "@/components/BackgroundImageSlider";
import MobileNavigation from "@/components/MobileNavigation";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillsSection";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [heroTheme, setHeroTheme] = useState(0);
  const [aboutTheme, setAboutTheme] = useState(0);
  const { theme, toggleTheme } = useTheme();

  const typingTexts = ["Software Engineer", "Web & Mobile App Developer", "AI Engineer", "Full Stack Developer"];
  
  const heroThemes = [
    "gradient-bg-1",
    "gradient-bg-2", 
    "gradient-bg-3",
    "gradient-bg-4"
  ];

  const aboutThemes = [
    "bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900",
    "bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900",
    "bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-900",
    "bg-gradient-to-br from-slate-800 via-blue-800 to-slate-800"
  ];

  useEffect(() => {
    setIsVisible(true);
    const heroInterval = setInterval(() => {
      setHeroTheme(prev => (prev + 1) % heroThemes.length);
    }, 5000);
    
    const aboutInterval = setInterval(() => {
      setAboutTheme(prev => (prev + 1) % aboutThemes.length);
    }, 4000);
    
    return () => {
      clearInterval(heroInterval);
      clearInterval(aboutInterval);
    };
  }, []);

  const skills = {
    "Mobile App Development": {
      icon: Smartphone,
      color: "text-purple-400",
      skills: ["iOS & Android Development", "React Native"]
    },
    "Frontend Development": {
      icon: Code,
      color: "text-blue-400",
      skills: ["React", "Vite", "HTML", "CSS", "JavaScript"]
    },
    "Backend & Cloud": {
      icon: Cloud,
      color: "text-pink-400",
      skills: ["Flask", "Node.js", "API Integration", "AWS (EC2, S3)", "Cloud Platforms"]
    },
    "AI & Machine Learning": {
      icon: Brain,
      color: "text-cyan-400",
      skills: ["LLM Integration (Phi-2 LLM)", "ML-powered App Development"]
    },
    "DevOps & Database": {
      icon: Database,
      color: "text-green-400",
      skills: ["GitHub CI/CD Pipelines", "Database Management (MongoDB Atlas, MySQL)"]
    },
    "UI/UX & Quality Assurance": {
      icon: Palette,
      color: "text-yellow-400",
      skills: ["UI/UX Collaboration", "App Testing & Maintenance", "Version Control (Git)"]
    }
  };

  const experiences = [
    {
      role: "Mobile Engineer",
      company: "Phyxle",
      location: "Colombo, Sri Lanka (Remote)",
      dates: "July 2024 - Present",
      achievements: [
        "Designed and developed high-performance mobile applications with a focus on user-centric functionality and performance.",
        "Collaborated effectively with design teams to create intuitive and visually appealing user interfaces.",
        "Conducted thorough app testing to ensure quality assurance, security, reliability, and high-performing applications."
      ]
    },
    {
      role: "Mobile Application Developer",
      company: "Space IT Labs",
      location: "Nottingham, England, United Kingdom (Remote)",
      dates: "November 2022 - June 2024",
      achievements: [
        "Developed the Lifesaylor Affirmation mobile application, significantly impacting the healthcare sector.",
        "Collaborated with UI/UX teams to deliver engaging and functional designs.",
        "Conducted comprehensive testing to ensure functionality, performance, and security.",
        "Supported backend development and API testing for seamless integration and robust architecture."
      ]
    }
  ];

  const projects = [
    {
      title: "AI To-Do Agent",
      description: "Mobile and web productivity assistant leveraging React Native, Flask, and the Phi-2 LLM. Includes task memory, intelligent scheduling, and adaptive prompts.",
      technologies: ["React Native", "Flask", "Phi-2 LLM"],
      category: "AI/ML",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop&crop=center",
      demoLink: null,
      githubLink: null
    },
    {
      title: "House Price Prediction App",
      description: "ML-powered application predicting house prices based on user input, with a Flask API backend and React Native frontend.",
      technologies: ["Flask API", "React Native", "Machine Learning"],
      category: "AI/ML",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop&crop=center",
      demoLink: null,
      githubLink: null
    },
    {
      title: "Perera's Paws",
      description: "Responsive frontend and admin panel built with Vite and Node.js. Hosted on AWS EC2 with asset management via S3 and MongoDB Atlas backend.",
      technologies: ["Vite", "Node.js", "AWS EC2", "AWS S3", "MongoDB Atlas"],
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=250&fit=crop&crop=center",
      demoLink: null,
      githubLink: null
    },
    {
      title: "Lifesaylor: Daily Motivation App",
      description: "Motivational app available on Google Play Store, featuring daily quotes and personalized content. Focused on user-friendly design, robust backend integration, and thorough testing.",
      technologies: ["Android", "Backend Integration"],
      category: "Mobile Development",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop&crop=center",
      demoLink: "https://play.google.com/store/apps/details?id=com.lifesaylor",
      githubLink: null
    },
    {
      title: "Lifesaylor: Affirmation App",
      description: "App promoting mental well-being through daily affirmations and mindfulness practices. Collaborated with UI/UX teams for user-friendly design and supported a successful launch.",
      technologies: ["Mobile Development", "UI/UX Collaboration"],
      category: "Mobile Development",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=250&fit=crop&crop=center",
      demoLink: "https://play.google.com/store/apps/details?id=com.lifesaylor.affirmation",
      githubLink: null
    },
    {
      title: "WordPress Web Projects",
      description: "Developed and maintained multiple dynamic websites using WordPress, PHP, and MySQL for various clients.",
      technologies: ["WordPress", "PHP", "MySQL"],
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop&crop=center",
      websites: [
        { name: "Velys.com.au", url: "https://velys.com.au" },
        { name: "OkiGlobalEdu.com", url: "https://okiglobaledu.com" },
        { name: "EConsulate.net", url: "https://econsulate.net" }
      ]
    }
  ];

  const categories = ["All", "Mobile Development", "Web Development", "AI/ML"];
  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>Charm Thiekshana Perera - Mobile Engineer & Full Stack Developer | React Native Expert</title>
        <meta name="description" content="Experienced Mobile Engineer specializing in React Native, AI integration, and full-stack development. 2+ years building high-performance mobile applications with expertise in Flask, Node.js, AWS, and machine learning." />
        <meta name="keywords" content="Mobile Engineer, React Native Developer, AI Engineer, Full Stack Developer, Mobile App Development, Sri Lanka Developer, iOS Android, Machine Learning, Flask API, Node.js, AWS Cloud" />
        <meta name="author" content="Charm Thiekshana Perera" />
        
        {/* Enhanced Open Graph tags */}
        <meta property="og:title" content="Charm Thiekshana Perera - Mobile Engineer & AI Developer" />
        <meta property="og:description" content="Expert Mobile Engineer with 2+ years experience in React Native, AI integration, and full-stack development. Building innovative mobile solutions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://charm-perera-portfolio.com" />
        <meta property="og:image" content="https://charm-perera-portfolio.com/lovable-uploads/e2880e33-3dfc-496b-b77d-fad52bbb2e34.png" />
        <meta property="og:site_name" content="Charm Thiekshana Perera Portfolio" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Charm Thiekshana Perera - Mobile Engineer" />
        <meta name="twitter:description" content="Expert Mobile Engineer specializing in React Native, AI integration, and full-stack development." />
        <meta name="twitter:image" content="https://charm-perera-portfolio.com/lovable-uploads/e2880e33-3dfc-496b-b77d-fad52bbb2e34.png" />
        <meta name="twitter:creator" content="@CharmThiekshana" />
        
        {/* Additional SEO tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="https://charm-perera-portfolio.com" />
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Charm Thiekshana Perera",
            "jobTitle": "Mobile Engineer",
            "description": "Experienced Mobile Engineer specializing in React Native, AI integration, and full-stack development",
            "url": "https://charm-perera-portfolio.com",
            "sameAs": [
              "https://www.linkedin.com/in/charm-thiekshana-644b85346",
              "https://github.com/CharmThiekshanaPerera",
              "https://www.facebook.com/Charmz1997SL"
            ],
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Kalalpitiya, Pasyala",
              "addressCountry": "Sri Lanka"
            },
            "email": "charmthiekshana97@gmail.com",
            "telephone": "+94729755955",
            "knowsAbout": [
              "React Native",
              "Mobile App Development",
              "AI Integration",
              "Full Stack Development",
              "Flask",
              "Node.js",
              "AWS",
              "Machine Learning"
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
        <FloatingElements />
        <SocialMediaSlider />
        <AIChatbot />
        
        {/* Navigation */}
        <nav className="fixed top-0 w-full glass-card z-50">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent animate-bounce-in">
                Charm Thiekshana
              </div>
              <div className="flex items-center gap-6">
                <div className="hidden md:flex space-x-8">
                  {["Home", "About", "Skills", "Experience", "Projects", "Education", "Contact"].map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setActiveSection(item.toLowerCase());
                        scrollToSection(item.toLowerCase());
                      }}
                      className={`text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-all duration-300 font-medium hover:scale-110 transform ${
                        activeSection === item.toLowerCase() ? 'text-blue-500 dark:text-blue-300 font-bold scale-110' : ''
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                <MobileNavigation 
                  activeSection={activeSection}
                  setActiveSection={setActiveSection}
                  scrollToSection={scrollToSection}
                />
                <div className="flex items-center space-x-2">
                  <Sun className="h-4 w-4 text-yellow-500" />
                  <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
                  <Moon className="h-4 w-4 text-blue-500" />
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="home" className={`min-h-screen pt-24 pb-20 px-6 relative transition-all duration-1000 ${heroThemes[heroTheme]} flex items-center`}>
          <BackgroundImageSlider />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="max-w-6xl mx-auto relative z-10 w-full">
            <div className={`flex flex-col lg:flex-row items-center gap-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <div className="flex-1 text-center lg:text-left">
                <div className="mb-6">
                  <h1 className="text-5xl lg:text-7xl font-bold mb-4 text-white">
                    Charm Thiekshana
                    <span className="block text-3xl lg:text-5xl mt-2 bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">Perera</span>
                  </h1>
                  <div className="text-xl text-white/90 mb-4 animate-fade-in-up delay-300 h-8">
                    <DynamicTyping texts={typingTexts} className="font-medium" />
                  </div>
                  <p className="text-lg text-white/80 leading-relaxed max-w-2xl animate-fade-in-up delay-500">
                    Dedicated Mobile Engineer crafting user-centric, high-performance applications with expertise in AI, web, and cloud technologies.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up delay-700">
                  <Button size="lg" onClick={() => scrollToSection('contact')} className="btn-modern">
                    <Mail className="w-5 h-5 mr-2" />
                    Get In Touch
                  </Button>
                  <Button size="lg" className="glass-card hover:scale-110 transition-all duration-300 text-white neon-border">
                    <Download className="w-5 h-5 mr-2" />
                    Download CV
                  </Button>
                </div>
              </div>
              <div className="flex-shrink-0 animate-bounce-in delay-1000">
                <div className="relative group">
                  <div className="absolute -inset-8 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-all duration-500 animate-glow"></div>
                  <div className="relative w-80 h-80 rounded-3xl overflow-hidden shadow-2xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 neon-border">
                    <img 
                      src="/lovable-uploads/e2880e33-3dfc-496b-b77d-fad52bbb2e34.png" 
                      alt="Charm Thiekshana Perera - Mobile Engineer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-6 h-6 text-white/80" />
          </div>
        </section>

        {/* About Section */}
        <AboutSection aboutTheme={aboutTheme} aboutThemes={aboutThemes} />

        {/* Skills Section */}
        <SkillsSection />

        {/* Experience Section */}
        <ExperienceSection />

        {/* Projects Section */}
        <section id="projects" className={`py-20 px-6 ${theme === 'light' ? 'light-projects-bg text-white' : 'bg-slate-800/30'}`}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl font-bold mb-4 text-blue-400">My Projects</h2>
              <p className="text-xl text-slate-300">Showcasing practical application of skills</p>
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={`transform hover:scale-105 transition-all duration-300 ${
                    selectedCategory === category 
                      ? 'bg-blue-500 text-white' 
                      : 'border-blue-500/20 text-slate-300 hover:bg-blue-500/20'
                  }`}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {category}
                </Button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg overflow-hidden bg-slate-800/50 backdrop-blur-sm hover:scale-105 transform animate-fade-in-scale" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="aspect-video overflow-hidden relative">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors text-slate-200">
                      {project.title}
                    </h3>
                    <p className="text-slate-300 mb-4 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs border-blue-500/20 text-blue-400 hover:bg-blue-500/20 transition-colors">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.demoLink && (
                        <Button size="sm" asChild className="bg-blue-500 hover:bg-blue-600 transform hover:scale-105 transition-all duration-300">
                          <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                      {project.githubLink && (
                        <Button size="sm" variant="outline" asChild className="transform hover:scale-105 transition-all duration-300 border-blue-500/20">
                          <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-2" />
                            GitHub
                          </a>
                        </Button>
                      )}
                      {project.websites && (
                        <div className="flex flex-wrap gap-2 w-full mt-2">
                          {project.websites.map((website) => (
                            <Button key={website.name} size="sm" variant="outline" asChild className="text-xs transform hover:scale-105 transition-all duration-300 border-blue-500/20">
                              <a href={website.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-3 h-3 mr-1" />
                                {website.name}
                              </a>
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <EducationSection />

        {/* Contact Section */}
        <section id="contact" className={`py-20 px-6 ${theme === 'light' ? 'light-contact-bg text-white' : 'bg-slate-800/30'}`}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl font-bold mb-4 text-blue-400">Get In Touch</h2>
              <p className="text-xl text-slate-300">Let's collaborate on your next project</p>
            </div>
            
            {/* Contact Forms */}
            <div className="mb-16">
              <ContactForms />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Mail, title: "Email", content: "charmthiekshana97@gmail.com", href: "mailto:charmthiekshana97@gmail.com" },
                { icon: Phone, title: "Phone", content: "+94 72 975 5955", href: "tel:+94729755955" },
                { icon: MapPin, title: "Location", content: "Kalalpitiya, Pasyala, Sri Lanka", href: null },
                { icon: Linkedin, title: "LinkedIn", content: "Connect with me", href: "https://www.linkedin.com/in/charm-thiekshana-644b85346" }
              ].map((contact, index) => (
                <Card key={contact.title} className="bg-slate-800/50 backdrop-blur-sm border-blue-500/20 text-center hover:scale-105 transform transition-all duration-500 hover:shadow-xl animate-fade-in-scale group" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardContent className="p-6">
                    <div className="relative mb-4">
                      <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <contact.icon className="w-8 h-8 mx-auto relative z-10 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="font-semibold mb-2 text-blue-400">{contact.title}</h3>
                    {contact.href ? (
                      <a href={contact.href} target={contact.href.startsWith('http') ? '_blank' : undefined} rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined} className="text-slate-300 hover:text-blue-400 transition-colors text-sm hover:underline">
                        {contact.content}
                      </a>
                    ) : (
                      <p className="text-slate-300 text-sm">{contact.content}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Additional Contact CTA */}
            <div className="text-center mt-12">
              <div className="inline-flex items-center gap-4 p-6 bg-blue-500/10 rounded-2xl border border-blue-500/20 backdrop-blur-sm">
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-blue-400 mb-1">Ready to collaborate?</h3>
                  <p className="text-slate-300 text-sm">Let's discuss your next project</p>
                </div>
                <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transform hover:scale-105 transition-all duration-300">
                  <Mail className="w-4 h-4 mr-2" />
                  Start a Conversation
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-blue-500/20 bg-slate-900">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-slate-300">
              © 2024 Charm Thiekshana Perera. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
