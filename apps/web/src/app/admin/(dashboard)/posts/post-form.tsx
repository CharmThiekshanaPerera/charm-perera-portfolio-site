"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { PostDoc } from "@charm/db";
import { Button } from "@charm/ui/button";
import {
  FormError,
  SubmitButton,
  SwitchField,
  TextAreaField,
  TextField,
  TitleSlugFields,
} from "@/components/admin/form-fields";
import { savePost, type ActionState } from "../../actions";

function toDateInput(value: unknown): string {
  if (!value) return new Date().toISOString().slice(0, 10);
  const date = new Date(value as string);
  return Number.isNaN(date.getTime())
    ? new Date().toISOString().slice(0, 10)
    : date.toISOString().slice(0, 10);
}

export function PostForm({ post }: { post?: PostDoc }) {
  const [state, formAction] = useActionState<ActionState, FormData>(savePost, {});
  const errors = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="space-y-8">
      {post ? <input type="hidden" name="id" value={String(post._id)} /> : null}

      <FormError message={state.error} />

      <section className="space-y-4 rounded-2xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold">Basics</h2>

        <TitleSlugFields
          defaultTitle={post?.title ?? ""}
          defaultSlug={post?.slug ?? ""}
          errors={errors}
          slugPrefix="/blog"
        />

        <TextAreaField
          name="excerpt"
          label="Excerpt"
          required
          rows={3}
          defaultValue={post?.excerpt ?? ""}
          error={errors.excerpt}
          hint="Shown on cards and used as the fallback meta description."
        />

        <div className="grid gap-4 md:grid-cols-3">
          <TextField
            name="category"
            label="Category"
            defaultValue={post?.category ?? "Web Development"}
          />
          <TextField
            name="publishedAt"
            label="Publish date"
            type="date"
            defaultValue={toDateInput(post?.publishedAt)}
          />
          <TextField
            name="readTimeMinutes"
            label="Read time (minutes)"
            type="number"
            defaultValue={post?.readTimeMinutes ?? 5}
          />
        </div>

        <TextField
          name="tags"
          label="Tags"
          defaultValue={post?.tags?.join(", ") ?? ""}
          hint="Comma separated. Tags drive the related-articles links."
        />

        <TextField
          name="coverImage"
          label="Cover image URL"
          type="url"
          defaultValue={post?.coverImage ?? ""}
          error={errors.coverImage}
          hint="1200x630 works best for social sharing."
        />
      </section>

      <section className="space-y-4 rounded-2xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold">Article</h2>

        <TextAreaField
          name="body"
          label="Body (Markdown)"
          rows={24}
          mono
          defaultValue={post?.body ?? ""}
          hint="The full article. Thin or duplicated content ranks poorly, so write real depth here."
        />
      </section>

      <section className="space-y-4 rounded-2xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold">SEO</h2>

        <TextField
          name="seoTitle"
          label="Meta title"
          defaultValue={post?.seoTitle ?? ""}
          error={errors.seoTitle}
          hint="Up to 70 characters."
        />
        <TextAreaField
          name="seoDescription"
          label="Meta description"
          rows={2}
          defaultValue={post?.seoDescription ?? ""}
          error={errors.seoDescription}
          hint="Up to 160 characters."
        />
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <SwitchField
          name="published"
          label="Published"
          hint="Drafts are hidden from the blog, the RSS feed and the sitemap."
          defaultChecked={post ? post.published : true}
        />
        <SwitchField
          name="featured"
          label="Featured"
          defaultChecked={post?.featured ?? false}
        />
      </section>

      <div className="flex flex-wrap gap-3">
        <SubmitButton>{post ? "Save changes" : "Create post"}</SubmitButton>
        <Button asChild variant="outline" size="lg">
          <Link href="/admin/posts">Cancel</Link>
        </Button>
      </div>
    </form>
  );
}
