
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Code, Cloud, Brain, Database, Palette, Zap } from 'lucide-react';

const SkillsSection = () => {
  const skills = {
    "Mobile App Development": {
      icon: Smartphone,
      skills: ["iOS & Android Development", "React Native", "Flutter", "Cross-platform Solutions"]
    },
    "Frontend Development": {
      icon: Code,
      skills: ["React", "Vite", "HTML5", "CSS3", "JavaScript", "TypeScript"]
    },
    "Backend & Cloud": {
      icon: Cloud,
      skills: ["Flask", "Node.js", "API Integration", "AWS (EC2, S3)", "Cloud Platforms"]
    },
    "AI & Machine Learning": {
      icon: Brain,
      skills: ["LLM Integration", "Phi-2 LLM", "ML-powered Development", "AI Applications"]
    },
    "DevOps & Database": {
      icon: Database,
      skills: ["GitHub CI/CD", "MongoDB Atlas", "MySQL", "Database Design"]
    },
    "UI/UX & Quality": {
      icon: Palette,
      skills: ["UI/UX Design", "App Testing", "Version Control", "Quality Assurance"]
    }
  };

  return (
    <section id="skills" className="py-20 px-6 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-3 mb-4">
            <Zap className="w-8 h-8 text-blue-400" />
            <h2 className="text-4xl font-bold text-blue-400">My Expertise</h2>
          </div>
          <p className="text-xl text-slate-300">Technical skills & proficiencies</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, data], index) => (
            <Card 
              key={category} 
              className="group bg-slate-800/50 border-blue-500/20 backdrop-blur-sm hover:scale-105 hover:bg-slate-800/70 transition-all duration-500 animate-bounce-in" 
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mr-4 group-hover:bg-blue-500/30 transition-colors">
                    <data.icon className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-200 group-hover:text-blue-300 transition-colors">
                    {category}
                  </h3>
                </div>
                
                <div className="space-y-2">
                  {data.skills.map((skill, skillIndex) => (
                    <Badge 
                      key={skill}
                      className="bg-blue-500/10 text-blue-300 border-blue-500/30 hover:bg-blue-500/20 transition-all duration-300 transform hover:scale-105 mr-2 mb-2 animate-fade-in-up"
                      style={{ animationDelay: `${(index * 100) + (skillIndex * 50)}ms` }}
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
  );
};

export default SkillsSection;
