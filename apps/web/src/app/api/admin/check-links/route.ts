import { NextResponse } from "next/server";
import { Post, Project, connectToDatabase, type PostDoc, type ProjectDoc } from "@charm/db";
import { getSession } from "@/lib/auth";
import { probeUrl } from "@/lib/live-preview";

export const runtime = "nodejs";

type CheckItem = {
  kind: "project" | "post";
  title: string;
  editHref: string;
  field: "liveUrl" | "coverImage";
  url: string;
};

type CheckResult = CheckItem & { ok: boolean; message: string };

/** Runs `fn` over `items` with at most `limit` in flight at once — a plain
 *  Promise.all across everything risks tripping target sites' own rate
 *  limiting/WAFs, and running fully sequential would take far too long for
 *  ~20+ projects each needing up to two checks. */
async function mapWithConcurrency<T, R>(
  items: T[],
  limit: number,
  fn: (item: T) => Promise<R>,
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let cursor = 0;

  async function worker() {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await fn(items[index]!);
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

/**
 * Bulk link-health check across every project and post — the batch version
 * of the same probeUrl() the inline "Test" button uses. User-triggered only
 * (the Link Health admin page has a button for this); never runs on a public
 * page render or automatically on a schedule.
 */
export async function POST() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ ok: false, message: "Not signed in." }, { status: 401 });
  }

  await connectToDatabase();
  const [projects, posts] = await Promise.all([
    Project.find()
      .select("title slug liveUrl coverImage")
      .lean<Pick<ProjectDoc, "_id" | "title" | "slug" | "liveUrl" | "coverImage">[]>(),
    Post.find()
      .select("title slug coverImage")
      .lean<Pick<PostDoc, "_id" | "title" | "slug" | "coverImage">[]>(),
  ]);

  const items: CheckItem[] = [];

  for (const project of projects) {
    if (project.liveUrl) {
      items.push({
        kind: "project",
        title: project.title,
        editHref: `/admin/projects/${String(project._id)}`,
        field: "liveUrl",
        url: project.liveUrl,
      });
    }
    if (project.coverImage) {
      items.push({
        kind: "project",
        title: project.title,
        editHref: `/admin/projects/${String(project._id)}`,
        field: "coverImage",
        url: project.coverImage,
      });
    }
  }

  for (const post of posts) {
    if (post.coverImage) {
      items.push({
        kind: "post",
        title: post.title,
        editHref: `/admin/posts/${String(post._id)}`,
        field: "coverImage",
        url: post.coverImage,
      });
    }
  }

  const results: CheckResult[] = await mapWithConcurrency(items, 6, async (item) => {
    const probeKind = item.field === "coverImage" ? "image" : "frame";
    const { ok, message } = await probeUrl(item.url, probeKind);
    return { ...item, ok, message };
  });

  return NextResponse.json({ results });
}
