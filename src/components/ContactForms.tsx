
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Mail, Send, User, Phone } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const ContactForms = () => {
  const [emailForm, setEmailForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [whatsappForm, setWhatsappForm] = useState({
    name: '',
    message: ''
  });

  const { toast } = useToast();

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, subject, message } = emailForm;
    
    const mailtoLink = `mailto:charmthiekshana97@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;
    
    window.location.href = mailtoLink;
    
    toast({
      title: "Email client opened",
      description: "Your default email client should open with the pre-filled message.",
    });
    
    setEmailForm({ name: '', email: '', subject: '', message: '' });
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, message } = whatsappForm;
    
    const whatsappMessage = `Hello Charm! My name is ${name}. ${message}`;
    const whatsappLink = `https://wa.me/94729755955?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappLink, '_blank');
    
    toast({
      title: "WhatsApp opened",
      description: "WhatsApp should open with your pre-filled message.",
    });
    
    setWhatsappForm({ name: '', message: '' });
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {/* Email Contact Form */}
      <Card className="bg-card/50 dark:bg-gray-800/50 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 animate-fade-in-scale">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl text-primary dark:text-blue-400">Send Email</CardTitle>
          <p className="text-muted-foreground dark:text-gray-300">Get in touch via email</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Input
                  placeholder="Your Name"
                  value={emailForm.name}
                  onChange={(e) => setEmailForm({...emailForm, name: e.target.value})}
                  required
                  className="bg-background dark:bg-gray-700"
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={emailForm.email}
                  onChange={(e) => setEmailForm({...emailForm, email: e.target.value})}
                  required
                  className="bg-background dark:bg-gray-700"
                />
              </div>
            </div>
            <Input
              placeholder="Subject"
              value={emailForm.subject}
              onChange={(e) => setEmailForm({...emailForm, subject: e.target.value})}
              required
              className="bg-background dark:bg-gray-700"
            />
            <Textarea
              placeholder="Your message..."
              value={emailForm.message}
              onChange={(e) => setEmailForm({...emailForm, message: e.target.value})}
              required
              rows={4}
              className="bg-background dark:bg-gray-700"
            />
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Email
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* WhatsApp Contact Form */}
      <Card className="bg-card/50 dark:bg-gray-800/50 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 animate-fade-in-scale delay-200">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl text-green-600 dark:text-green-400">WhatsApp</CardTitle>
          <p className="text-muted-foreground dark:text-gray-300">Quick message via WhatsApp</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
            <Input
              placeholder="Your Name"
              value={whatsappForm.name}
              onChange={(e) => setWhatsappForm({...whatsappForm, name: e.target.value})}
              required
              className="bg-background dark:bg-gray-700"
            />
            <Textarea
              placeholder="Your message..."
              value={whatsappForm.message}
              onChange={(e) => setWhatsappForm({...whatsappForm, message: e.target.value})}
              required
              rows={6}
              className="bg-background dark:bg-gray-700"
            />
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Send WhatsApp Message
            </Button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground dark:text-gray-400">
              <Phone className="w-4 h-4 inline mr-1" />
              +94 72 975 5955
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactForms;
