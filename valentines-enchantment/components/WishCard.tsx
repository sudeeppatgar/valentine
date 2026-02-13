import React from "react";

interface WishCardProps {
  onSeeGift: () => void;
  customMessage?: string;
}

const WishCard: React.FC<WishCardProps> = ({ onSeeGift, customMessage }) => {
  return (
    <div className="bg-white/95 backdrop-blur-lg p-6 sm:p-8 md:p-12 rounded-2xl md:rounded-[3rem] shadow-2xl border-2 sm:border-4 border-rose-300 text-center card-enter w-full">
      <div className="flex justify-center gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-6 md:mb-8">
        <div
          className="text-5xl sm:text-6xl md:text-7xl doll-anim"
          style={{ animationDelay: "0s" }}
        >
          🧸
        </div>
        <div
          className="text-5xl sm:text-6xl md:text-7xl doll-anim"
          style={{ animationDelay: "0.5s" }}
        >
          🐰
        </div>
      </div>

      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-romantic font-bold text-rose-600 mb-4 sm:mb-6 leading-tight">
        My Dearest...
      </h2>

      <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-rose-500 leading-relaxed font-medium mb-6 sm:mb-8 md:mb-10 italic px-1">
        "
        {customMessage ||
          "May this day be filled with as much joy, warmth, and beauty as you bring into my life every single day. You are the most precious gift I have ever received."}
        "
      </p>

      <div className="flex justify-center">
        <button
          onClick={onSeeGift}
          className="bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 active:scale-95 text-white px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 rounded-full text-base sm:text-lg md:text-xl font-bold shadow-lg transition-all transform hover:scale-110 flex items-center gap-2 justify-center flex-wrap"
        >
          See My Gift 🎁
        </button>
      </div>
    </div>
  );
};

export default WishCard;
