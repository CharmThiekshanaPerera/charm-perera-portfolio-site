import { useState, useEffect } from "react";
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

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [heroTheme, setHeroTheme] = useState(0);
  const [aboutTheme, setAboutTheme] = useState(0);
  const { theme, toggleTheme } = useTheme();

  const typingTexts = ["Software Engineer", "Web & Mobile App Developer", "AI Engineer", "Full Stack Developer"];
  
  const heroThemes = [
    "bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900",
    "bg-gradient-to-br from-green-800 via-teal-900 to-blue-900",
    "bg-gradient-to-br from-orange-800 via-red-900 to-purple-900",
    "bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900"
  ];

  const aboutThemes = [
    "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900",
    "bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900",
    "bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900",
    "bg-gradient-to-br from-violet-900 via-pink-900 to-violet-900"
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
      color: "text-green-500",
      skills: ["iOS & Android Development", "React Native"]
    },
    "Frontend Development": {
      icon: Code,
      color: "text-blue-500",
      skills: ["React", "Vite", "HTML", "CSS", "JavaScript"]
    },
    "Backend & Cloud": {
      icon: Cloud,
      color: "text-purple-500",
      skills: ["Flask", "Node.js", "API Integration", "AWS (EC2, S3)", "Cloud Platforms"]
    },
    "AI & Machine Learning": {
      icon: Brain,
      color: "text-orange-500",
      skills: ["LLM Integration (Phi-2 LLM)", "ML-powered App Development"]
    },
    "DevOps & Database": {
      icon: Database,
      color: "text-red-500",
      skills: ["GitHub CI/CD Pipelines", "Database Management (MongoDB Atlas, MySQL)"]
    },
    "UI/UX & Quality Assurance": {
      icon: Palette,
      color: "text-pink-500",
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
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      <FloatingElements />
      <SocialMediaSlider />
      <AIChatbot />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-border dark:border-gray-700 z-50 glass-effect">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-primary dark:text-blue-400 animate-fade-in-scale">
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
                    className={`text-muted-foreground dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 transition-all duration-300 font-medium hover:scale-105 transform ${
                      activeSection === item.toLowerCase() ? 'text-primary dark:text-blue-400 font-bold' : ''
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="flex items-center space-x-2">
                <Sun className="h-4 w-4 text-yellow-500" />
                <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
                <Moon className="h-4 w-4 text-blue-400" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Full Screen with Background Image Slider */}
      <section id="home" className={`min-h-screen pt-24 pb-20 px-6 relative transition-all duration-1000 ${heroThemes[heroTheme]} flex items-center`}>
        <BackgroundImageSlider />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="max-w-6xl mx-auto relative z-10 w-full">
          <div className={`flex flex-col lg:flex-row items-center gap-12 ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}>
            <div className="flex-1 text-center lg:text-left">
              <div className="mb-6">
                <h1 className="text-5xl lg:text-7xl font-bold mb-4 text-white">
                  Charm Thiekshana
                  <span className="block text-3xl lg:text-5xl mt-2">Perera</span>
                </h1>
                <div className="text-xl text-white/90 mb-4 animate-fade-in-scale delay-300 h-8">
                  <DynamicTyping texts={typingTexts} className="font-medium" />
                </div>
                <p className="text-lg text-white/80 leading-relaxed max-w-2xl animate-fade-in-scale delay-500">
                  Dedicated Mobile Engineer crafting user-centric, high-performance applications with expertise in AI, web, and cloud technologies.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-scale delay-700">
                <Button size="lg" onClick={() => scrollToSection('contact')} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shimmer">
                  <Mail className="w-5 h-5 mr-2" />
                  Get In Touch
                </Button>
                <Button variant="outline" size="lg" className="border-white/20 hover:bg-white/10 text-white transform hover:scale-105 transition-all duration-300">
                  <Download className="w-5 h-5 mr-2" />
                  Download CV
                </Button>
              </div>
            </div>
            <div className="flex-shrink-0 animate-fade-in-scale delay-1000">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="relative w-80 h-80 rounded-2xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-all duration-500">
                  <img 
                    src="/lovable-uploads/e2880e33-3dfc-496b-b77d-fad52bbb2e34.png" 
                    alt="Charm Thiekshana Perera"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-white/80" />
        </div>
      </section>

      {/* About Section with Color Changing Background */}
      <section id="about" className={`py-20 px-6 relative transition-all duration-1000 ${aboutThemes[aboutTheme]}`}>
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16 animate-fade-in-scale">
            <h2 className="text-4xl font-bold mb-4 text-white">About Me</h2>
            <p className="text-xl text-white/80">Passionate about creating innovative solutions</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in-scale">
              <p className="text-lg leading-relaxed text-white/90">
                I'm a dedicated Mobile Engineer with over 2 years of experience in developing high-performance applications. 
                My passion lies in creating user-centric solutions that combine cutting-edge technology with exceptional user experience.
              </p>
              <p className="text-lg leading-relaxed text-white/90">
                Currently working at Phyxle, I specialize in mobile app development, AI integration, and cloud technologies. 
                I have successfully delivered applications that have made significant impacts in healthcare and productivity sectors.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                  <div className="text-2xl font-bold text-white">2+</div>
                  <div className="text-sm text-white/70">Years Experience</div>
                </div>
                <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                  <div className="text-2xl font-bold text-white">15+</div>
                  <div className="text-sm text-white/70">Projects Completed</div>
                </div>
              </div>
            </div>
            <div className="relative animate-fade-in-scale delay-300">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/lovable-uploads/e2880e33-3dfc-496b-b77d-fad52bbb2e34.png"
                  alt="About Charm"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section with Icons */}
      <section id="skills" className="py-20 px-6 bg-muted/30 dark:bg-gray-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-scale">
            <h2 className="text-4xl font-bold mb-4 text-primary dark:text-blue-400">My Expertise</h2>
            <p className="text-xl text-muted-foreground dark:text-gray-300">Technical proficiencies across the development stack</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, data], index) => (
              <Card key={category} className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg bg-card/50 dark:bg-gray-800/50 backdrop-blur-sm hover:scale-105 transform animate-fade-in-scale" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <data.icon className={`w-8 h-8 mr-3 ${data.color}`} />
                    <h3 className="text-xl font-bold group-hover:text-primary dark:group-hover:text-blue-400 transition-colors text-foreground dark:text-white">
                      {category}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.map((skill) => (
                      <Badge 
                        key={skill} 
                        variant="secondary" 
                        className="bg-primary/10 dark:bg-blue-500/20 text-primary dark:text-blue-400 hover:bg-primary/20 dark:hover:bg-blue-500/30 transition-all duration-300 transform hover:scale-105"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6 bg-background dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-scale">
            <h2 className="text-4xl font-bold mb-4 text-primary dark:text-blue-400">Professional Experience</h2>
            <p className="text-xl text-muted-foreground dark:text-gray-300">My journey in software development</p>
          </div>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <Card key={index} className="shadow-2xl border-0 overflow-hidden bg-card/50 dark:bg-gray-800/50 backdrop-blur-sm hover:scale-105 transform transition-all duration-500 animate-fade-in-scale" style={{ animationDelay: `${index * 200}ms` }}>
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-2 text-primary dark:text-blue-400">{exp.role}</h3>
                      <div className="flex items-center gap-4 text-muted-foreground dark:text-gray-300 mb-2">
                        <div className="flex items-center">
                          <Building2 className="w-4 h-4 mr-2" />
                          {exp.company}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          {exp.location}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center text-primary dark:text-blue-400 font-medium">
                      <Calendar className="w-4 h-4 mr-2" />
                      {exp.dates}
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start group">
                        <div className="w-2 h-2 bg-primary dark:bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
                        <span className="text-muted-foreground dark:text-gray-300 leading-relaxed">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-muted/30 dark:bg-gray-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-scale">
            <h2 className="text-4xl font-bold mb-4 text-primary dark:text-blue-400">My Projects</h2>
            <p className="text-xl text-muted-foreground dark:text-gray-300">Showcasing practical application of skills</p>
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
                    ? 'bg-primary dark:bg-blue-600 text-primary-foreground' 
                    : 'border-primary/20 dark:border-blue-400/20 text-foreground dark:text-gray-200 hover:bg-primary/10 dark:hover:bg-blue-500/20'
                }`}
              >
                <Filter className="w-4 h-4 mr-2" />
                {category}
              </Button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg overflow-hidden bg-card/50 dark:bg-gray-800/50 backdrop-blur-sm hover:scale-105 transform animate-fade-in-scale" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="aspect-video overflow-hidden relative">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors text-foreground dark:text-white">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground dark:text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs border-primary/20 dark:border-blue-400/20 text-primary dark:text-blue-400 hover:bg-primary/10 dark:hover:bg-blue-500/20 transition-colors">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.demoLink && (
                      <Button size="sm" asChild className="bg-primary dark:bg-blue-600 hover:bg-primary/90 dark:hover:bg-blue-700 transform hover:scale-105 transition-all duration-300">
                        <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                    {project.githubLink && (
                      <Button size="sm" variant="outline" asChild className="transform hover:scale-105 transition-all duration-300 border-primary/20 dark:border-blue-400/20">
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          GitHub
                        </a>
                      </Button>
                    )}
                    {project.websites && (
                      <div className="flex flex-wrap gap-2 w-full mt-2">
                        {project.websites.map((website) => (
                          <Button key={website.name} size="sm" variant="outline" asChild className="text-xs transform hover:scale-105 transition-all duration-300 border-primary/20 dark:border-blue-400/20">
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

      {/* Education Section with Highlighted Coursework */}
      <section id="education" className="py-20 px-6 bg-background dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-scale">
            <h2 className="text-4xl font-bold mb-4 text-primary dark:text-blue-400">Education</h2>
            <p className="text-xl text-muted-foreground dark:text-gray-300">Academic foundation</p>
          </div>
          <Card className="shadow-2xl border-0 overflow-hidden max-w-4xl mx-auto bg-card/50 dark:bg-gray-800/50 backdrop-blur-sm hover:scale-105 transform transition-all duration-500 animate-fade-in-scale">
            <CardContent className="p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2 text-primary dark:text-blue-400">
                  Bachelor of Science in Information Technology (Honours)
                </h3>
                <p className="text-xl text-primary dark:text-blue-400 mb-4">Sri Lanka Institute of Information Technology (SLIIT)</p>
                <p className="text-muted-foreground dark:text-gray-300 mb-6">May 2018 - October 2022 • Graduated with honours</p>
                <div className="mb-4">
                  <h4 className="text-lg font-semibold mb-3 text-foreground dark:text-white">Key Coursework:</h4>
                  <div className="flex flex-wrap justify-center gap-3">
                    {["Software Development", "Databases", "Mobile Application Development", "Web Application Development"].map((course) => (
                      <Badge key={course} variant="secondary" className="bg-gradient-to-r from-blue-500/30 to-purple-500/30 dark:from-blue-400/30 dark:to-purple-400/30 text-primary dark:text-blue-400 border-2 border-primary/30 dark:border-blue-400/30 hover:bg-primary/20 dark:hover:bg-blue-500/30 transition-all duration-300 transform hover:scale-110 px-4 py-2 text-sm font-medium shadow-lg animate-pulse-glow">
                        {course}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-muted/30 dark:bg-gray-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-scale">
            <h2 className="text-4xl font-bold mb-4 text-primary dark:text-blue-400">Get In Touch</h2>
            <p className="text-xl text-muted-foreground dark:text-gray-300">Let's collaborate on your next project</p>
          </div>
          
          {/* Contact Forms */}
          <div className="mb-16">
            <ContactForms />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Mail, title: "Email", content: "charmthiekshana97@gmail.com", href: "mailto:charmthiekshana97@gmail.com", color: "text-blue-400" },
              { icon: Phone, title: "Phone", content: "+94 754 465 955", href: "tel:+94754465955", color: "text-green-400" },
              { icon: MapPin, title: "Location", content: "Kalalpitiya, Pasyala, Sri Lanka", href: null, color: "text-red-400" },
              { icon: Linkedin, title: "LinkedIn", content: "Connect with me", href: "https://www.linkedin.com/in/charm-thiekshana-perera/", color: "text-blue-400" }
            ].map((contact, index) => (
              <Card key={contact.title} className="bg-card/50 dark:bg-gray-800/50 backdrop-blur-sm border-0 text-center hover:scale-105 transform transition-all duration-500 hover:shadow-xl animate-fade-in-scale group" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="p-6">
                  <div className="relative mb-4">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <contact.icon className={`w-8 h-8 mx-auto relative z-10 ${contact.color} group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                  <h3 className="font-semibold mb-2 text-primary dark:text-blue-400">{contact.title}</h3>
                  {contact.href ? (
                    <a href={contact.href} target={contact.href.startsWith('http') ? '_blank' : undefined} rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined} className="text-muted-foreground dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 transition-colors text-sm hover:underline">
                      {contact.content}
                    </a>
                  ) : (
                    <p className="text-muted-foreground dark:text-gray-300 text-sm">{contact.content}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Additional Contact CTA */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-4 p-6 bg-gradient-to-r from-blue-500/10 to-purple-600/10 dark:from-blue-400/10 dark:to-purple-400/10 rounded-2xl border border-primary/20 dark:border-blue-400/20 backdrop-blur-sm">
              <div className="text-left">
                <h3 className="text-lg font-semibold text-primary dark:text-blue-400 mb-1">Ready to collaborate?</h3>
                <p className="text-muted-foreground dark:text-gray-300 text-sm">Let's discuss your next project</p>
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shimmer">
                <Mail className="w-4 h-4 mr-2" />
                Start a Conversation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border dark:border-gray-700 bg-background dark:bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground dark:text-gray-300">
            © 2024 Charm Thiekshana Perera. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
