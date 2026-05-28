import Anthropic from "@anthropic-ai/sdk";
import { apiError, rateLimitedResponse } from "@/lib/api";

const SYSTEM_PROMPT = `You are a professional property assistant for a South African real estate agency. 
Your name is "VXA Property Assistant".

Your job is to:
1. Greet the lead warmly
2. Understand what they're looking for (area, bedrooms, budget, timeline)
3. Qualify them gently (are they buying or renting? cash or bond?)
4. Offer to book a viewing or connect them with an agent
5. Always respond in a friendly, professional tone — like a knowledgeable estate agent, not a robot

Rules:
- Keep responses concise (2–4 sentences max)
- Use South African context (mention areas like Cape Town, Johannesburg, Sea Point, Sandton, etc.)
- Reference prices in ZAR (Rands)
- If asked about a specific property, say you'll check availability and get back to them
- Always end with a question to keep the conversation moving
- Never break character

This is a DEMO on the VXA website. The lead is exploring what AI automation looks like 
for their agency. Keep it realistic and impressive.`;

export async function POST(request: Request) {
  const limited = rateLimitedResponse(request);
  if (limited) return limited;

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return apiError("AI service is not configured.", 503);
  }

  try {
    const { messages } = await request.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return apiError("Invalid request.", 400);
    }

    const anthropic = new Anthropic({ apiKey });

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content,
      })),
    });

    const textBlock = response.content.find((block) => block.type === "text");
    const message =
      textBlock && textBlock.type === "text"
        ? textBlock.text
        : "I'd be happy to help you find the right property. What area are you interested in?";

    return Response.json({ message });
  } catch {
    return apiError("Something went wrong. Try again in a moment.");
  }
}
