
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Mail, Phone } from 'lucide-react';

const ContactForms: React.FC = () => {
  const [whatsappData, setWhatsappData] = useState({
    name: '',
    message: ''
  });

  const [emailData, setEmailData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hi Charm! My name is ${whatsappData.name}. ${whatsappData.message}`;
    const whatsappUrl = `https://wa.me/94754465955?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(emailData.subject);
    const body = encodeURIComponent(`Hi Charm,\n\nMy name is ${emailData.name}.\n\n${emailData.message}\n\nBest regards,\n${emailData.name}\nEmail: ${emailData.email}`);
    const mailtoUrl = `mailto:charmthiekshana97@gmail.com?subject=${subject}&body=${body}`;
    window.open(mailtoUrl);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {/* WhatsApp Contact Form */}
      <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 gradient-text">
            <MessageSquare className="w-5 h-5 text-green-500" />
            WhatsApp Contact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
            <Input
              placeholder="Your Name"
              value={whatsappData.name}
              onChange={(e) => setWhatsappData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
            <Textarea
              placeholder="Your message..."
              value={whatsappData.message}
              onChange={(e) => setWhatsappData(prev => ({ ...prev, message: e.target.value }))}
              rows={4}
              required
            />
            <Button 
              type="submit" 
              className="w-full bg-green-500 hover:bg-green-600 text-white"
            >
              <Phone className="w-4 h-4 mr-2" />
              Send WhatsApp Message
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Email Contact Form */}
      <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 gradient-text">
            <Mail className="w-5 h-5 text-blue-500" />
            Email Contact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <Input
              placeholder="Your Name"
              value={emailData.name}
              onChange={(e) => setEmailData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
            <Input
              type="email"
              placeholder="Your Email"
              value={emailData.email}
              onChange={(e) => setEmailData(prev => ({ ...prev, email: e.target.value }))}
              required
            />
            <Input
              placeholder="Subject"
              value={emailData.subject}
              onChange={(e) => setEmailData(prev => ({ ...prev, subject: e.target.value }))}
              required
            />
            <Textarea
              placeholder="Your message..."
              value={emailData.message}
              onChange={(e) => setEmailData(prev => ({ ...prev, message: e.target.value }))}
              rows={3}
              required
            />
            <Button 
              type="submit" 
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Mail className="w-4 h-4 mr-2" />
              Send Email
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactForms;
