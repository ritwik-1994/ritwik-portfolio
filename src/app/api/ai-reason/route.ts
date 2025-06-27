import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  const { value } = await req.json();

  // Prompt: You can tune for your flavor!
  const prompt = `Explain why "${value}" truly matters for a world-class product leader. Make it inspiring, poetic, and concise.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a poetic, thoughtful product design leader.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 48,
    });
    const reason = completion.choices[0].message.content?.trim();
    return NextResponse.json({ reason });
  } catch {
    return NextResponse.json({ reason: "Because this truly matters — every day." });
  }
}
