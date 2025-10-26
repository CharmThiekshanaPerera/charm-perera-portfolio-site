import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useForm, ValidationError } from '@formspree/react';

const Contact = () => {
  const [state, handleSubmit] = useForm("xwpwkgqb");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  // Handle Formspree submission
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Create FormData object for Formspree
    const formDataForSubmission = new FormData();
    formDataForSubmission.append('name', formData.name);
    formDataForSubmission.append('email', formData.email);
    formDataForSubmission.append('message', formData.message);
    
    // Submit to Formspree
    handleSubmit(e);
  };

  // Update local form data
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.message.trim()) {
      toast.error("Please fill in your name and message");
      return;
    }

    const phoneNumber = "94754465955";
    const message = `Hi, I'm ${formData.name.trim()}.\n\n${formData.message.trim()}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    toast.success("Opening WhatsApp...");
    setFormData({ name: "", email: "", message: "" });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "charmthiekshana97@gmail.com",
      link: "mailto:charmthiekshana97@gmail.com"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+94 754 465 955",
      link: "tel:+94754465955"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Colombo, Sri Lanka",
      link: null
    }
  ];

  // Show success message when form is successfully submitted
  if (state.succeeded) {
    return (
      <section id="contact" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 animate-fade-in">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                Hire the <span className="text-gradient">Best Freelance Developer</span>
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg">
                Ready to start your web or mobile app project? Contact Sri Lanka's top freelance web developer today
              </p>
            </div>

            <div className="bg-card rounded-2xl border border-border p-12 text-center animate-fade-in">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Send className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Message Sent Successfully!</h3>
              <p className="text-muted-foreground mb-6">
                Thanks for reaching out! I've received your message and will get back to you soon.
              </p>
              <Button 
                onClick={() => {
                  setFormData({ name: "", email: "", message: "" });
                  // Reset Formspree state by reloading the component
                  window.location.hash = 'contact';
                }}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Send Another Message
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Hire the <span className="text-gradient">Best Freelance Developer</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Ready to start your web or mobile app project? Contact Sri Lanka's top freelance web developer today
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-2 space-y-8 animate-fade-in">
              <div>
                <h3 className="text-2xl font-bold mb-6">Contact Sri Lanka's Best Developer</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Looking for a reliable <span className="text-primary font-semibold">freelance web developer in Sri Lanka</span>? 
                  I'm available for web development, mobile app projects, and AI integration services. 
                  Based in Colombo, serving clients locally and internationally.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                      {item.link ? (
                        <a 
                          href={item.link}
                          className="text-foreground font-medium hover:text-primary transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-foreground font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="bg-card rounded-2xl border border-border p-8 hover:border-primary/50 transition-all duration-300">
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        disabled={state.submitting}
                        className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:opacity-50"
                        placeholder="John Doe"
                      />
                      <ValidationError 
                        prefix="Name" 
                        field="name"
                        errors={state.errors}
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        disabled={state.submitting}
                        className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:opacity-50"
                        placeholder="john@example.com"
                      />
                      <ValidationError 
                        prefix="Email" 
                        field="email"
                        errors={state.errors}
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        disabled={state.submitting}
                        rows={6}
                        className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none disabled:opacity-50"
                        placeholder="Tell me about your project..."
                      />
                      <ValidationError 
                        prefix="Message" 
                        field="message"
                        errors={state.errors}
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <Button 
                        type="submit"
                        size="lg"
                        disabled={state.submitting}
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-gold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                      >
                        <Send className="w-5 h-5 mr-2" />
                        {state.submitting ? "Sending..." : "Send Email"}
                      </Button>
                      
                      <Button 
                        type="button"
                        onClick={handleWhatsAppSubmit}
                        size="lg"
                        variant="outline"
                        disabled={state.submitting}
                        className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                      >
                        <MessageCircle className="w-5 h-5 mr-2" />
                        WhatsApp Me
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;