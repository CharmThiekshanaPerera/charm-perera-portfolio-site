import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Manual cache purge.
 *
 * Accepts either a signed-in admin session or a bearer token matching
 * REVALIDATE_SECRET, so it can also be triggered from a deploy hook or script.
 * The admin panel revalidates automatically on save; this is the escape hatch.
 */
export async function POST(request: Request) {
  const session = await getSession();

  const secret = process.env.REVALIDATE_SECRET;
  const authHeader = request.headers.get("authorization");
  const hasValidSecret =
    Boolean(secret) && authHeader === `Bearer ${secret}`;

  if (!session && !hasValidSecret) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let path: string | undefined;
  try {
    const body = (await request.json()) as { path?: string };
    path = body.path;
  } catch {
    // No body means "purge everything".
  }

  if (path) {
    revalidatePath(path);
    return NextResponse.json({ ok: true, revalidated: [path] });
  }

  const paths = ["/", "/about", "/projects", "/services", "/blog", "/contact"];
  for (const item of paths) revalidatePath(item);
  revalidatePath("/projects/[slug]", "page");
  revalidatePath("/blog/[slug]", "page");

  return NextResponse.json({ ok: true, revalidated: paths });
}
