
import React, { useState } from 'react';

interface ProposalCardProps {
  onAccept: () => void;
  customMessage?: string;
  senderName?: string;
  recipientName?: string;
  imageUrl?: string;
}

const ProposalCard: React.FC<ProposalCardProps> = ({ onAccept, customMessage, senderName, recipientName, imageUrl }) => {
  const [noCount, setNoCount] = useState(0);
  const [isHoveringNo, setIsHoveringNo] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });

  const moveNoButton = () => {
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    setNoButtonPos({ x, y });
    setNoCount(prev => prev + 1);
  };

  const yesButtonSize = 1 + noCount * 0.25;

  return (
    <div className="bg-white/90 backdrop-blur-md p-10 rounded-[2.5rem] shadow-2xl border-4 border-rose-200 text-center card-enter">
      <div className="mb-6 h-40 flex items-center justify-center relative">
        {/* Animated Doll Changes based on state */}
        <div className="text-8xl doll-anim">
          {isHoveringNo ? '😢' : noCount > 5 ? '🤨' : '🥰'}
        </div>
        <div className="absolute -top-10 -right-5 text-4xl animate-bounce">💌</div>
      </div>
      {imageUrl && (
        <div className="mb-6">
          <img
            src={imageUrl}
            alt="Proposal"
            className="w-full max-w-md mx-auto rounded-2xl border border-rose-100 object-cover"
          />
        </div>
      )}

      <h1 className="text-4xl md:text-5xl font-romantic font-bold text-rose-600 mb-6">
        Will you be my Valentine?
      </h1>

      <div className="flex flex-col md:flex-row items-center justify-center gap-12 relative h-48">
        <button
          onClick={onAccept}
          style={{ transform: `scale(${yesButtonSize})` }}
          className="bg-rose-500 hover:bg-rose-600 text-white px-12 py-4 rounded-full text-2xl font-bold shadow-xl transition-all z-20"
        >
          Yes! 💖
        </button>

        <button
          onMouseEnter={() => {
            setIsHoveringNo(true);
            moveNoButton();
          }}
          onMouseLeave={() => setIsHoveringNo(false)}
          onClick={moveNoButton}
          style={{
            transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`,
            opacity: Math.max(0.2, 1 - noCount * 0.1)
          }}
          className="bg-gray-200 text-gray-600 px-8 py-3 rounded-full text-xl font-semibold transition-all"
        >
          {noCount === 0 ? "No" : "Wait, what?"}
        </button>
      </div>
    </div>
  );
};

export default ProposalCard;
