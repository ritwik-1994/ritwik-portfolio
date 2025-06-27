import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  const { value, opinion } = await req.json();

  const prompt = `A portfolio visitor shared this opinion about "${value}": "${opinion}". Respond as a thoughtful, world-class product leader. Your reply should be short, smart, and fit in a chat bubble (max 240 characters).`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a concise, thoughtful product mentor.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 80,
    });
    const response = completion.choices[0].message.content?.trim();
    return NextResponse.json({ response });
  } catch (err) {
    return NextResponse.json({ response: "Thanks for sharing! (AI response not available right now.)" });
  }
}
