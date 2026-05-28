const rateLimitMap = new Map<string, number>();

export function checkRateLimit(ip: string, windowMs = 2000): boolean {
  const now = Date.now();
  const lastRequest = rateLimitMap.get(ip);

  if (lastRequest && now - lastRequest < windowMs) {
    return false;
  }

  rateLimitMap.set(ip, now);

  if (rateLimitMap.size > 10000) {
    const cutoff = now - 60000;
    rateLimitMap.forEach((time, key) => {
      if (time < cutoff) rateLimitMap.delete(key);
    });
  }

  return true;
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}
