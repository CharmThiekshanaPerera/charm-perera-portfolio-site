import { ArrowDown, Github, Linkedin, Mail, Phone, Instagram, Twitter, Facebook } from "lucide-react";
import { Button } from "./ui/button";
import profileImage from "@/assets/profile.png";
import { useState, useEffect } from "react";

const Hero = () => {
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const roles = [
    "Senior Frontend Developer",
    "Mobile App Developer",
    "iOS & Android Specialist",
    "React Expert",
    "UI/UX Enthusiast"
  ];

  useEffect(() => {
    const handleTyping = () => {
      const currentRole = roles[loopNum % roles.length];
      const updatedText = isDeleting
        ? currentRole.substring(0, typedText.length - 1)
        : currentRole.substring(0, typedText.length + 1);

      setTypedText(updatedText);

      if (!isDeleting && updatedText === currentRole) {
        setTimeout(() => setIsDeleting(true), 2000);
        setTypingSpeed(100);
      } else if (isDeleting && updatedText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(150);
      } else {
        setTypingSpeed(isDeleting ? 50 : 150);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, loopNum, typingSpeed]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20" />
      <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Text Content */}
          <div className="space-y-4 sm:space-y-6 animate-fade-in order-2 lg:order-1">
            <div className="inline-block">
              <span className="text-primary font-semibold text-sm tracking-wider uppercase bg-primary/10 px-4 py-2 rounded-full">
                Welcome to my portfolio
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
              <span className="text-gradient">Best Freelance Web Developer</span>
              <br />
              <span className="text-foreground">in Sri Lanka</span>
            </h1>
            
            <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground font-light min-h-[2rem] sm:min-h-[2.5rem]">
              {typedText}
              <span className="animate-pulse text-primary">|</span>
            </p>
            
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
              I'm <span className="text-primary font-semibold">Charm Thiekshana Perera</span>, a professional <span className="text-primary font-semibold">freelance web developer in Sri Lanka</span> specializing in <span className="text-primary font-semibold">React, iOS & Android</span> development. 
              With 5+ years of experience, I deliver high-quality mobile and web applications with AI integration 
              for businesses worldwide. Based in Colombo, available for remote projects.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                onClick={() => scrollToSection('projects')}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-gold transition-all duration-300 hover:scale-105"
              >
                View My Work
              </Button>
              <Button 
                onClick={() => scrollToSection('contact')}
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105"
              >
                Get In Touch
              </Button>
            </div>

            <div className="flex gap-3 sm:gap-4 pt-4 flex-wrap">
              <a 
                href="https://github.com/CharmThiekshanaPerera" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-[#333]/10 border border-[#333]/20 hover:bg-[#333] hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(51,51,51,0.4)] group"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 text-[#333] group-hover:text-white transition-colors" />
              </a>
              <a 
                href="https://www.linkedin.com/in/charmthiekshana/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-[#0077B5]/10 border border-[#0077B5]/20 hover:bg-[#0077B5] hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(0,119,181,0.4)] group"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-[#0077B5] group-hover:text-white transition-colors" />
              </a>
              <a 
                href="mailto:charmthiekshana97@gmail.com"
                className="p-3 rounded-full bg-accent/10 border border-accent/20 hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-110 hover:shadow-gold group"
                aria-label="Email"
              >
                <Mail className="w-5 h-5 text-accent group-hover:text-accent-foreground transition-colors" />
              </a>
              <a 
                href="tel:+94754465955"
                className="p-3 rounded-full bg-primary/10 border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 hover:shadow-gold group"
                aria-label="Phone"
              >
                <Phone className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
              </a>
              <a 
                href="https://www.instagram.com/c_h_a_r_m_15"
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-gradient-to-br from-[#E1306C]/10 to-[#FD1D1D]/10 border border-[#E1306C]/30 hover:from-[#E1306C] hover:to-[#FD1D1D] hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(225,48,108,0.4)] group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-[#E1306C] group-hover:text-white transition-colors" />
              </a>
              <a 
                href="https://twitter.com/CharmThiekshana"
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-[#1DA1F2]/10 border border-[#1DA1F2]/20 hover:bg-[#1DA1F2] hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(29,161,242,0.4)] group"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-[#1DA1F2] group-hover:text-white transition-colors" />
              </a>
              <a 
                href="https://www.facebook.com/charm.thiekshana"
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-[#1877F2]/10 border border-[#1877F2]/20 hover:bg-[#1877F2] hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(24,119,242,0.4)] group"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-[#1877F2] group-hover:text-white transition-colors" />
              </a>
              <a 
                href="https://wa.me/94754465955"
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366] hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] group"
                aria-label="WhatsApp"
              >
                <svg 
                  className="w-5 h-5" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative animate-fade-in order-1 lg:order-2" style={{ animationDelay: '0.2s' }}>
            <div className="relative w-full max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-3xl blur-2xl opacity-20 animate-glow" />
              <div className="relative rounded-3xl overflow-hidden border-2 border-primary/30 shadow-elegant">
                <img 
                  src={profileImage} 
                  alt="Best freelance web developer in Sri Lanka - Charm Thiekshana Perera, expert in React and mobile app development" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <button 
            onClick={() => scrollToSection('about')}
            className="p-2 rounded-full border border-primary/30 hover:border-primary transition-colors"
          >
            <ArrowDown className="w-6 h-6 text-primary" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
