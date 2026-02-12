
import React from 'react';

const ForeverCard: React.FC<{ imageUrl?: string }> = ({ imageUrl }) => {
  return (
    <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl text-center card-enter border-8 border-rose-50 relative">
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-rose-500 text-white px-8 py-2 rounded-full font-bold shadow-lg">
        Forever & Always
      </div>

      <h2 className="text-6xl font-romantic font-bold text-rose-600 mb-8 mt-4">
        You are my forever
      </h2>

      <div className="relative group w-full max-w-xl mx-auto mb-10 rounded-2xl overflow-hidden shadow-2xl aspect-video bg-gray-100 flex items-center justify-center">
        {imageUrl ? (
          <img src={imageUrl} alt="Forever memory" className="w-full h-full object-cover" />
        ) : (
          <div className="text-6xl">💞</div>
        )}
        <div className="absolute inset-0 bg-rose-500/10 pointer-events-none group-hover:bg-transparent transition-colors"></div>
      </div>

      <div className="space-y-6 max-w-lg mx-auto">
        <p className="text-2xl font-romantic text-rose-500 leading-relaxed italic">
          "In a sea of people, my eyes will always search for you. You're not just my Valentine, you're my heart's permanent home."
        </p>
        
        <div className="flex justify-center gap-4 text-4xl">
          <span className="animate-pulse">❤️</span>
          <span className="animate-pulse" style={{ animationDelay: '0.2s' }}>💖</span>
          <span className="animate-pulse" style={{ animationDelay: '0.4s' }}>✨</span>
        </div>

        <button 
          onClick={() => window.location.reload()}
          className="mt-8 text-rose-300 hover:text-rose-500 text-sm transition-colors"
        >
          Relive the magic?
        </button>
      </div>
    </div>
  );
};

export default ForeverCard;
