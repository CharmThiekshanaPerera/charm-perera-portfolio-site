import { Code2, Smartphone, Database, Cloud, GitBranch, Palette } from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      icon: Smartphone,
      title: "Mobile App Development",
      skills: ["iOS App Development", "Android App Development", "React Native Expert", "Flutter Development"]
    },
    {
      icon: Code2,
      title: "React & Frontend Development",
      skills: ["React Expert", "Vite", "TypeScript", "Modern JavaScript", "Responsive Design", "Tailwind CSS"]
    },
    {
      icon: Database,
      title: "Backend & Database",
      skills: ["Python", "Node.js", "API Integration", "Database Management", "SQL"]
    },
    {
      icon: Cloud,
      title: "Cloud & DevOps",
      skills: ["CI/CD", "Cloud Platforms", "Web Hosting", "Version Control"]
    },
    {
      icon: GitBranch,
      title: "Development Practices",
      skills: ["Agile", "Scrum", "OOP", "Testing", "Code Review"]
    },
    {
      icon: Palette,
      title: "Design & UX",
      skills: ["UI/UX Collaboration", "Responsive Design", "User Experience", "Prototyping"]
    }
  ];

  const technologies = [
    "React", "TypeScript", "Python", "Android", "iOS", "Vite", 
    "Node.js", "API Integration", "CI/CD", "Agile", "Scrum", 
    "Database Management", "Cloud Platforms", "AI Development"
  ];

  return (
    <section id="skills" className="py-12 sm:py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/5" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Professional <span className="text-gradient">Web Development Services</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Comprehensive React, mobile, and AI development expertise for Sri Lankan and international clients
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
            {skillCategories.map((category, index) => (
              <div 
                key={index}
                className="p-5 sm:p-6 bg-card rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-gold animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <category.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-4">{category.title}</h3>
                <ul className="space-y-2">
                  {category.skills.map((skill, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-foreground/80">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-center">Technologies & Tools</h3>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {technologies.map((tech, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 sm:px-5 sm:py-2.5 bg-card border border-border rounded-full text-xs sm:text-sm font-medium hover:border-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
