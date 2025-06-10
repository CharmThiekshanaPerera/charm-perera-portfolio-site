
import React, { useState } from 'react';
import { Github, Linkedin, Mail, Phone, Facebook, Instagram, Twitter } from 'lucide-react';

const SocialMediaSlider = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const socialLinks = [
    {
      icon: Mail,
      href: "mailto:charmthiekshana97@gmail.com",
      label: "Email",
      color: "hover:bg-blue-500",
      bgGradient: "from-blue-400 to-blue-600"
    },
    {
      icon: Phone,
      href: "tel:+94754465955",
      label: "Phone",
      color: "hover:bg-green-500",
      bgGradient: "from-green-400 to-green-600"
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/charm-thiekshana-perera/",
      label: "LinkedIn",
      color: "hover:bg-blue-600",
      bgGradient: "from-blue-500 to-blue-700"
    },
    {
      icon: Github,
      href: "#",
      label: "GitHub",
      color: "hover:bg-gray-700",
      bgGradient: "from-gray-600 to-gray-800"
    },
    {
      icon: Facebook,
      href: "#",
      label: "Facebook",
      color: "hover:bg-blue-700",
      bgGradient: "from-blue-600 to-blue-800"
    },
    {
      icon: Instagram,
      href: "#",
      label: "Instagram",
      color: "hover:bg-pink-500",
      bgGradient: "from-pink-400 to-purple-600"
    },
    {
      icon: Twitter,
      href: "#",
      label: "Twitter",
      color: "hover:bg-sky-500",
      bgGradient: "from-sky-400 to-sky-600"
    }
  ];

  return (
    <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-[100]">
      <div 
        className={`flex flex-col items-end transition-all duration-500 ease-in-out ${
          isExpanded ? 'translate-x-0' : 'translate-x-12'
        }`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`mb-4 p-3 bg-blue-600 text-white rounded-l-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 ${
            isExpanded ? 'rounded-r-none' : 'rounded-r-full'
          }`}
          aria-label="Toggle social media menu"
        >
          <div className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>

        {/* Social Links */}
        <div className="flex flex-col space-y-2">
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
                className={`group flex items-center justify-center w-12 h-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-l-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110 ${social.color} relative overflow-hidden`}
                aria-label={social.label}
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-r ${social.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                {/* Icon */}
                <social.icon className="w-5 h-5 relative z-10 text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors duration-300" />
                
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
