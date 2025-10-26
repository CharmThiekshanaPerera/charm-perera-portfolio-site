import { Check, Sparkles, Zap, Crown } from "lucide-react";
import { Button } from "./ui/button";

const Packages = () => {
  const packages = [
    {
      name: "Starter",
      icon: Zap,
      price: "$999",
      period: "one-time",
      description: "Perfect for small businesses and startups needing a professional web presence",
      features: [
        "Responsive landing page (up to 5 pages)",
        "Mobile-first design",
        "SEO optimization",
        "Contact form integration",
        "Social media links",
        "Fast loading speed",
        "2 rounds of revisions",
        "1 month support",
        "Source code included"
      ],
      highlighted: false,
      deliveryTime: "7-10 days",
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Professional",
      icon: Sparkles,
      price: "$2,499",
      period: "one-time",
      description: "Ideal for growing businesses requiring custom web applications with advanced features",
      features: [
        "Custom React web application",
        "Up to 15 pages/sections",
        "Advanced UI/UX design",
        "Database integration",
        "Admin dashboard",
        "API integration",
        "Authentication system",
        "Payment gateway setup",
        "3 rounds of revisions",
        "3 months support",
        "Training & documentation",
        "Source code + deployment"
      ],
      highlighted: true,
      deliveryTime: "3-4 weeks",
      color: "from-primary to-amber-400"
    },
    {
      name: "Enterprise",
      icon: Crown,
      price: "$5,999",
      period: "one-time",
      description: "Comprehensive solution for businesses needing mobile apps and complex systems",
      features: [
        "iOS & Android mobile app",
        "Full-featured web platform",
        "React Native development",
        "Custom backend & APIs",
        "Real-time features",
        "AI/ML integration",
        "Advanced analytics dashboard",
        "Multi-user roles & permissions",
        "Cloud deployment (AWS/GCP)",
        "Push notifications",
        "Unlimited revisions",
        "6 months priority support",
        "Maintenance plan included",
        "App Store deployment",
        "Complete documentation"
      ],
      highlighted: false,
      deliveryTime: "6-8 weeks",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const addOns = [
    {
      title: "AI Chatbot Integration",
      price: "$499",
      description: "Smart AI assistant powered by GPT-4"
    },
    {
      title: "E-commerce Setup",
      price: "$799",
      description: "Complete online store with payment processing"
    },
    {
      title: "Monthly Maintenance",
      price: "$299/mo",
      description: "Updates, security patches, and technical support"
    },
    {
      title: "SEO Optimization",
      price: "$399",
      description: "Advanced SEO setup and Google ranking optimization"
    }
  ];

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: "smooth" });
  };

  const handleWhatsAppContact = (packageName: string) => {
    const message = `Hi! I'm interested in the ${packageName} package. Can you provide more details?`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/94754465955?text=${encodedMessage}`, '_blank');
  };

  return (
    <section id="packages" className="py-16 sm:py-20 md:py-28 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 via-background to-secondary/5" />
      <div className="absolute top-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16 animate-fade-in">
            <div className="inline-block mb-4">
              <span className="text-primary font-semibold text-sm tracking-wider uppercase bg-primary/10 px-4 py-2 rounded-full">
                Flexible Pricing
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6">
              Freelance <span className="text-gradient">Packages</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
              Choose the perfect package for your project. All packages include world-class development,
              transparent pricing, and dedicated support. Based in Sri Lanka, delivering global quality.
            </p>
          </div>

          {/* Packages Grid */}
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`relative rounded-3xl border-2 transition-all duration-500 hover:scale-105 animate-fade-in ${
                  pkg.highlighted
                    ? 'border-primary bg-gradient-to-b from-primary/5 to-background shadow-gold'
                    : 'border-border bg-card hover:border-primary/50 hover:shadow-elegant'
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Popular badge */}
                {pkg.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-primary to-amber-400 text-primary-foreground px-6 py-2 rounded-full text-sm font-bold shadow-gold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="p-6 sm:p-8">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pkg.color} flex items-center justify-center mb-6 shadow-lg`}>
                    <pkg.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Package name */}
                  <h3 className="text-2xl sm:text-3xl font-bold mb-2">{pkg.name}</h3>
                  
                  {/* Price */}
                  <div className="mb-4">
                    <span className="text-4xl sm:text-5xl font-bold text-gradient">{pkg.price}</span>
                    <span className="text-muted-foreground ml-2">{pkg.period}</span>
                  </div>

                  {/* Delivery time */}
                  <div className="inline-block mb-6">
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                      ⚡ {pkg.deliveryTime}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    {pkg.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-sm text-foreground/90">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    <Button
                      onClick={() => handleWhatsAppContact(pkg.name)}
                      className={`w-full ${
                        pkg.highlighted
                          ? 'bg-gradient-to-r from-primary to-amber-400 hover:shadow-gold'
                          : 'bg-primary hover:bg-primary/90'
                      } text-primary-foreground shadow-lg transition-all duration-300 hover:scale-105`}
                      size="lg"
                    >
                      Get Started
                    </Button>
                    <Button
                      onClick={scrollToContact}
                      variant="outline"
                      className="w-full border-primary text-primary hover:bg-primary/10"
                      size="lg"
                    >
                      Contact for Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add-ons Section */}
          <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="text-center mb-10">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                Premium <span className="text-gradient">Add-ons</span>
              </h3>
              <p className="text-muted-foreground">
                Enhance your package with these additional services
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {addOns.map((addon, index) => (
                <div
                  key={index}
                  className="p-6 bg-card border border-border rounded-2xl hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-gold"
                >
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-gradient">{addon.price}</span>
                  </div>
                  <h4 className="font-bold mb-2">{addon.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {addon.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 sm:mt-20 text-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <div className="p-8 sm:p-12 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 border border-primary/30 rounded-3xl">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                Need a Custom Package?
              </h3>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Every project is unique. Let's discuss your specific requirements and create
                a tailored solution that fits your budget and timeline perfectly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => handleWhatsAppContact('Custom')}
                  size="lg"
                  className="bg-gradient-to-r from-primary to-amber-400 hover:shadow-gold text-primary-foreground"
                >
                  WhatsApp Me
                </Button>
                <Button
                  onClick={scrollToContact}
                  variant="outline"
                  size="lg"
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  Schedule a Call
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Packages;