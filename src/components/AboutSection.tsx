import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, Award, Code2, Rocket, Heart } from 'lucide-react';

interface AboutSectionProps {
  aboutTheme: number;
  aboutThemes: string[];
}

const AboutSection: React.FC<AboutSectionProps> = ({ aboutTheme, aboutThemes }) => {
  const achievements = [
    { number: "2+", label: "Years Experience", icon: Calendar },
    { number: "15+", label: "Projects Completed", icon: Rocket },
    { number: "100%", label: "Client Satisfaction", icon: Heart },
    { number: "24/7", label: "Support Available", icon: Code2 }
  ];

  const personalInfo = [
    { icon: MapPin, label: "Location", value: "Kalalpitiya, Pasyala, Sri Lanka" },
    { icon: Calendar, label: "Experience", value: "2+ Years in Mobile Development" },
    { icon: Award, label: "Education", value: "BSc IT (Honours) - SLIIT" }
  ];

  return (
    <section
      id="about"
      className="min-h-screen py-24 px-6 relative bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 flex items-center"
      aria-label="About Me Section"
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 w-full">
        {/* Header */}
        <header className="text-center mb-20 animate-fade-in-up">
          <h1 className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            About Me
          </h1>
          <p className="text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Mobile Engineer | Full Stack Developer | AI Engineer — crafting innovative digital solutions that drive impact.
          </p>
        </header>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Story */}
          <article className="space-y-8 animate-slide-in-left">
            <div className="glass-card rounded-3xl p-8 shadow-xl hover:scale-105 transition-transform duration-500 backdrop-blur-sm border border-purple-500/30">
              <h2 className="text-4xl font-bold text-purple-400 mb-6">My Journey</h2>
              <div className="space-y-6 text-lg leading-relaxed text-white/90">
                <p>
                  I'm a dedicated Mobile Engineer with over 2 years of experience in building high-performance apps blending innovation with delightful user experiences.
                </p>
                <p>
                  At <strong className="text-pink-400">Phyxle</strong>, I specialize in mobile app development, AI-driven solutions, and cloud technologies. I have contributed significantly to healthcare, productivity, and AI sectors.
                </p>
                <p>
                  My expertise includes React Native, AI (LLMs, GPT, etc.), Node.js, cloud platforms (AWS, Vercel), and full-stack development. I am passionate about pushing boundaries, exploring new tech, and delivering excellence.
                </p>
              </div>
            </div>
          </article>

          {/* Profile Image */}
          <div className="relative animate-slide-in-right">
            <div className="relative group">
              <div className="absolute -inset-8 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-3xl blur-2xl opacity-30 group-hover:opacity-60 transition-all duration-500 animate-glow"></div>
              <div className="relative w-full max-w-md mx-auto aspect-square rounded-3xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-transform duration-500 neon-border">
                <img 
                  src="/lovable-uploads/e2880e33-3dfc-496b-b77d-fad52bbb2e34.png"
                  alt="Charm Thiekshana Perera - Mobile Engineer, AI Developer, Full Stack Developer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <section aria-label="Achievements" className="grid md:grid-cols-4 gap-8 mb-20">
          {achievements.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card
                key={index}
                className="glass-card hover:scale-110 transition-transform duration-500 text-center animate-bounce-in group cursor-pointer"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-8">
                  <Icon className="w-12 h-12 text-purple-400 mx-auto mb-4 group-hover:text-pink-400 transition-colors" />
                  <div className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                    {item.number}
                  </div>
                  <p className="text-white/80 font-medium">{item.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </section>

        {/* Personal Info */}
        <section aria-label="Personal Information" className="grid md:grid-cols-3 gap-8">
          {personalInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <Card
                key={index}
                className="glass-card hover:scale-105 transition-transform duration-500 animate-fade-in-up group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8 text-center">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Icon className="w-12 h-12 text-purple-400 mx-auto relative z-10 group-hover:scale-125 transition-transform" />
                  </div>
                  <h4 className="text-2xl font-semibold text-white mb-3 group-hover:text-purple-400 transition-colors">
                    {info.label}
                  </h4>
                  <p className="text-white/80 text-lg">{info.value}</p>
                </CardContent>
              </Card>
            );
          })}
        </section>
      </div>
    </section>
  );
};

export default AboutSection;
