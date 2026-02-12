
import React from 'react';

interface GiftMenuCardProps {
  onOpenQuiz: () => void;
  onOpenLetter: () => void;
  onOpenGallery: () => void;
  onFinally: () => void;
  onOpenVideo?: () => void;
  hasVideo?: boolean;
}

const GiftMenuCard: React.FC<GiftMenuCardProps> = ({ onOpenQuiz, onOpenLetter, onOpenGallery, onFinally, onOpenVideo, hasVideo }) => {
  const cards = [
    { icon: '🎮', title: 'Fun Quiz', color: 'bg-blue-50', border: 'border-blue-200', action: onOpenQuiz, doll: '🤖' },
    { icon: '📜', title: 'Love Letter', color: 'bg-pink-50', border: 'border-pink-200', action: onOpenLetter, doll: '🦢' },
    { icon: '🖼️', title: 'Memories', color: 'bg-purple-50', border: 'border-purple-200', action: onOpenGallery, doll: '🎨' },
  ];

  if (hasVideo && onOpenVideo) {
    cards.push({ icon: '🎬', title: 'Video', color: 'bg-amber-50', border: 'border-amber-200', action: onOpenVideo, doll: '🎥' });
  }

  return (
    <div className="space-y-10 card-enter">
      <div className="text-center bg-white/70 backdrop-blur-sm p-6 rounded-2xl border-2 border-rose-100">
        <h2 className="text-3xl font-romantic font-bold text-rose-600">You are my sunshine, my only sunshine...</h2>
        <p className="text-rose-400 italic">Please pick a heart to explore</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((item, idx) => (
          <button
            key={idx}
            onClick={item.action}
            className={`${item.color} ${item.border} border-4 p-8 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 group flex flex-col items-center text-center`}
          >
            <div className="text-6xl mb-4 doll-anim">{item.doll}</div>
            <div className="text-4xl mb-2">{item.icon}</div>
            <h3 className="text-2xl font-bold text-rose-600 group-hover:text-rose-700">{item.title}</h3>
          </button>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <button
          onClick={onFinally}
          className="bg-rose-600 text-white px-12 py-4 rounded-full text-2xl font-bold shadow-xl hover:bg-rose-700 transition-all animate-pulse"
        >
          Finally... ✨
        </button>
      </div>
    </div>
  );
};

export default GiftMenuCard;
