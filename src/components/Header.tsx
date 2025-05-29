
import React from 'react';

const Header = () => {
  return (
    <header className="relative overflow-hidden py-8 mb-8">
      <div className="absolute inset-0 bg-gradient-neon opacity-20 animate-pulse"></div>
      <div className="relative z-10 text-center">
        <h1 className="text-6xl md:text-8xl font-bold neon-text mb-4 animate-float">
          KEKV
        </h1>
        <p className="text-xl md:text-2xl text-white/80 font-light tracking-wide">
          FiveM Yayıncı Merkezi
        </p>
        <div className="mt-4 w-32 h-1 bg-gradient-to-r from-neon-purple to-neon-pink mx-auto rounded-full"></div>
      </div>
    </header>
  );
};

export default Header;
