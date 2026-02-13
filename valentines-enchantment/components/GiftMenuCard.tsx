import React from "react";

interface GiftMenuCardProps {
  onOpenQuiz: () => void;
  onOpenLetter: () => void;
  onOpenGallery: () => void;
  onFinally: () => void;
  onOpenVideo?: () => void;
  hasVideo?: boolean;
}

const GiftMenuCard: React.FC<GiftMenuCardProps> = ({
  onOpenQuiz,
  onOpenLetter,
  onOpenGallery,
  onFinally,
  onOpenVideo,
  hasVideo,
}) => {
  const cards = [
    {
      icon: "🎮",
      title: "Fun Quiz",
      color: "bg-blue-50",
      border: "border-blue-200",
      action: onOpenQuiz,
      doll: "🤖",
    },
    {
      icon: "📜",
      title: "Love Letter",
      color: "bg-pink-50",
      border: "border-pink-200",
      action: onOpenLetter,
      doll: "🦢",
    },
    {
      icon: "🖼️",
      title: "Memories",
      color: "bg-purple-50",
      border: "border-purple-200",
      action: onOpenGallery,
      doll: "🎨",
    },
  ];

  if (hasVideo && onOpenVideo) {
    cards.push({
      icon: "🎬",
      title: "Video",
      color: "bg-amber-50",
      border: "border-amber-200",
      action: onOpenVideo,
      doll: "🎥",
    });
  }

  return (
    <div className="space-y-6 sm:space-y-8 md:space-y-10 card-enter w-full">
      <div className="text-center bg-white/70 backdrop-blur-sm p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-2xl border-2 border-rose-100">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-romantic font-bold text-rose-600 leading-tight">
          You are my sunshine, my only sunshine...
        </h2>
        <p className="text-rose-400 italic text-xs sm:text-sm md:text-base mt-2">
          Please pick a heart to explore
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
        {cards.map((item, idx) => (
          <button
            key={idx}
            onClick={item.action}
            className={`${item.color} ${item.border} border-2 sm:border-3 md:border-4 p-5 sm:p-6 md:p-8 rounded-2xl md:rounded-[2rem] shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 sm:hover:-translate-y-2 active:scale-95 group flex flex-col items-center text-center`}
          >
            <div className="text-4xl sm:text-5xl md:text-6xl mb-2 sm:mb-3 md:mb-4 doll-anim">
              {item.doll}
            </div>
            <div className="text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2">
              {item.icon}
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-rose-600 group-hover:text-rose-700 transition-colors">
              {item.title}
            </h3>
          </button>
        ))}
      </div>

      <div className="flex justify-center mt-8 sm:mt-10 md:mt-12">
        <button
          onClick={onFinally}
          className="bg-rose-600 hover:bg-rose-700 active:scale-95 text-white px-8 sm:px-10 md:px-12 py-2.5 sm:py-3 md:py-4 rounded-full text-lg sm:text-xl md:text-2xl font-bold shadow-xl transition-all animate-pulse"
        >
          Finally... ✨
        </button>
      </div>
    </div>
  );
};

export default GiftMenuCard;
