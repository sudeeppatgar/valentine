import React, { useState } from "react";

interface ProposalCardProps {
  onAccept: () => void;
  customMessage?: string;
  senderName?: string;
  recipientName?: string;
  imageUrl?: string;
}

const ProposalCard: React.FC<ProposalCardProps> = ({
  onAccept,
  customMessage,
  senderName,
  recipientName,
  imageUrl,
}) => {
  const [noCount, setNoCount] = useState(0);
  const [isHoveringNo, setIsHoveringNo] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });

  const moveNoButton = () => {
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    setNoButtonPos({ x, y });
    setNoCount((prev) => prev + 1);
  };

  const yesButtonSize = 1 + noCount * 0.25;
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  return (
    <div className="bg-white/90 backdrop-blur-md p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-[2.5rem] shadow-2xl border-2 sm:border-4 border-rose-200 text-center card-enter w-full">
      <div className="mb-4 sm:mb-6 h-32 sm:h-40 flex items-center justify-center relative">
        {/* Animated Doll Changes based on state */}
        <div className="text-6xl sm:text-7xl md:text-8xl doll-anim">
          {isHoveringNo ? "😢" : noCount > 5 ? "🤨" : "🥰"}
        </div>
        <div className="absolute -top-6 sm:-top-10 -right-3 sm:-right-5 text-2xl sm:text-4xl animate-bounce">
          💌
        </div>
      </div>
      {imageUrl && (
        <div className="mb-4 sm:mb-6">
          <img
            src={imageUrl}
            alt="Proposal"
            className="w-full max-w-md mx-auto rounded-xl sm:rounded-2xl border border-rose-100 object-cover"
          />
        </div>
      )}

      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-romantic font-bold text-rose-600 mb-4 sm:mb-6 leading-tight">
        Will you be my Valentine?
      </h1>

      <div className="flex flex-col gap-3 sm:gap-6 md:gap-12 relative w-full">
        <button
          onClick={onAccept}
          style={{ transform: `scale(${yesButtonSize})` }}
          className="bg-rose-500 hover:bg-rose-600 active:scale-95 text-white px-6 sm:px-8 md:px-12 py-2.5 sm:py-3 md:py-4 rounded-full text-lg sm:text-xl md:text-2xl font-bold shadow-xl transition-all z-20 mx-auto"
        >
          Yes! 💖
        </button>

        <button
          onMouseEnter={() => {
            if (!isMobile) {
              setIsHoveringNo(true);
              moveNoButton();
            }
          }}
          onMouseLeave={() => setIsHoveringNo(false)}
          onClick={moveNoButton}
          style={{
            transform: `translate(${isMobile ? 0 : noButtonPos.x}px, ${isMobile ? 0 : noButtonPos.y}px)`,
            opacity: Math.max(0.2, 1 - noCount * 0.1),
          }}
          className="bg-gray-200 hover:bg-gray-300 text-gray-600 px-6 sm:px-8 py-2 sm:py-3 rounded-full text-base sm:text-lg md:text-xl font-semibold transition-all mx-auto"
        >
          {noCount === 0 ? "No" : "Wait, what?"}
        </button>
      </div>
    </div>
  );
};

export default ProposalCard;
