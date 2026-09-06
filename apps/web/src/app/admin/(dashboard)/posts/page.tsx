import Link from "next/link";
import { ExternalLink, Pencil, Plus } from "lucide-react";
import { Post, connectToDatabase, serialize, type PostDoc } from "@charm/db";
import { Badge } from "@charm/ui/badge";
import { Button } from "@charm/ui/button";
import { DeleteButton } from "@/components/admin/delete-button";
import { deletePost } from "../../actions";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

async function getAllPosts(): Promise<PostDoc[]> {
  try {
    await connectToDatabase();
    const docs = await Post.find().sort({ publishedAt: -1 }).lean<PostDoc[]>();
    return serialize(docs);
  } catch {
    return [];
  }
}

export default async function AdminPostsPage() {
  const posts = await getAllPosts();

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">Blog posts</h1>
          <p className="mt-1 text-muted-foreground">
            {posts.length} post{posts.length === 1 ? "" : "s"}
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/posts/new">
            <Plus className="h-4 w-4" aria-hidden="true" />
            New post
          </Link>
        </Button>
      </header>

      {posts.length === 0 ? (
        <p className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">
          No posts yet.
        </p>
      ) : (
        <ul className="space-y-3">
          {posts.map((post) => (
            <li
              key={String(post._id)}
              className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-card p-4"
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold">{post.title}</p>
                  <Badge variant="soft">{post.category}</Badge>
                  {!post.published ? <Badge variant="secondary">Draft</Badge> : null}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {formatDate(post.publishedAt as unknown as string)} · {post.readTimeMinutes} min
                  read
                </p>
              </div>

              <div className="flex items-center gap-1">
                {post.published ? (
                  <Button asChild variant="ghost" size="icon" aria-label="View on site">
                    <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                ) : null}
                <Button asChild variant="ghost" size="icon" aria-label="Edit">
                  <Link href={`/admin/posts/${String(post._id)}`}>
                    <Pencil className="h-4 w-4" />
                  </Link>
                </Button>
                <DeleteButton id={String(post._id)} label={post.title} action={deletePost} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
