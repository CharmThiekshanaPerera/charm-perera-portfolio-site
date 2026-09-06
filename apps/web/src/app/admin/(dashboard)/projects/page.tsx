import Link from "next/link";
import { ExternalLink, Pencil, Plus } from "lucide-react";
import { Project, connectToDatabase, serialize, type ProjectDoc } from "@charm/db";
import { Badge } from "@charm/ui/badge";
import { Button } from "@charm/ui/button";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteProject } from "../../actions";

export const dynamic = "force-dynamic";

async function getAllProjects(): Promise<ProjectDoc[]> {
  try {
    await connectToDatabase();
    // Admin list shows drafts too, unlike the public query.
    const docs = await Project.find().sort({ order: 1, createdAt: -1 }).lean<ProjectDoc[]>();
    return serialize(docs);
  } catch {
    return [];
  }
}

export default async function AdminProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">Projects</h1>
          <p className="mt-1 text-muted-foreground">
            {projects.length} project{projects.length === 1 ? "" : "s"}
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/projects/new">
            <Plus className="h-4 w-4" aria-hidden="true" />
            New project
          </Link>
        </Button>
      </header>

      {projects.length === 0 ? (
        <p className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">
          No projects yet. Create your first one, or run <code>npm run seed</code> to import
          your existing content.
        </p>
      ) : (
        <ul className="space-y-3">
          {projects.map((project) => (
            <li
              key={String(project._id)}
              className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-card p-4"
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold">{project.title}</p>
                  {project.featured ? <Badge variant="soft">Featured</Badge> : null}
                  {!project.published ? <Badge variant="secondary">Draft</Badge> : null}
                </div>
                <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                  /projects/{project.slug}
                </p>
              </div>

              <div className="flex items-center gap-1">
                {project.published ? (
                  <Button asChild variant="ghost" size="icon" aria-label="View on site">
                    <a
                      href={`/projects/${project.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                ) : null}
                <Button asChild variant="ghost" size="icon" aria-label="Edit">
                  <Link href={`/admin/projects/${String(project._id)}`}>
                    <Pencil className="h-4 w-4" />
                  </Link>
                </Button>
                <DeleteButton
                  id={String(project._id)}
                  label={project.title}
                  action={deleteProject}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
