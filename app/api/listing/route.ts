import Anthropic from "@anthropic-ai/sdk";
import { apiError, rateLimitedResponse } from "@/lib/api";

function buildPrompt(data: {
  propertyType: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  price: string;
  features: string;
  highlights: string;
}) {
  return `You are a professional South African real estate copywriter. 
Generate three distinct pieces of content for the following property:

Property Type: ${data.propertyType}
Bedrooms: ${data.bedrooms}
Bathrooms: ${data.bathrooms}
Location: ${data.area}
Price: ${data.price}
Key Features: ${data.features}
Additional Highlights: ${data.highlights || "None"}

Generate exactly this JSON structure:
{
  "property24": {
    "title": "compelling listing title (max 10 words)",
    "description": "full professional listing description (3-4 paragraphs, 200-300 words, highlight lifestyle, features, and location benefits)"
  },
  "instagram": {
    "caption": "engaging Instagram caption with emojis (150-200 words)",
    "hashtags": "10-15 relevant hashtags as a single string"
  },
  "whatsapp": {
    "message": "short conversational broadcast message (50-80 words, friendly tone)"
  }
}

Use South African context. Reference local lifestyle (e.g., mountain views, beachside living, security estates). Prices in Rands. Tone: professional but warm.
Return ONLY the JSON object, no extra text.`;
}

function parseListingJson(text: string) {
  const cleaned = text.replace(/```json\n?|\n?```/g, "").trim();
  return JSON.parse(cleaned);
}

export async function POST(request: Request) {
  const limited = rateLimitedResponse(request);
  if (limited) return limited;

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return apiError("AI service is not configured.", 503);
  }

  try {
    const body = await request.json();

    if (!body.area || !body.price || !body.features) {
      return apiError("Please fill in all required fields.", 400);
    }

    const anthropic = new Anthropic({ apiKey });

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2048,
      messages: [
        {
          role: "user",
          content: buildPrompt({
            propertyType: body.propertyType ?? "House",
            bedrooms: body.bedrooms ?? "3",
            bathrooms: body.bathrooms ?? "2",
            area: body.area,
            price: body.price,
            features: body.features,
            highlights: body.highlights ?? "",
          }),
        },
      ],
    });

    const textBlock = response.content.find((block) => block.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      throw new Error("No text response");
    }

    const parsed = parseListingJson(textBlock.text);
    return Response.json(parsed);
  } catch {
    return apiError("Something went wrong. Try again in a moment.");
  }
}
