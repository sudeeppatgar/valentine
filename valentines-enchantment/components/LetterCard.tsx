
import React, { useEffect, useState } from 'react';
import { generateLoveLetter } from '../services/geminiService';
import { LoveLetterConfig } from '../types';

const LetterCard: React.FC<{ onBack: () => void; customLetter?: string; customConfig?: LoveLetterConfig }> = ({ onBack, customLetter, customConfig }) => {
  const [content, setContent] = useState<string>(customLetter || "Writing your letter...");
  const [loading, setLoading] = useState(!customLetter);

  useEffect(() => {
    if (customLetter) {
      setContent(customLetter);
      setLoading(false);
      return;
    }
    if (!customConfig) {
      setContent("My love for you transcends words, but my heart beats only for you.");
      setLoading(false);
      return;
    }
    const fetchLetter = async () => {
      const letter = await generateLoveLetter(customConfig);
      setContent(letter);
      setLoading(false);
    };
    fetchLetter();
  }, [customLetter, customConfig]);

  return (
    <div className="bg-[#fff9f9] p-12 rounded-[2rem] shadow-2xl border-2 border-rose-100 card-enter max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-romantic font-bold text-rose-600">Soul's Whisper</h2>
        <div className="text-4xl doll-anim">🦢</div>
      </div>
      
      <div className="relative">
        <div className="absolute -left-4 top-0 bottom-0 w-1 bg-rose-200 opacity-30"></div>
        <p className="text-2xl font-romantic text-gray-700 leading-relaxed whitespace-pre-line px-4">
          {loading ? (
            <span className="animate-pulse">Ink is flowing...</span>
          ) : content}
        </p>
      </div>

      <div className="mt-12 flex justify-center gap-6">
        <button onClick={onBack} className="bg-rose-500 text-white px-10 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-all">
          Go Back
        </button>
      </div>
    </div>
  );
};

export default LetterCard;
