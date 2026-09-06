"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { ProjectDoc } from "@charm/db";
import { Button } from "@charm/ui/button";
import {
  FormError,
  SubmitButton,
  SwitchField,
  TextAreaField,
  TextField,
  TitleSlugFields,
} from "@/components/admin/form-fields";
import { saveProject, type ActionState } from "../../actions";

function toDateInput(value: unknown): string {
  if (!value) return "";
  const date = new Date(value as string);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
}

export function ProjectForm({ project }: { project?: ProjectDoc }) {
  const [state, formAction] = useActionState<ActionState, FormData>(saveProject, {});
  const errors = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="space-y-8">
      {project ? <input type="hidden" name="id" value={String(project._id)} /> : null}

      <FormError message={state.error} />

      <section className="space-y-4 rounded-2xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold">Basics</h2>

        <TitleSlugFields
          defaultTitle={project?.title ?? ""}
          defaultSlug={project?.slug ?? ""}
          errors={errors}
          slugPrefix="/projects"
        />

        <TextAreaField
          name="description"
          label="Short description"
          required
          rows={3}
          defaultValue={project?.description ?? ""}
          error={errors.description}
          hint="Shown on project cards and used as the fallback meta description."
        />

        <div className="grid gap-4 md:grid-cols-3">
          <TextField
            name="category"
            label="Category"
            defaultValue={project?.category ?? "Web"}
            hint="Web, Mobile, AI…"
          />
          <TextField name="client" label="Client" defaultValue={project?.client ?? ""} />
          <TextField
            name="completedAt"
            label="Completed"
            type="date"
            defaultValue={toDateInput(project?.completedAt)}
          />
        </div>

        <TextField
          name="technologies"
          label="Technologies"
          defaultValue={project?.technologies?.join(", ") ?? ""}
          hint="Comma separated, e.g. React, Node.js, MongoDB"
        />
      </section>

      <section className="space-y-4 rounded-2xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold">Links &amp; media</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <TextField
            name="liveUrl"
            label="Live URL"
            type="url"
            defaultValue={project?.liveUrl ?? ""}
            error={errors.liveUrl}
            hint="Leave empty if there is no working public link."
          />
          <TextField
            name="repoUrl"
            label="Repository URL"
            type="url"
            defaultValue={project?.repoUrl ?? ""}
            error={errors.repoUrl}
          />
        </div>

        <TextField
          name="coverImage"
          label="Cover image URL"
          type="url"
          defaultValue={project?.coverImage ?? ""}
          error={errors.coverImage}
          hint="Must be on an allowed host (see images.remotePatterns in next.config.mjs)."
        />
      </section>

      <section className="space-y-4 rounded-2xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold">Case study</h2>

        <TextAreaField
          name="fullDescription"
          label="Summary"
          rows={4}
          defaultValue={project?.fullDescription ?? ""}
          hint="Optional. Used when there is no full Markdown body."
        />

        <TextAreaField
          name="body"
          label="Body (Markdown)"
          rows={18}
          mono
          defaultValue={project?.body ?? ""}
          hint="Supports Markdown: ## headings, **bold**, lists, links and code blocks. This is the content search engines index."
        />
      </section>

      <section className="space-y-4 rounded-2xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold">SEO</h2>

        <TextField
          name="seoTitle"
          label="Meta title"
          defaultValue={project?.seoTitle ?? ""}
          error={errors.seoTitle}
          hint="Up to 70 characters. Falls back to the project title."
        />
        <TextAreaField
          name="seoDescription"
          label="Meta description"
          rows={2}
          defaultValue={project?.seoDescription ?? ""}
          error={errors.seoDescription}
          hint="Up to 160 characters. Falls back to the short description."
        />
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <SwitchField
          name="published"
          label="Published"
          hint="Unpublished projects are hidden from the site and the sitemap."
          defaultChecked={project ? project.published : true}
        />
        <SwitchField
          name="featured"
          label="Featured"
          hint="Featured projects appear on the home page in a wide card."
          defaultChecked={project?.featured ?? false}
        />
        <TextField
          name="order"
          label="Sort order"
          type="number"
          defaultValue={project?.order ?? 0}
          hint="Lower numbers appear first."
        />
      </section>

      <div className="flex flex-wrap gap-3">
        <SubmitButton>{project ? "Save changes" : "Create project"}</SubmitButton>
        <Button asChild variant="outline" size="lg">
          <Link href="/admin/projects">Cancel</Link>
        </Button>
      </div>
    </form>
  );
}
