
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle, Github, Linkedin, ChevronLeft, ChevronRight, X } from 'lucide-react';

const SocialMediaSlider = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isHidden, setIsHidden] = useState(false);

  const socialLinks = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: 'https://wa.me/94729755955',
      gradient: 'from-green-400 to-green-600',
      hoverGradient: 'hover:from-green-500 hover:to-green-700'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/charm-thiekshana-644b85346',
      gradient: 'from-blue-500 to-blue-700',
      hoverGradient: 'hover:from-blue-600 hover:to-blue-800'
    },
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/CharmThiekshanaPerera',
      gradient: 'from-gray-700 to-gray-900',
      hoverGradient: 'hover:from-gray-800 hover:to-black'
    },
    {
      name: 'Facebook',
      icon: () => (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      url: 'https://www.facebook.com/Charmz1997SL',
      gradient: 'from-blue-600 to-blue-800',
      hoverGradient: 'hover:from-blue-700 hover:to-blue-900'
    },
    {
      name: 'Instagram',
      icon: () => (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988s11.987-5.367 11.987-11.988C24.014 5.367 18.647.001 12.017.001zM8.449 20.312c-2.076 0-3.762-1.686-3.762-3.762V7.45c0-2.076 1.686-3.762 3.762-3.762h7.102c2.076 0 3.762 1.686 3.762 3.762v9.1c0 2.076-1.686 3.762-3.762 3.762H8.449zm3.568-12.518c-2.485 0-4.506 2.021-4.506 4.506s2.021 4.506 4.506 4.506 4.506-2.021 4.506-4.506-2.021-4.506-4.506-4.506zm0 7.02c-1.388 0-2.514-1.126-2.514-2.514s1.126-2.514 2.514-2.514 2.514 1.126 2.514 2.514-1.126 2.514-2.514 2.514zm4.928-6.876c-.582 0-1.055-.473-1.055-1.055s.473-1.055 1.055-1.055 1.055.473 1.055 1.055-.473 1.055-1.055 1.055z"/>
        </svg>
      ),
      url: 'https://www.instagram.com/w_h_i_t_e___w_o_l_f_',
      gradient: 'from-pink-500 via-red-500 to-yellow-500',
      hoverGradient: 'hover:from-pink-600 hover:via-red-600 hover:to-yellow-600'
    },
    {
      name: 'YouTube',
      icon: () => (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
      url: 'https://www.youtube.com/channel/UC7npdzqjOKBZlKzxb72SY2Q',
      gradient: 'from-red-500 to-red-700',
      hoverGradient: 'hover:from-red-600 hover:to-red-800'
    }
  ];

  if (isHidden) {
    return (
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-[100]">
        <Button
          onClick={() => setIsHidden(false)}
          className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg animate-bounce-in neon-border"
          size="sm"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className={`fixed right-4 top-1/2 transform -translate-y-1/2 z-[100] transition-all duration-500 ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex flex-col items-end space-y-3">
        {/* Control Buttons */}
        <div className="flex flex-col space-y-2 mb-2">
          <Button
            onClick={() => setIsVisible(!isVisible)}
            className="w-10 h-10 rounded-full glass-card hover:scale-110 transition-all duration-300 animate-glow"
            size="sm"
          >
            {isVisible ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
          
          <Button
            onClick={() => setIsHidden(true)}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 shadow-lg hover:scale-110 transition-all duration-300"
            size="sm"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Social Media Icons */}
        <div className={`flex flex-col space-y-4 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}>
          {socialLinks.map((social, index) => {
            const IconComponent = social.icon;
            return (
              <Button
                key={social.name}
                asChild
                className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${social.gradient} ${social.hoverGradient} text-white shadow-xl hover:shadow-2xl transform hover:scale-125 hover:rotate-6 transition-all duration-300 animate-fade-in-up neon-border ripple`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${social.name}`}
                  title={social.name}
                  className="flex items-center justify-center"
                >
                  <IconComponent />
                </a>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SocialMediaSlider;
