
import React, { useState } from 'react';
import { Github, Linkedin, Mail, Phone, Facebook, Instagram, MessageSquare, Youtube } from 'lucide-react';

const SocialMediaSlider = () => {
  const [isExpanded, setIsExpanded] = useState(true); // Changed to true by default

  const socialLinks = [
    {
      icon: Mail,
      href: "mailto:charmthiekshana97@gmail.com",
      label: "Email",
      bgColor: "bg-red-500 hover:bg-red-600",
      shadowColor: "shadow-red-500/50",
      borderColor: "border-red-500/20"
    },
    {
      icon: Phone,
      href: "tel:+94754465955",
      label: "Phone",
      bgColor: "bg-green-500 hover:bg-green-600",
      shadowColor: "shadow-green-500/50",
      borderColor: "border-green-500/20"
    },
    {
      icon: MessageSquare,
      href: "https://wa.me/94754465955",
      label: "WhatsApp",
      bgColor: "bg-emerald-500 hover:bg-emerald-600",
      shadowColor: "shadow-emerald-500/50",
      borderColor: "border-emerald-500/20"
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/charm-thiekshana-perera/",
      label: "LinkedIn",
      bgColor: "bg-blue-600 hover:bg-blue-700",
      shadowColor: "shadow-blue-600/50",
      borderColor: "border-blue-600/20"
    },
    {
      icon: Github,
      href: "https://github.com/charmthiekshana",
      label: "GitHub",
      bgColor: "bg-gray-800 hover:bg-gray-900 dark:bg-gray-600 dark:hover:bg-gray-700",
      shadowColor: "shadow-gray-800/50 dark:shadow-gray-600/50",
      borderColor: "border-gray-800/20 dark:border-gray-600/20"
    },
    {
      icon: Facebook,
      href: "https://facebook.com/charmthiekshana",
      label: "Facebook",
      bgColor: "bg-blue-700 hover:bg-blue-800",
      shadowColor: "shadow-blue-700/50",
      borderColor: "border-blue-700/20"
    },
    {
      icon: Instagram,
      href: "https://instagram.com/charmthiekshana",
      label: "Instagram",
      bgColor: "bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 hover:from-pink-600 hover:via-purple-600 hover:to-orange-600",
      shadowColor: "shadow-pink-500/50",
      borderColor: "border-pink-500/20"
    },
    {
      icon: Youtube,
      href: "https://youtube.com/@charmthiekshana",
      label: "YouTube",
      bgColor: "bg-red-600 hover:bg-red-700",
      shadowColor: "shadow-red-600/50",
      borderColor: "border-red-600/20"
    }
  ];

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-[200]">
      <div 
        className={`flex flex-col items-end transition-all duration-500 ease-in-out ${
          isExpanded ? 'translate-x-0' : 'translate-x-12'
        }`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`mb-4 p-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-l-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 ${
            isExpanded ? 'rounded-r-none animate-pulse-glow' : 'rounded-r-full animate-bounce'
          }`}
          aria-label="Toggle social media menu"
        >
          <div className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-0' : 'rotate-180'}`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>

        {/* Social Links */}
        <div className="flex flex-col space-y-3">
          {socialLinks.map((social, index) => (
            <div
              key={social.label}
              className={`transform transition-all duration-300 ${
                isExpanded 
                  ? 'translate-x-0 opacity-100' 
                  : 'translate-x-16 opacity-0'
              }`}
              style={{ 
                transitionDelay: isExpanded ? `${index * 50}ms` : `${(socialLinks.length - index) * 30}ms` 
              }}
            >
              <a
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`group flex items-center justify-center w-12 h-12 ${social.bgColor} text-white rounded-l-full shadow-lg ${social.shadowColor} hover:shadow-xl transition-all duration-300 transform hover:scale-110 border ${social.borderColor} relative overflow-hidden social-icon-hover`}
                aria-label={social.label}
              >
                {/* Icon */}
                <social.icon className="w-5 h-5 relative z-10 transition-colors duration-300" />
                
                {/* Tooltip */}
                <div className="absolute right-full mr-3 px-3 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 pointer-events-none whitespace-nowrap">
                  {social.label}
                  <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-l-4 border-l-gray-900 dark:border-l-gray-100 border-y-4 border-y-transparent"></div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Backdrop for mobile */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10 md:hidden"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
};

export default SocialMediaSlider;
