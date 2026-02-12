
import React, { useState } from 'react';
import { QuizQuestion } from '../types';

const QUESTIONS = [
  {
    q: "Where was our first 'real' conversation?",
    options: ["At the park", "Over text/call", "In a dream", "The Library"],
    answer: 1
  },
  {
    q: "What's the one thing that always makes me smile?",
    options: ["Your laugh", "Your eyes", "Your cooking", "All of the above"],
    answer: 3
  },
  {
    q: "If we were emojis, which pair would we be?",
    options: ["🔥 & 🧊", "🍕 & 🥤", "🌙 & ✨", "🧸 & 🐰"],
    answer: 3
  },
  {
    q: "What is my favorite memory of us?",
    options: ["Every single one", "The rainy day", "Our first walk", "This moment"],
    answer: 0
  },
  {
    q: "How much do I love you?",
    options: ["To the moon", "To infinity", "Beyond words", "All combined!"],
    answer: 3
  }
];

const QuizCard: React.FC<{ onBack: () => void; questions?: QuizQuestion[] }> = ({ onBack, questions }) => {
  const quizQuestions = questions && questions.length > 0 ? questions : QUESTIONS;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleOption = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
  };

  const handleNext = () => {
    if (currentIdx < quizQuestions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <div className="bg-white p-12 rounded-[2rem] shadow-2xl text-center card-enter">
        <div className="text-9xl mb-6">💖</div>
        <h2 className="text-5xl font-romantic font-bold text-rose-600 mb-6">I Love You!</h2>
        <p className="text-xl text-rose-500 mb-10">You passed the heart test perfectly!</p>
        <button onClick={onBack} className="bg-rose-500 text-white px-8 py-3 rounded-full font-bold">Back to Menu</button>
      </div>
    );
  }

  const q = quizQuestions[currentIdx];
  const isCorrect = selectedOption !== null && selectedOption === q.answer;
  const isWrong = selectedOption !== null && selectedOption !== q.answer;

  return (
    <div className="bg-white p-10 rounded-[2rem] shadow-2xl card-enter relative overflow-hidden">
      <div className="absolute top-0 left-0 h-2 bg-rose-500 transition-all duration-500" style={{ width: `${(currentIdx / quizQuestions.length) * 100}%` }}></div>
      
      <div className="text-center mb-8">
        <span className="bg-rose-100 text-rose-600 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
          Question {currentIdx + 1} of {quizQuestions.length}
        </span>
        <h2 className="text-3xl font-bold text-gray-800 mt-4">{q.q}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleOption(i)}
            disabled={selectedOption !== null}
            className={`p-6 border-2 rounded-2xl text-lg font-medium transition-all text-left flex items-center justify-between
              ${selectedOption === null ? "border-rose-100 text-rose-700 hover:bg-rose-50 hover:border-rose-400" : ""}
              ${selectedOption !== null && i === q.answer ? "border-rose-500 bg-rose-50 text-rose-700" : ""}
              ${selectedOption !== null && i !== q.answer ? "border-rose-100 text-rose-300" : ""}
            `}
          >
            <span>{opt}</span>
            {selectedOption !== null && i === q.answer && (
              <span className="text-rose-500">❤</span>
            )}
          </button>
        ))}
      </div>

      {isCorrect && (
        <div className="mt-6 text-center">
          <div className="text-4xl">😊</div>
          <p className="text-rose-600 font-semibold">Perfect! You just made my heart smile.</p>
        </div>
      )}
      {isWrong && (
        <div className="mt-6 text-center">
          <div className="text-4xl">🙂</div>
          <p className="text-rose-500 font-semibold">Almost! Try again on the next one.</p>
        </div>
      )}

      <div className="mt-8 flex items-center justify-between">
        <button onClick={onBack} className="text-rose-400 hover:text-rose-600 transition-colors">Abort Mission 🔙</button>
        <button
          onClick={handleNext}
          disabled={selectedOption === null}
          className="bg-rose-500 text-white px-6 py-2 rounded-full font-bold disabled:opacity-60"
        >
          {currentIdx < quizQuestions.length - 1 ? "Next" : "Finish"}
        </button>
      </div>
    </div>
  );
};

export default QuizCard;
