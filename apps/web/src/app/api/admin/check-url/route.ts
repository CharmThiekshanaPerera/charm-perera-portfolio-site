import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { probeUrl } from "@/lib/live-preview";

// Uses Node's fetch with a real timeout; no Mongoose needed here, but keep
// this off the Edge runtime for consistency with the rest of the admin API.
export const runtime = "nodejs";

/** Backs the inline "Test" button next to Live URL / Cover image fields. */
export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ ok: false, message: "Not signed in." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  const { url, kind } = (body ?? {}) as { url?: string; kind?: string };
  if (!url || (kind !== "image" && kind !== "frame")) {
    return NextResponse.json({ ok: false, message: "Missing url or kind." }, { status: 400 });
  }

  const result = await probeUrl(url, kind);
  return NextResponse.json(result);
}
