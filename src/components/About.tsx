import { Code2, Smartphone, Brain, Zap } from "lucide-react";

const About = () => {
  const highlights = [
    {
      icon: Smartphone,
      title: "Mobile App Development",
      description: "Professional iOS & Android development services with React Native expertise and multiple apps on Google Play Store"
    },
    {
      icon: Code2,
      title: "React & Web Development",
      description: "Expert React developer specializing in modern web applications, Vite, TypeScript, and responsive design"
    },
    {
      icon: Brain,
      title: "AI Integration",
      description: "Experienced in developing AI-powered applications and intelligent solutions"
    },
    {
      icon: Zap,
      title: "Performance First",
      description: "Focused on creating high-performance, scalable applications"
    }
  ];

  return (
    <section id="about" className="py-12 sm:py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Why Choose a <span className="text-gradient">Freelance Developer in Sri Lanka?</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              Professional web and mobile development services with global standards at competitive rates
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
            <div className="space-y-4 sm:space-y-6 animate-fade-in">
              <p className="text-base sm:text-lg leading-relaxed text-foreground/90">
                As the <span className="text-primary font-semibold">best freelance web developer in Sri Lanka</span>, I bring 5+ years of professional experience in creating exceptional digital solutions. Currently serving as a Senior Frontend Developer at Phyxle, I specialize in <span className="text-primary font-semibold">React development, mobile apps, and AI integration</span>.
              </p>
              
              <p className="text-base sm:text-lg leading-relaxed text-foreground/90">
                With a <span className="text-primary font-semibold">Bachelor of Science in Information Technology (Honours)</span> from 
                SLIIT, I combine academic excellence with real-world expertise. As a <span className="text-primary font-semibold">freelance developer in Sri Lanka</span>, I offer cost-effective solutions without compromising on quality, making professional web development accessible to businesses of all sizes.
              </p>

              <p className="text-base sm:text-lg leading-relaxed text-foreground/90">
                My services include designing and developing high-performance <span className="text-primary font-semibold">iOS and Android applications</span>, custom web solutions using React and modern technologies, UI/UX collaboration, and comprehensive API integration. Whether you need a mobile app, responsive website, or AI-powered solution, I deliver results that exceed expectations.
              </p>

              <div className="pt-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <p className="text-foreground/80">Based in Colombo, Sri Lanka</p>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <p className="text-foreground/80">Open to remote opportunities</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <p className="text-foreground/80">Available for freelance projects</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {highlights.map((item, index) => (
                <div 
                  key={index}
                  className="p-5 sm:p-6 bg-card rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-gold"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-base sm:text-lg mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
