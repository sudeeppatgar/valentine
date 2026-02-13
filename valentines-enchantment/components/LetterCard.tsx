import React, { useEffect, useState } from "react";
import { generateLoveLetter } from "../services/geminiService";
import { LoveLetterConfig } from "../types";

const LetterCard: React.FC<{
  onBack: () => void;
  customLetter?: string;
  customConfig?: LoveLetterConfig;
}> = ({ onBack, customLetter, customConfig }) => {
  const [content, setContent] = useState<string>(
    customLetter || "Writing your letter...",
  );
  const [loading, setLoading] = useState(!customLetter);

  useEffect(() => {
    if (customLetter) {
      setContent(customLetter);
      setLoading(false);
      return;
    }
    if (!customConfig) {
      setContent(
        "My love for you transcends words, but my heart beats only for you.",
      );
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
    <div className="bg-[#fff9f9] p-6 sm:p-8 md:p-10 lg:p-12 rounded-xl sm:rounded-2xl md:rounded-[2rem] shadow-2xl border-2 border-rose-100 card-enter max-w-2xl mx-auto w-full">
      <div className="flex justify-between items-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-romantic font-bold text-rose-600 leading-tight">
          Soul's Whisper
        </h2>
        <div className="text-3xl sm:text-4xl doll-anim flex-shrink-0">🦢</div>
      </div>

      <div className="relative">
        <div className="absolute -left-2 sm:-left-4 top-0 bottom-0 w-0.5 sm:w-1 bg-rose-200 opacity-30"></div>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-romantic text-gray-700 leading-relaxed whitespace-pre-line px-3 sm:px-4">
          {loading ? (
            <span className="animate-pulse">Ink is flowing...</span>
          ) : (
            content
          )}
        </p>
      </div>

      <div className="mt-8 sm:mt-10 md:mt-12 flex justify-center gap-4 sm:gap-6">
        <button
          onClick={onBack}
          className="bg-rose-500 hover:bg-rose-600 active:scale-95 text-white px-6 sm:px-8 md:px-10 py-2 sm:py-2.5 md:py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-all text-sm sm:text-base md:text-lg"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default LetterCard;
