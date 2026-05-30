import { Resend } from "resend";
import { apiError, apiSuccess, rateLimitedResponse } from "@/lib/api";

const REQUIRED_FIELDS = [
  "agency_name",
  "contact_name",
  "whatsapp",
  "agents",
  "leads_per_week",
] as const;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmailHtml(data: {
  agency_name: string;
  contact_name: string;
  whatsapp: string;
  agents: string;
  leads_per_week: string;
  challenges: string[];
}): string {
  const challengeItems = data.challenges
    .map((c) => `<li>${escapeHtml(c)}</li>`)
    .join("");

  return `
    <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.5; max-width: 640px;">
      <h2 style="margin: 0 0 16px;">New Agency Audit Request</h2>
      <p style="margin: 0 0 20px;">A new contact form submission was received from the VXA website.</p>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px 0; font-weight: 600;">Agency name</td><td style="padding: 8px 0;">${escapeHtml(data.agency_name)}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 600;">Contact name</td><td style="padding: 8px 0;">${escapeHtml(data.contact_name)}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 600;">WhatsApp</td><td style="padding: 8px 0;">${escapeHtml(data.whatsapp)}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 600;">Agents</td><td style="padding: 8px 0;">${escapeHtml(data.agents)}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 600;">Leads per week</td><td style="padding: 8px 0;">${escapeHtml(data.leads_per_week)}</td></tr>
      </table>
      <h3 style="margin: 24px 0 8px;">Challenges</h3>
      <ul style="margin: 0; padding-left: 20px;">${challengeItems}</ul>
    </div>
  `.trim();
}

export async function POST(request: Request) {
  const limited = rateLimitedResponse(request);
  if (limited) return limited;

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return apiError("Contact service is not configured.", 503);
  }

  // Free Resend accounts with onboarding@resend.dev can only deliver to the
  // account owner's email until a domain is verified. Override via RESEND_TO_EMAIL.
  const fromEmail =
    process.env.RESEND_FROM_EMAIL?.trim() || "onboarding@resend.dev";
  const replyToEmail =
    process.env.RESEND_REPLY_TO_EMAIL?.trim() || "contacto@vxaagency.com";

  try {
    const body = await request.json();

    for (const key of REQUIRED_FIELDS) {
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
      challenges: challenges.map((c: unknown) => String(c).trim()).filter(Boolean),
    };

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: ["roccodagesilao@gmail.com"],
      replyTo: replyToEmail,
      subject: `New Agency Audit Request – ${payload.agency_name}`,
      html: buildEmailHtml(payload),
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return apiError(error.message || "Failed to send email.", 500);
    }

    return apiSuccess({ success: true });
  } catch (err) {
    console.error("[contact] catch error:", err);
    if (err instanceof Error) {
      console.error("[contact] message:", err.message);
      console.error("[contact] stack:", err.stack);
    } else {
      console.error("[contact] details:", JSON.stringify(err, null, 2));
    }
    const message =
      err instanceof Error ? err.message : "Something went wrong. Try again in a moment.";
    return apiError(message, 500);
  }
}
