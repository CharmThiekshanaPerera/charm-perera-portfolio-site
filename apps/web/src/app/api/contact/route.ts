import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { Message, connectToDatabase, contactSchema } from "@charm/db";
import { clientKey, rateLimit } from "@/lib/rate-limit";

// Mongoose requires the Node runtime.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Hash the IP rather than storing it: enough for abuse triage, no raw PII at rest. */
function hashIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0]!.trim() : headers.get("x-real-ip") || "unknown";
  return createHash("sha256").update(ip).digest("hex").slice(0, 32);
}

async function sendNotificationEmail(payload: {
  name: string;
  email: string;
  subject: string;
  message: string;
  interestedIn: string;
  kind: string;
  company: string;
  projectType: string;
  timeline: string;
  currentUrl: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_NOTIFY_EMAIL;
  if (!apiKey || !to) return;

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio <onboarding@resend.dev>",
        to: [to],
        // Replying goes straight to the enquirer rather than to the sender address.
        reply_to: payload.email,
        subject: payload.subject
          ? `Portfolio enquiry: ${payload.subject}`
          : payload.kind === "project"
            ? `New project inquiry from ${payload.name}`
            : `New portfolio enquiry from ${payload.name}`,
        text: [
          `Name: ${payload.name}`,
          `Email: ${payload.email}`,
          payload.company ? `Company: ${payload.company}` : "",
          payload.projectType ? `Project type: ${payload.projectType}` : "",
          payload.timeline ? `Timeline: ${payload.timeline}` : "",
          payload.currentUrl ? `Current site: ${payload.currentUrl}` : "",
          payload.interestedIn ? `Interested in: ${payload.interestedIn}` : "",
          "",
          payload.message,
        ]
          .filter(Boolean)
          .join("\n"),
      }),
    });
  } catch (error) {
    // A failed notification must never lose the message — it is already stored.
    console.error("[contact] notification email failed:", error);
  }
}

export async function POST(request: Request) {
  // 5 submissions per 10 minutes per IP.
  const limit = rateLimit(clientKey(request.headers, "contact"), 5, 10 * 60 * 1000);
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many messages. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string" && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields.", fieldErrors },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Honeypot tripped: respond as success so bots get no signal, but store nothing.
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  try {
    await connectToDatabase();
    await Message.create({
      kind: data.kind,
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      budget: data.budget,
      interestedIn: data.interestedIn,
      company: data.company,
      projectType: data.projectType,
      timeline: data.timeline,
      currentUrl: data.currentUrl,
      status: "unread",
      ipHash: hashIp(request.headers),
      userAgent: request.headers.get("user-agent")?.slice(0, 300) || "",
      referrer: request.headers.get("referer")?.slice(0, 300) || "",
    });
  } catch (error) {
    console.error("[contact] failed to store message:", error);
    return NextResponse.json(
      { ok: false, error: "Could not send your message. Please email me directly." },
      { status: 500 },
    );
  }

  await sendNotificationEmail({
    name: data.name,
    email: data.email,
    subject: data.subject,
    message: data.message,
    interestedIn: data.interestedIn,
    kind: data.kind,
    company: data.company,
    projectType: data.projectType,
    timeline: data.timeline,
    currentUrl: data.currentUrl,
  });

  return NextResponse.json({ ok: true });
}
