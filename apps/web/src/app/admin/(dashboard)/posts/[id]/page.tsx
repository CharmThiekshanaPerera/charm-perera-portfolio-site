import { notFound } from "next/navigation";
import { Post, connectToDatabase, serialize, type PostDoc } from "@charm/db";
import { PostForm } from "../post-form";

export const dynamic = "force-dynamic";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  await connectToDatabase();
  const post = await Post.findById(id).lean<PostDoc>().catch(() => null);

  if (!post) notFound();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="font-display text-3xl font-bold">Edit post</h1>
      <PostForm post={serialize(post)} />
    </div>
  );
}
