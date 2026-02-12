
import React, { useState } from 'react';
import { generateLoveLetter } from '../services/geminiService';
import { LoveLetterConfig } from '../types';

const LoveLetterGenerator: React.FC = () => {
  const [config, setConfig] = useState<LoveLetterConfig>({
    recipient: '',
    tone: 'sweet',
    details: ''
  });
  const [loading, setLoading] = useState(false);
  const [letter, setLetter] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!config.recipient) return;
    
    setLoading(true);
    const result = await generateLoveLetter(config);
    setLetter(result);
    setLoading(false);
  };

  return (
    <section className="py-20 px-4 max-w-2xl mx-auto">
      <div className="bg-rose-50 p-8 rounded-3xl shadow-inner border border-rose-200">
        <h2 className="text-3xl font-romantic font-bold text-rose-600 mb-6 text-center">AI Love Letter Writer</h2>
        <p className="text-rose-500 text-center mb-8">Can't find the words? Let our romantic AI help you express your heart.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-rose-700 font-semibold mb-2">To my dearest...</label>
            <input
              type="text"
              placeholder="Name of your Valentine"
              className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white"
              value={config.recipient}
              onChange={(e) => setConfig({ ...config, recipient: e.target.value })}
              required
            />
          </div>
          
          <div>
            <label className="block text-rose-700 font-semibold mb-2">Tone of my heart</label>
            <select
              className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white"
              value={config.tone}
              onChange={(e) => setConfig({ ...config, tone: e.target.value as any })}
            >
              <option value="sweet">Sweet & Tender</option>
              <option value="passionate">Passionate & Intense</option>
              <option value="poetic">Poetic & Artistic</option>
              <option value="funny">Playful & Funny</option>
            </select>
          </div>

          <div>
            <label className="block text-rose-700 font-semibold mb-2">Special Memories or Details</label>
            <textarea
              placeholder="e.g. Our first date at the beach, your laugh..."
              className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white h-32"
              value={config.details}
              onChange={(e) => setConfig({ ...config, details: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 rounded-xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Writing your heart out...' : 'Generate Love Letter ✨'}
          </button>
        </form>

        {letter && (
          <div className="mt-12 p-8 bg-white rounded-2xl border-2 border-rose-100 shadow-xl animate-fade-in relative">
            <div className="absolute top-4 right-4 text-rose-300 opacity-20 text-4xl">✒️</div>
            <div className="font-romantic text-2xl text-gray-800 whitespace-pre-line leading-relaxed">
              {letter}
            </div>
            <div className="mt-6 flex justify-end">
               <button 
                onClick={() => {
                  navigator.clipboard.writeText(letter);
                  alert("Letter copied to clipboard!");
                }}
                className="text-rose-500 text-sm hover:underline"
              >
                Copy to Clipboard
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LoveLetterGenerator;
