import { GoogleGenAI } from "@google/genai";
import { NextResponse } from 'next/server';

const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `You are an AI assistant for a Full Stack Developer's portfolio. 
The developer is a "Geek General" with expertise in Blockchain, Web3, React, Node.js, and more.
Experience:
- uCertify (Dec 2019-Dec 2020): Web Developer (HTML, CSS, JS, PHP, React, MySQL)
- Naygon Technology (Jan 2022-Jan 2023): Lead Developer (HTML, CSS, JS, Node, React, Web3, Blockchain, MongoDB, Next, Socket.io, Redis). Created crypto exchanges (DEX, CEX, Hyper) and blockchain networks.
Projects: Crypto Exchange, Online Exam System, School Management, One Wallet, Online Games.

Answer questions about the developer's skills, experience, and projects in a technical, geeky, yet professional tone. be concise.
`;

export async function POST(req: Request) {
  if (!apiKey) {
    return NextResponse.json({ error: "API Key not configured" }, { status: 500 });
  }

  try {
    const { message, history } = await req.json();
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history || []
    });

    const result = await chat.sendMessage({ message });
    return NextResponse.json({ text: result.text });
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return NextResponse.json({ error: "System malfunction" }, { status: 500 });
  }
}
