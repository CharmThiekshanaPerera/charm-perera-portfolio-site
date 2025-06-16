
import React from 'react';

const FloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Animated gradient orbs with improved movement */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-purple-600/30 rounded-full blur-3xl animate-pulse-glow opacity-70"></div>
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-gradient-to-br from-purple-400/25 to-pink-600/25 rounded-full blur-3xl animate-float-1 opacity-60"></div>
      <div className="absolute bottom-10 left-1/4 w-72 h-72 bg-gradient-to-br from-green-400/20 to-blue-600/20 rounded-full blur-3xl animate-float-2 opacity-50"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-orange-400/15 to-red-600/15 rounded-full blur-3xl animate-float-0 opacity-40"></div>
      
      {/* Moving gradient waves */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute w-full h-32 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent transform rotate-12 animate-slide-bounce"></div>
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent transform -rotate-12 animate-slide-bounce" style={{ animationDelay: '2s' }}></div>
      </div>
      
      {/* Enhanced floating particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className={`absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full opacity-40 animate-float-${i % 3}`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${4 + Math.random() * 6}s`
          }}
        ></div>
      ))}
    </div>
  );
};

export default FloatingElements;
