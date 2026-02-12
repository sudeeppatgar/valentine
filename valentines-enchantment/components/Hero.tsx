
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      <div className="z-10 animate-fade-in-up">
        <h1 className="text-6xl md:text-8xl font-romantic font-bold text-rose-600 mb-6 drop-shadow-sm">
          Happy Valentine's Day
        </h1>
        <p className="text-xl md:text-2xl text-rose-500 max-w-2xl mx-auto font-light italic">
          "Where there is love, there is life."
        </p>
        <div className="mt-10 animate-bounce">
          <button 
            onClick={() => document.getElementById('proposal')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition-all transform hover:scale-110 active:scale-95"
          >
            Enter the Heart 💖
          </button>
        </div>
      </div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-rose-200 rounded-full blur-[100px] opacity-30 z-0"></div>
    </section>
  );
};

export default Hero;
