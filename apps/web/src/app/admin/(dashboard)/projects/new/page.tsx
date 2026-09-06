import { ProjectForm } from "../project-form";

export const dynamic = "force-dynamic";

export default function NewProjectPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="font-display text-3xl font-bold">New project</h1>
      <ProjectForm />
    </div>
  );
}
