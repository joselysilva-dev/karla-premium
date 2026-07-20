import { GoogleGenAI } from "@google/genai";

console.log("GEMINI =", process.env.GEMINI_API_KEY);

export async function chatWithKarla(message) {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: message,
  });

  return response.text;
}