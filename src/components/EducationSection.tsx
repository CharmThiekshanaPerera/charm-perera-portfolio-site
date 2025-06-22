
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award, Book, Calendar } from 'lucide-react';

const EducationSection = () => {
  const courses = ["Software Development", "Databases", "Mobile Application Development", "Web Application Development"];
  
  return (
    <section id="education" className="py-20 px-6 bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-3 mb-4">
            <GraduationCap className="w-8 h-8 text-blue-400" />
            <h2 className="text-4xl font-bold text-blue-400">Education</h2>
          </div>
          <p className="text-xl text-slate-300">Academic foundation & achievements</p>
        </div>
        
        <Card className="max-w-4xl mx-auto bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-blue-500/30 backdrop-blur-sm hover:scale-105 transform transition-all duration-500 animate-bounce-in">
          <CardContent className="p-10">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-500/20 mb-6 animate-glow">
                <Award className="w-10 h-10 text-blue-400" />
              </div>
              
              <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                Bachelor of Science in Information Technology
              </h3>
              <p className="text-xl text-blue-400 font-semibold mb-2">(Honours)</p>
              <p className="text-xl text-slate-200 mb-4">Sri Lanka Institute of Information Technology (SLIIT)</p>
              
              <div className="flex items-center justify-center gap-2 text-slate-300 mb-8">
                <Calendar className="w-5 h-5" />
                <span className="text-lg">May 2018 - October 2022</span>
              </div>
              
              <div className="bg-slate-800/50 rounded-2xl p-6 border border-blue-500/20">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Book className="w-6 h-6 text-blue-400" />
                  <h4 className="text-xl font-semibold text-slate-200">Key Coursework</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {courses.map((course, index) => (
                    <Badge 
                      key={course} 
                      className="bg-blue-500/20 text-blue-300 border-blue-500/40 hover:bg-blue-500/30 transition-all duration-300 transform hover:scale-105 px-4 py-2 text-sm font-medium shadow-lg animate-fade-in-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {course}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="mt-6">
                <Badge className="bg-gradient-to-r from-blue-500/30 to-blue-400/30 text-blue-200 border-blue-400/50 text-lg px-6 py-2 font-semibold animate-pulse-slow">
                  Graduated with Honours
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default EducationSection;
