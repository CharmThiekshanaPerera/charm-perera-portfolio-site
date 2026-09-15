import { notFound } from "next/navigation";
import { Project, connectToDatabase, serialize, type ProjectDoc } from "@charm/db";
import { getSiteSettings, getSiteUrl } from "@/lib/content";
import { ProjectForm } from "../project-form";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [project, settings] = await Promise.all([
    connectToDatabase().then(() => Project.findById(id).lean<ProjectDoc>().catch(() => null)),
    getSiteSettings(),
  ]);

  if (!project) notFound();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="font-display text-3xl font-bold">Edit project</h1>
      <ProjectForm project={serialize(project)} siteUrl={getSiteUrl(settings)} />
    </div>
  );
}
