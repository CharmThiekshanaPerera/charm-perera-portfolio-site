import { notFound } from "next/navigation";
import { Project, connectToDatabase, serialize, type ProjectDoc } from "@charm/db";
import { ProjectForm } from "../project-form";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  await connectToDatabase();
  const project = await Project.findById(id).lean<ProjectDoc>().catch(() => null);

  if (!project) notFound();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="font-display text-3xl font-bold">Edit project</h1>
      <ProjectForm project={serialize(project)} />
    </div>
  );
}
