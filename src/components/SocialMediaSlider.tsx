
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle, Github, Linkedin, Facebook, Instagram, Youtube, X, ChevronLeft, ChevronRight } from 'lucide-react';

const SocialMediaSlider = () => {
  const [isVisible, setIsVisible] = useState(true);

  const socialLinks = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: 'https://wa.me/94729755955',
      color: 'bg-green-500 hover:bg-green-600',
      textColor: 'text-white'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/charm-thiekshana-644b85346',
      color: 'bg-blue-600 hover:bg-blue-700',
      textColor: 'text-white'
    },
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/CharmThiekshanaPerera',
      color: 'bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-800',
      textColor: 'text-white'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://www.facebook.com/Charmz1997SL',
      color: 'bg-blue-500 hover:bg-blue-600',
      textColor: 'text-white'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/w_h_i_t_e___w_o_l_f_',
      color: 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700',
      textColor: 'text-white'
    },
    {
      name: 'YouTube',
      icon: Youtube,
      url: 'https://www.youtube.com/channel/UC7npdzqjOKBZlKzxb72SY2Q',
      color: 'bg-red-500 hover:bg-red-600',
      textColor: 'text-white'
    }
  ];

  return (
    <div className={`fixed right-4 top-1/2 transform -translate-y-1/2 z-[100] transition-all duration-300 ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex flex-col items-end space-y-2">
        {/* Toggle Button */}
        <Button
          onClick={() => setIsVisible(!isVisible)}
          className="mb-2 w-10 h-10 rounded-full bg-primary/20 hover:bg-primary/30 backdrop-blur-sm border border-primary/30"
          size="sm"
        >
          {isVisible ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>

        {/* Social Media Icons */}
        <div className={`flex flex-col space-y-3 transition-all duration-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}>
          {socialLinks.map((social, index) => (
            <Button
              key={social.name}
              asChild
              className={`w-12 h-12 rounded-full ${social.color} ${social.textColor} shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 animate-fade-in-scale`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${social.name}`}
                title={social.name}
              >
                <social.icon className="w-5 h-5" />
              </a>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialMediaSlider;
