import { PostForm } from "../post-form";

export const dynamic = "force-dynamic";

export default function NewPostPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="font-display text-3xl font-bold">New post</h1>
      <PostForm />
    </div>
  );
}
