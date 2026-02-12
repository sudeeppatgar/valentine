
import React, { useState } from 'react';

const ValentineProposal: React.FC = () => {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [accepted, setAccepted] = useState(false);
  const [noCount, setNoCount] = useState(0);

  const moveButton = () => {
    const x = Math.random() * (window.innerWidth < 768 ? 200 : 400) - 200;
    const y = Math.random() * (window.innerWidth < 768 ? 100 : 200) - 100;
    setNoButtonPos({ x, y });
    setNoCount(prev => prev + 1);
  };

  const phrases = [
    "No",
    "Are you sure?",
    "Really sure?",
    "Think again!",
    "Last chance!",
    "Surely not?",
    "You might regret this!",
    "Give it another thought!",
    "Are you absolutely certain?",
    "This could be a mistake!",
    "Have a heart!",
    "Don't be so cold!",
    "Change of heart?",
    "Wouldn't you reconsider?",
    "Is that your final answer?",
    "You're breaking my heart ;("
  ];

  if (accepted) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center animate-scale-up">
        <img src="https://picsum.photos/seed/love/400/300" alt="Happy couple" className="rounded-2xl shadow-2xl mb-8 border-4 border-rose-400" />
        <h2 className="text-5xl font-romantic font-bold text-rose-600 mb-4">Yay! I knew you'd say Yes! ❤️</h2>
        <p className="text-xl text-rose-500">I promise to make this day unforgettable.</p>
      </div>
    );
  }

  return (
    <section id="proposal" className="py-20 px-4 min-h-[60vh] flex flex-col items-center justify-center text-center bg-white/50 backdrop-blur-sm rounded-3xl mx-4 md:mx-auto max-w-4xl shadow-xl">
      <h2 className="text-4xl md:text-6xl font-romantic font-bold text-rose-600 mb-12">Will you be my Valentine?</h2>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 relative">
        <button
          onClick={() => setAccepted(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-10 py-4 rounded-full text-2xl font-bold shadow-lg transition-all transform hover:scale-125 z-10"
          style={{ fontSize: `${24 + noCount * 2}px` }}
        >
          Yes! 💘
        </button>
        
        <button
          onMouseEnter={moveButton}
          onClick={moveButton}
          className="bg-rose-500 text-white px-10 py-4 rounded-full text-2xl font-bold shadow-lg transition-all"
          style={{
            transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`,
            position: 'relative'
          }}
        >
          {phrases[Math.min(noCount, phrases.length - 1)]}
        </button>
      </div>
    </section>
  );
};

export default ValentineProposal;
