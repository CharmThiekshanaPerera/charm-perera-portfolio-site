import "server-only";

/**
 * Best-effort in-memory rate limiter for unauthenticated endpoints.
 *
 * Serverless instances do not share memory, so this is a speed bump rather than
 * a guarantee — it stops naive floods hitting a single warm instance. The
 * durable protections are elsewhere: a honeypot field on the contact form, and
 * database-backed lockout counters on admin login.
 *
 * If abuse becomes a real problem, swap this for Upstash Redis or Vercel KV
 * without changing any call sites.
 */
type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): { allowed: boolean; remaining: number; retryAfterSeconds: number } {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, retryAfterSeconds: 0 };
  }

  bucket.count += 1;

  if (bucket.count > limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000),
    };
  }

  // Opportunistic cleanup so the map cannot grow without bound on a long-lived
  // instance.
  if (buckets.size > 5000) {
    for (const [existingKey, existingBucket] of buckets) {
      if (now > existingBucket.resetAt) buckets.delete(existingKey);
    }
  }

  return { allowed: true, remaining: limit - bucket.count, retryAfterSeconds: 0 };
}

/** Derives a client identifier from proxy headers, falling back to a shared bucket. */
export function clientKey(headers: Headers, prefix: string): string {
  const forwarded = headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0]!.trim() : headers.get("x-real-ip") || "unknown";
  return `${prefix}:${ip}`;
}
