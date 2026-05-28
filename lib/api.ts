import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export const RATE_LIMIT_MS = 2000;

export function rateLimitedResponse(request: Request, windowMs = RATE_LIMIT_MS) {
  const ip = getClientIp(request);
  if (!checkRateLimit(ip, windowMs)) {
    return NextResponse.json(
      { error: "Please wait a moment before trying again." },
      { status: 429 }
    );
  }
  return null;
}

export function apiError(message: string, status = 500) {
  return NextResponse.json({ error: message }, { status });
}

export function apiSuccess<T extends Record<string, unknown>>(data: T) {
  return NextResponse.json(data);
}
