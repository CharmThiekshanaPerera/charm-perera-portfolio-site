import { Briefcase, Calendar } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      role: "Senior Frontend Developer",
      company: "Phyxle",
      location: "Colombo, Sri Lanka (Remote)",
      period: "July 2024 – Present",
      responsibilities: [
        "Design and develop high-performance mobile and web applications with a focus on user-centric UX/UI functionality",
        "Collaborate with design teams to craft intuitive, visually appealing, and seamless user experiences",
        "Conduct thorough testing to ensure quality assurance for secure, reliable, and high-performing applications",
        "Work with backend and web hosting teams for smooth API integration and robust software architecture"
      ]
    },
    {
      role: "Mobile Application Developer",
      company: "Space IT Labs",
      location: "Nottingham, England, United Kingdom (Remote)",
      period: "November 2022 – June 2024",
      responsibilities: [
        "Developed the Lifesaylor Affirmation mobile application, significantly impacting the healthcare sector",
        "Collaborated with UI/UX teams to deliver engaging and functional designs",
        "Conducted comprehensive testing to ensure functionality, performance, and security",
        "Supported backend development and API testing for seamless integration and robust architecture"
      ]
    },
    {
      role: "Founder & Lead Developer",
      company: "Nesture Labs (Own Startup)",
      location: "Colombo, Sri Lanka",
      period: "January 2022 – Present",
      responsibilities: [
        "Founded and built an IT solutions company specializing in web, mobile, and AI development services",
        "Led end-to-end project delivery for diverse clients across healthcare, e-commerce, and corporate sectors",
        "Managed full-stack development using modern technologies including React, Node.js, and cloud services",
        "Built strategic partnerships and grew the company from concept to a profitable service provider"
      ]
    }
  ];

  return (
    <section id="experience" className="py-12 sm:py-16 md:py-24 relative overflow-hidden bg-secondary/5">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Professional <span className="text-gradient">Experience</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Building exceptional digital products with leading tech companies
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent hidden md:block" />

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div 
                  key={index}
                  className="relative animate-fade-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 w-px h-full bg-primary/20 hidden md:block" />
                  <div className="absolute left-6 top-8 w-5 h-5 bg-primary rounded-full border-4 border-background hidden md:block animate-glow" />

                  <div className="md:ml-20 bg-card rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-gold p-6 sm:p-8">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gradient">{exp.role}</h3>
                        <div className="flex items-center gap-2 text-lg text-foreground mb-1">
                          <Briefcase className="w-5 h-5 text-primary" />
                          <span className="font-semibold">{exp.company}</span>
                        </div>
                        <p className="text-muted-foreground">{exp.location}</p>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground bg-primary/10 px-4 py-2 rounded-full whitespace-nowrap">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-medium">{exp.period}</span>
                      </div>
                    </div>

                    <ul className="space-y-3">
                      {exp.responsibilities.map((responsibility, idx) => (
                        <li key={idx} className="flex gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <p className="text-foreground/80 leading-relaxed">{responsibility}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
