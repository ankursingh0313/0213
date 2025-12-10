import { GoogleGenAI } from "@google/genai";
import { NextResponse } from 'next/server';

const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export async function POST(req: Request) {
  if (!apiKey) {
    return NextResponse.json({ error: "API Key not configured" }, { status: 500 });
  }

  try {
    const { topic } = await req.json();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a short, technical blog post (approx 200 words) about: "${topic}". Use markdown formatting. Focus on a developer audience.`,
    });
    return NextResponse.json({ text: response.text });
  } catch (error) {
    console.error("Gemini Blog Error:", error);
    return NextResponse.json({ error: "Failed to generate content" }, { status: 500 });
  }
}
