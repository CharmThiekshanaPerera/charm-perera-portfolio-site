import { Github, Mail, Phone, Heart, Linkedin, Instagram, Twitter, Facebook } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const links = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Experience", id: "experience" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Packages", id: "packages" },
    { label: "Blog", id: "blog" },
    { label: "Testimonials", id: "testimonials" },
    { label: "Contact", id: "contact" }
  ];

  return (
    <footer className="relative overflow-hidden border-t border-border bg-gradient-to-b from-background to-secondary/10">
      {/* Premium gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      
      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand & Description */}
          <div className="space-y-4 md:col-span-2">
            <h3 className="text-2xl font-bold text-gradient">Charm Thiekshana Perera</h3>
            <p className="text-muted-foreground leading-relaxed">
              Best freelance web developer in Sri Lanka with 5+ years of experience specializing in mobile and web applications. 
              Passionate about creating beautiful, user-centric digital experiences with cutting-edge technology.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:charmthiekshana97@gmail.com" className="hover:text-primary transition-colors">
                  charmthiekshana97@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <a href="tel:+94754465955" className="hover:text-primary transition-colors">
                  +94 754 465 955
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2">
              {links.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect With Me */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Connect With Me</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Follow me on social media for updates, tech insights, and behind-the-scenes content.
            </p>
            <div className="flex flex-wrap gap-3">
              <a 
                href="https://github.com/CharmThiekshanaPerera"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-primary/10 border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 hover:shadow-gold"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/charmthiekshana/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-primary/10 border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 hover:shadow-gold"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="mailto:charmthiekshana97@gmail.com"
                className="p-3 rounded-full bg-primary/10 border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 hover:shadow-gold"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a 
                href="tel:+94754465955"
                className="p-3 rounded-full bg-primary/10 border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 hover:shadow-gold"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/c_h_a_r_m_15"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-primary/10 border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 hover:shadow-gold"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com/CharmThiekshana"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-primary/10 border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 hover:shadow-gold"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://www.facebook.com/charm.thiekshana"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-primary/10 border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 hover:shadow-gold"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://wa.me/94754465955"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366] hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(37,211,102,0.4)]"
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
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              © {currentYear} Charm Thiekshana Perera. All rights reserved.
            </p>
            <p className="flex items-center gap-2">
              Made using React, TypeScript & Vite
            </p>
            <p className="text-xs bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
              🚀 Available for freelance opportunities
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
