import { GoogleGenAI } from "@google/genai";
import { karlaPrompt } from "./karlaPrompt.js";

export async function chatWithKarla(message) {
  try {
    console.log("Mensagem recebida:", message);

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    console.log("Antes de chamar o Gemini");


    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: `${karlaPrompt}

Aluno: ${message}`,
    });
    console.log("Depois de chamar o Gemini");
    console.log("Resposta completa:", response);

    return response.text;
  } catch (error) {
    console.error("===== ERRO GEMINI =====");
    console.error(error);

    if (error.message) {
      console.error("Mensagem:", error.message);
    }

    if (error.response) {
      console.error("Response:", error.response);
    }

    throw error;
  }
}