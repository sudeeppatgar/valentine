
import { GoogleGenAI } from "@google/genai";
import { LoveLetterConfig } from "../types";

export const generateLoveLetter = async (config: LoveLetterConfig): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Write a romantic Valentine's Day ${config.tone} letter to ${config.recipient}. 
  Include these details: ${config.details}. 
  Keep it heartfelt, engaging, and under 250 words.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are a world-class romantic poet and speechwriter with a specialty in heartfelt Valentine's messages.",
        temperature: 0.8,
      },
    });

    return response.text || "My love for you transcends words, but even a blank page speaks of the space you fill in my heart.";
  } catch (error) {
    console.error("Error generating letter:", error);
    return "The stars couldn't align to write this letter, but my heart still beats only for you.";
  }
};
