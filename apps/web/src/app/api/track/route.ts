import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { PageView, connectToDatabase } from "@charm/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Crawlers, previewers and uptime checks are not visits. */
const BOT_PATTERN =
  /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|whatsapp|telegram|discord|slack|preview|lighthouse|pagespeed|headless|monitor|pingdom|uptime|curl|wget|python-requests|axios|node-fetch/i;

function classifyDevice(ua: string): "mobile" | "tablet" | "desktop" {
  if (/ipad|tablet|playbook|silk|(android(?!.*mobile))/i.test(ua)) return "tablet";
  if (/mobi|iphone|ipod|android|blackberry|iemobile|opera mini/i.test(ua)) return "mobile";
  return "desktop";
}

/** Order matters: Edge and Chrome both claim "Chrome", Safari appears in both. */
function classifyBrowser(ua: string): string {
  if (/edg\//i.test(ua)) return "Edge";
  if (/opr\/|opera/i.test(ua)) return "Opera";
  if (/samsungbrowser/i.test(ua)) return "Samsung Internet";
  if (/firefox|fxios/i.test(ua)) return "Firefox";
  if (/chrome|crios/i.test(ua)) return "Chrome";
  if (/safari/i.test(ua)) return "Safari";
  return "Other";
}

/** Reduce a referrer to its host so we never store a full third-party URL. */
function normaliseReferrer(raw: string, selfHost: string): string {
  if (!raw) return "direct";
  try {
    const host = new URL(raw).hostname.replace(/^www\./, "");
    if (!host || host === selfHost.replace(/^www\./, "")) return "direct";
    return host;
  } catch {
    return "direct";
  }
}

export async function POST(request: Request) {
  const userAgent = request.headers.get("user-agent") || "";
  if (!userAgent || BOT_PATTERN.test(userAgent)) {
    return NextResponse.json({ ok: true, skipped: "bot" });
  }

  let body: { path?: string; referrer?: string };
  try {
    body = (await request.json()) as { path?: string; referrer?: string };
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Strip query and hash: only the route itself is stored.
  const rawPath = String(body.path || "/").split("?")[0]!.split("#")[0]!;
  const path = rawPath.startsWith("/") ? rawPath.slice(0, 200) : "/";

  // The admin panel is not part of site traffic.
  if (path.startsWith("/admin") || path.startsWith("/api")) {
    return NextResponse.json({ ok: true, skipped: "internal" });
  }

  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0]!.trim() : "unknown";
  const day = new Date().toISOString().slice(0, 10);

  // Salting with the day means the hash cannot link a visitor across days.
  const visitorHash = createHash("sha256")
    .update(`${ip}|${userAgent}|${day}|${process.env.AUTH_SECRET || "salt"}`)
    .digest("hex")
    .slice(0, 32);

  try {
    await connectToDatabase();
    await PageView.create({
      path,
      referrer: normaliseReferrer(
        String(body.referrer || ""),
        new URL(request.url).hostname,
      ),
      country: request.headers.get("x-vercel-ip-country") || "",
      device: classifyDevice(userAgent),
      browser: classifyBrowser(userAgent),
      visitorHash,
      day,
    });
  } catch (error) {
    // Analytics must never break a page view for the visitor.
    console.error("[track] failed to record page view:", error);
  }

  return NextResponse.json({ ok: true });
}
