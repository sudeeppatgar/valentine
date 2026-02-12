
import React from 'react';

interface WishCardProps {
  onSeeGift: () => void;
  customMessage?: string;
}

const WishCard: React.FC<WishCardProps> = ({ onSeeGift, customMessage }) => {
  return (
    <div className="bg-white/95 backdrop-blur-lg p-12 rounded-[3rem] shadow-2xl border-4 border-rose-300 text-center card-enter">
      <div className="flex justify-center gap-8 mb-8">
        <div className="text-7xl doll-anim" style={{ animationDelay: '0s' }}>🧸</div>
        <div className="text-7xl doll-anim" style={{ animationDelay: '0.5s' }}>🐰</div>
      </div>
      
      <h2 className="text-5xl font-romantic font-bold text-rose-600 mb-6">My Dearest...</h2>
      
      <p className="text-2xl text-rose-500 leading-relaxed font-medium mb-10 italic">
        "{customMessage || "May this day be filled with as much joy, warmth, and beauty as you bring into my life every single day. You are the most precious gift I have ever received."}"
      </p>

      <div className="flex justify-center">
        <button
          onClick={onSeeGift}
          className="bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white px-10 py-4 rounded-full text-xl font-bold shadow-lg transition-all transform hover:scale-110 active:scale-95 flex items-center gap-3"
        >
          See My Gift 🎁
        </button>
      </div>
    </div>
  );
};

export default WishCard;
