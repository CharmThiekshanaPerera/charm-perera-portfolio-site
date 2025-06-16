
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Award, Target, Heart, Code2 } from 'lucide-react';

interface AboutSectionProps {
  aboutTheme: number;
  aboutThemes: string[];
}

const AboutSection: React.FC<AboutSectionProps> = ({ aboutTheme, aboutThemes }) => {
  const achievements = [
    "2+ Years Mobile Development",
    "15+ Successful Projects",
    "Healthcare App Impact",
    "AI Integration Expert"
  ];

  const values = [
    { icon: Code2, title: "Innovation", description: "Constantly exploring new technologies and methodologies" },
    { icon: Target, title: "Quality", description: "Delivering high-performance, user-centric applications" },
    { icon: Heart, title: "Passion", description: "Genuinely love creating solutions that make a difference" }
  ];

  const personalInfo = [
    { icon: MapPin, label: "Location", value: "Kalalpitiya, Pasyala, Sri Lanka" },
    { icon: Calendar, label: "Experience", value: "2+ Years in Mobile Development" },
    { icon: Award, label: "Education", value: "BSc IT (Honours) - SLIIT" }
  ];

  return (
    <section id="about" className={`min-h-screen py-20 px-6 relative transition-all duration-1000 ${aboutThemes[aboutTheme]} flex items-center`}>
      <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>
      <div className="max-w-6xl mx-auto relative z-10 w-full">
        <div className="text-center mb-16 animate-fade-in-scale">
          <h2 className="text-5xl font-bold mb-6 text-white">About Me</h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Passionate Mobile Engineer dedicated to creating innovative solutions that combine cutting-edge technology with exceptional user experience
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div className="space-y-8 animate-fade-in-scale">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white mb-4">My Journey</h3>
              <p className="text-lg leading-relaxed text-white/90">
                I'm a dedicated Mobile Engineer with over 2 years of experience in developing high-performance applications. 
                My passion lies in creating user-centric solutions that combine cutting-edge technology with exceptional user experience.
              </p>
              <p className="text-lg leading-relaxed text-white/90">
                Currently working at Phyxle, I specialize in mobile app development, AI integration, and cloud technologies. 
                I have successfully delivered applications that have made significant impacts in healthcare and productivity sectors.
              </p>
              <p className="text-lg leading-relaxed text-white/90">
                My expertise spans across React Native, AI integration with LLMs, cloud platforms, and full-stack development. 
                I believe in continuous learning and staying updated with the latest technological advancements.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="text-lg font-bold text-white">{achievement.split(' ')[0]}</div>
                  <div className="text-sm text-white/70">{achievement.split(' ').slice(1).join(' ')}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-in-scale delay-300">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl mb-8">
              <img 
                src="/lovable-uploads/e2880e33-3dfc-496b-b77d-fad52bbb2e34.png"
                alt="Charm Thiekshana Perera - Mobile Engineer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {personalInfo.map((info, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 animate-fade-in-scale" style={{ animationDelay: `${index * 100}ms` }}>
              <CardContent className="p-6 text-center">
                <info.icon className="w-8 h-8 text-white mx-auto mb-3" />
                <h4 className="text-lg font-semibold text-white mb-2">{info.label}</h4>
                <p className="text-white/80 text-sm">{info.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Values & Philosophy */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white text-center mb-12">My Values & Philosophy</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 text-center animate-fade-in-scale" style={{ animationDelay: `${index * 150}ms` }}>
                <CardContent className="p-8">
                  <value.icon className="w-12 h-12 text-white mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-white mb-3">{value.title}</h4>
                  <p className="text-white/80">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Skills Overview */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-white mb-8">Technical Expertise</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "React Native", "AI Integration", "Flask", "Node.js", "AWS", "MongoDB", 
              "JavaScript", "TypeScript", "Mobile Development", "Cloud Platforms",
              "UI/UX Collaboration", "Git", "API Development"
            ].map((skill, index) => (
              <Badge 
                key={skill} 
                variant="secondary" 
                className="bg-white/20 text-white border border-white/30 hover:bg-white/30 transition-all duration-300 transform hover:scale-105 px-4 py-2 text-sm animate-fade-in-scale"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
