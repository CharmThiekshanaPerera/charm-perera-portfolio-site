
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, Calendar, Briefcase } from 'lucide-react';

const ExperienceSection = () => {
  const experiences = [
    {
      role: "Mobile Engineer",
      company: "Phyxle",
      location: "Colombo, Sri Lanka (Remote)",
      dates: "July 2024 - Present",
      type: "Full-time",
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
      type: "Full-time",
      achievements: [
        "Developed the Lifesaylor Affirmation mobile application, significantly impacting the healthcare sector.",
        "Collaborated with UI/UX teams to deliver engaging and functional designs.",
        "Conducted comprehensive testing to ensure functionality, performance, and security.",
        "Supported backend development and API testing for seamless integration and robust architecture."
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 px-6 bg-slate-900/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-3 mb-4">
            <Briefcase className="w-8 h-8 text-blue-400" />
            <h2 className="text-4xl font-bold text-blue-400">Professional Experience</h2>
          </div>
          <p className="text-xl text-slate-300">Building excellence through experience</p>
        </div>
        
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <Card key={index} className="group hover:scale-[1.02] transform transition-all duration-500 bg-slate-800/50 border-blue-500/20 backdrop-blur-sm animate-slide-in-left" style={{ animationDelay: `${index * 200}ms` }}>
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                        <Building2 className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-blue-400 group-hover:text-blue-300 transition-colors">{exp.role}</h3>
                        <p className="text-lg text-slate-300 font-medium">{exp.company}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-slate-400 mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{exp.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{exp.dates}</span>
                      </div>
                      <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30">
                        {exp.type}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-slate-200 mb-3">Key Achievements:</h4>
                  {exp.achievements.map((achievement, i) => (
                    <div key={i} className="flex items-start gap-3 group">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
                      <p className="text-slate-300 leading-relaxed">{achievement}</p>
                    </div>
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

export default ExperienceSection;
