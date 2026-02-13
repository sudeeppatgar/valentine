import React from "react";

const ForeverCard: React.FC<{ imageUrl?: string }> = ({ imageUrl }) => {
  return (
    <div className="bg-white p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl md:rounded-[3.5rem] shadow-2xl text-center card-enter border-4 md:border-8 border-rose-50 relative w-full">
      <div className="absolute -top-4 sm:-top-5 md:-top-6 left-1/2 -translate-x-1/2 bg-rose-500 text-white px-4 sm:px-6 md:px-8 py-1.5 sm:py-2 rounded-full font-bold shadow-lg text-xs sm:text-sm md:text-base whitespace-nowrap">
        Forever & Always
      </div>

      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-romantic font-bold text-rose-600 mb-6 sm:mb-8 mt-4 leading-tight">
        You are my forever
      </h2>

      <div className="relative group w-full max-w-xl mx-auto mb-8 sm:mb-10 rounded-lg sm:rounded-2xl overflow-hidden shadow-2xl aspect-video bg-gray-100 flex items-center justify-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Forever memory"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-4xl sm:text-5xl md:text-6xl">💞</div>
        )}
        <div className="absolute inset-0 bg-rose-500/10 pointer-events-none group-hover:bg-transparent transition-colors"></div>
      </div>

      <div className="space-y-4 sm:space-y-5 md:space-y-6 max-w-lg mx-auto px-2">
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-romantic text-rose-500 leading-relaxed italic">
          "In a sea of people, my eyes will always search for you. You're not
          just my Valentine, you're my heart's permanent home."
        </p>

        <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 text-2xl sm:text-3xl md:text-4xl">
          <span className="animate-pulse">❤️</span>
          <span className="animate-pulse" style={{ animationDelay: "0.2s" }}>
            💖
          </span>
          <span className="animate-pulse" style={{ animationDelay: "0.4s" }}>
            ✨
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForeverCard;
