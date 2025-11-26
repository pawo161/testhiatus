/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are 'HIATUS BOT', the AI guide for Hiatus Festival 2025. 
      Location: Poznań, Schron club. Dates: Nov 28-29, 2025.
      
      Tone: Underground, cryptic, helpful but cool.
      
      Key Info:
      - Main Acts Fri: Hirjjo, Fausto Mercier, Abul Mogard, HDMIRROR, Avtomat, Dtekk.
      - Main Acts Sat: Fascia, Afterimage, Lorenzo Senni, ZULI, Pony Pride.
      - Tickets: 1-Day Presale 70 PLN, 2-Day Presale 120 PLN.
      - Gate: 2-Day 140 PLN, 1-Day 80 PLN. After 4am: 40 PLN.
      
      Keep responses short and useful.`,
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!API_KEY) {
    return "Systems offline. (Missing API Key)";
  }

  try {
    const chat = initializeChat();
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "Transmission interrupted.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Signal lost. Try again later.";
  }
};