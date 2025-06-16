
import React, { useState, useEffect } from 'react';

const BackgroundImageSlider = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const backgroundImages = [
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&h=1080&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1920&h=1080&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&h=1080&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&h=1080&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=1920&h=1080&fit=crop&crop=center"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {backgroundImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-2000 ${
            index === currentImageIndex ? 'opacity-20' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${image})`,
          }}
        />
      ))}
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"></div>
    </div>
  );
};

export default BackgroundImageSlider;
