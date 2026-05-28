import { apiError, apiSuccess, rateLimitedResponse } from "@/lib/api";

const MAKE_PAYLOAD_KEYS = [
  "agency_name",
  "contact_name",
  "whatsapp",
  "agents",
  "leads_per_week",
] as const;

export async function POST(request: Request) {
  const limited = rateLimitedResponse(request);
  if (limited) return limited;

  const webhookUrl = process.env.MAKE_WEBHOOK_URL;
  if (!webhookUrl) {
    return apiError("Contact service is not configured.", 503);
  }

  try {
    const body = await request.json();

    for (const key of MAKE_PAYLOAD_KEYS) {
      if (!body[key] || String(body[key]).trim() === "") {
        return apiError("Please fill in all required fields.", 400);
      }
    }

    const challenges = Array.isArray(body.challenges) ? body.challenges : [];
    if (challenges.length === 0) {
      return apiError("Please select at least one challenge.", 400);
    }

    const payload = {
      agency_name: String(body.agency_name).trim(),
      contact_name: String(body.contact_name).trim(),
      whatsapp: String(body.whatsapp).trim(),
      agents: String(body.agents).trim(),
      leads_per_week: String(body.leads_per_week).trim(),
      challenges,
      timestamp: new Date().toISOString(),
    };

    const webhookRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!webhookRes.ok) {
      throw new Error("Webhook failed");
    }

    return apiSuccess({ success: true });
  } catch {
    return apiError("Something went wrong. Try again in a moment.");
  }
}
