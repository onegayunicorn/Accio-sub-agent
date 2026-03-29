import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function chatWithAccio(prompt: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are an AI assistant for the Accio B2B sourcing platform. Help the user with sourcing, supplier discovery, and product comparison. Prompt: ${prompt}`,
    });
    return response.text || "No response generated.";
  } catch (error) {
    console.error("Error chatting with Accio AI:", error);
    return "Error communicating with the Accio AI service.";
  }
}
