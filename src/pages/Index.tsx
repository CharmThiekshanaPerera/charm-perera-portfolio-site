
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Linkedin, Github, ExternalLink, MapPin, Calendar, Building2 } from "lucide-react";

const Index = () => {
  const [activeSection, setActiveSection] = useState("about");

  const skills = {
    "Mobile App Development": ["iOS & Android Development", "React Native"],
    "Frontend Development": ["React", "Vite", "HTML", "CSS", "JavaScript"],
    "Backend & Cloud": ["Flask", "Node.js", "API Integration", "AWS (EC2, S3)", "Cloud Platforms"],
    "AI & Machine Learning": ["LLM Integration (Phi-2 LLM)", "ML-powered App Development"],
    "DevOps & Database": ["GitHub CI/CD Pipelines", "Database Management (MongoDB Atlas, MySQL)"],
    "UI/UX & Quality Assurance": ["UI/UX Collaboration", "App Testing & Maintenance", "Version Control (Git)"]
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
      image: "https://placehold.co/400x250/E0F2F7/2C5282?text=AI+To-Do+Agent",
      demoLink: null,
      githubLink: null
    },
    {
      title: "House Price Prediction App",
      description: "ML-powered application predicting house prices based on user input, with a Flask API backend and React Native frontend.",
      technologies: ["Flask API", "React Native", "Machine Learning"],
      image: "https://placehold.co/400x250/E0F2F7/2C5282?text=House+Price+App",
      demoLink: null,
      githubLink: null
    },
    {
      title: "Perera's Paws",
      description: "Responsive frontend and admin panel built with Vite and Node.js. Hosted on AWS EC2 with asset management via S3 and MongoDB Atlas backend.",
      technologies: ["Vite", "Node.js", "AWS EC2", "AWS S3", "MongoDB Atlas"],
      image: "https://placehold.co/400x250/E0F2F7/2C5282?text=Perera's+Paws",
      demoLink: null,
      githubLink: null
    },
    {
      title: "Lifesaylor: Daily Motivation App",
      description: "Motivational app available on Google Play Store, featuring daily quotes and personalized content. Focused on user-friendly design, robust backend integration, and thorough testing.",
      technologies: ["Android", "Backend Integration"],
      image: "https://placehold.co/400x250/E0F2F7/2C5282?text=Lifesaylor+Daily",
      demoLink: "https://play.google.com/store/apps/details?id=com.lifesaylor",
      githubLink: null
    },
    {
      title: "Lifesaylor: Affirmation App",
      description: "App promoting mental well-being through daily affirmations and mindfulness practices. Collaborated with UI/UX teams for user-friendly design and supported a successful launch.",
      technologies: ["Mobile Development", "UI/UX Collaboration"],
      image: "https://placehold.co/400x250/E0F2F7/2C5282?text=Lifesaylor+Affirm",
      demoLink: "https://play.google.com/store/apps/details?id=com.lifesaylor.affirmation",
      githubLink: null
    },
    {
      title: "WordPress Web Projects",
      description: "Developed and maintained multiple dynamic websites using WordPress, PHP, and MySQL for various clients.",
      technologies: ["WordPress", "PHP", "MySQL"],
      image: "https://placehold.co/400x250/E0F2F7/2C5282?text=Web+Projects",
      websites: [
        { name: "Velys.com.au", url: "https://velys.com.au" },
        { name: "OkiGlobalEdu.com", url: "https://okiglobaledu.com" },
        { name: "EConsulate.net", url: "https://econsulate.net" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Charm Thiekshana
            </div>
            <div className="hidden md:flex space-x-8">
              {["About", "Skills", "Experience", "Projects", "Education", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveSection(item.toLowerCase())}
                  className="text-slate-600 hover:text-blue-600 transition-colors duration-200 font-medium"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="mb-6">
                <h1 className="text-5xl lg:text-6xl font-bold text-slate-800 mb-4">
                  Charm Thiekshana
                  <span className="block text-3xl lg:text-4xl text-blue-600 mt-2">Perera</span>
                </h1>
                <p className="text-xl text-slate-600 mb-4">Software Engineer | Web & Mobile App Development</p>
                <p className="text-lg text-slate-500 leading-relaxed max-w-2xl">
                  Dedicated Mobile Engineer crafting user-centric, high-performance applications with expertise in AI, web, and cloud technologies.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  <Mail className="w-5 h-5 mr-2" />
                  Get In Touch
                </Button>
                <Button variant="outline" size="lg" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  View Projects
                </Button>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-80 h-80 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-100 to-indigo-200">
                  <img 
                    src="/lovable-uploads/e2880e33-3dfc-496b-b77d-fad52bbb2e34.png" 
                    alt="Charm Thiekshana Perera"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">My Expertise</h2>
            <p className="text-xl text-slate-600">Technical proficiencies across the development stack</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, skillList]) => (
              <Card key={category} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-blue-600 transition-colors">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill) => (
                      <Badge 
                        key={skill} 
                        variant="secondary" 
                        className="bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
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
      <section className="py-20 px-6 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Professional Experience</h2>
            <p className="text-xl text-slate-600">My journey in software development</p>
          </div>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <Card key={index} className="shadow-xl border-0 overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-800 mb-2">{exp.role}</h3>
                      <div className="flex items-center gap-4 text-slate-600 mb-2">
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
                    <div className="flex items-center text-blue-600 font-medium">
                      <Calendar className="w-4 h-4 mr-2" />
                      {exp.dates}
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-slate-700 leading-relaxed">{achievement}</span>
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
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">My Projects</h2>
            <p className="text-xl text-slate-600">Showcasing practical application of skills</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.demoLink && (
                      <Button size="sm" asChild className="bg-blue-600 hover:bg-blue-700">
                        <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                    {project.githubLink && (
                      <Button size="sm" variant="outline" asChild>
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          GitHub
                        </a>
                      </Button>
                    )}
                    {project.websites && (
                      <div className="flex flex-wrap gap-2 w-full mt-2">
                        {project.websites.map((website) => (
                          <Button key={website.name} size="sm" variant="outline" asChild className="text-xs">
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
      <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Education</h2>
            <p className="text-xl text-slate-600">Academic foundation</p>
          </div>
          <Card className="shadow-xl border-0 overflow-hidden max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-slate-800 mb-2">
                  Bachelor of Science in Information Technology (Honours)
                </h3>
                <p className="text-xl text-blue-600 mb-4">Sri Lanka Institute of Information Technology (SLIIT)</p>
                <p className="text-slate-600 mb-6">May 2018 - October 2022 • Graduated with honours</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {["Software Development", "Databases", "Mobile Application Development", "Web Application Development"].map((course) => (
                    <Badge key={course} variant="secondary" className="bg-blue-50 text-blue-700">
                      {course}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Get In Touch</h2>
            <p className="text-xl text-slate-300">Let's collaborate on your next project</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-slate-800 border-slate-700 text-center">
              <CardContent className="p-6">
                <Mail className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">Email</h3>
                <a href="mailto:charmthiekshana97@gmail.com" className="text-slate-300 hover:text-blue-400 transition-colors text-sm">
                  charmthiekshana97@gmail.com
                </a>
              </CardContent>
            </Card>
            <Card className="bg-slate-800 border-slate-700 text-center">
              <CardContent className="p-6">
                <Phone className="w-8 h-8 text-green-400 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">Phone</h3>
                <a href="tel:+94754465955" className="text-slate-300 hover:text-green-400 transition-colors text-sm">
                  +94 754 465 955
                </a>
              </CardContent>
            </Card>
            <Card className="bg-slate-800 border-slate-700 text-center">
              <CardContent className="p-6">
                <MapPin className="w-8 h-8 text-red-400 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">Location</h3>
                <p className="text-slate-300 text-sm">Kalalpitiya, Pasyala, Sri Lanka</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800 border-slate-700 text-center">
              <CardContent className="p-6">
                <Linkedin className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">LinkedIn</h3>
                <a 
                  href="https://www.linkedin.com/in/charm-thiekshana-perera/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-blue-400 transition-colors text-sm"
                >
                  Connect with me
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-slate-950 border-t border-slate-800">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-400">
            © 2024 Charm Thiekshana Perera. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
