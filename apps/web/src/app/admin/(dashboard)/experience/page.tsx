import { Plus } from "lucide-react";
import { Experience, connectToDatabase, serialize, type ExperienceDoc } from "@charm/db";
import { Badge } from "@charm/ui/badge";
import { DeleteButton } from "@/components/admin/delete-button";
import { ResourceForm, type FieldSpec } from "@/components/admin/resource-form";
import { deleteExperience, saveExperience } from "../../actions";

export const dynamic = "force-dynamic";

const FIELDS: FieldSpec[] = [
  { name: "role", label: "Role", required: true, half: true },
  { name: "company", label: "Company", required: true, half: true },
  { name: "companyUrl", label: "Company URL", type: "url", half: true },
  { name: "location", label: "Location", half: true },
  {
    name: "period",
    label: "Period (display text)",
    hint: "e.g. July 2024 - Present",
    half: true,
  },
  { name: "startDate", label: "Start date", type: "date", half: true },
  { name: "endDate", label: "End date", type: "date", half: true },
  { name: "order", label: "Sort order", type: "number", half: true },
  {
    name: "responsibilities",
    label: "Responsibilities",
    type: "textarea",
    rows: 8,
    hint: "One bullet per line.",
  },
  { name: "current", label: "Current role" },
  { name: "published", label: "Published" },
];

async function getExperiences(): Promise<ExperienceDoc[]> {
  try {
    await connectToDatabase();
    const docs = await Experience.find().sort({ order: 1 }).lean<ExperienceDoc[]>();
    return serialize(docs);
  } catch {
    return [];
  }
}

export default async function AdminExperiencePage() {
  const experiences = await getExperiences();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-bold">Experience</h1>
        <p className="mt-1 text-muted-foreground">
          Your work history, shown on the home page and /about.
        </p>
      </header>

      <details className="rounded-2xl border border-border bg-card p-6">
        <summary className="flex cursor-pointer items-center gap-2 font-semibold">
          <Plus className="h-4 w-4 text-primary" aria-hidden="true" />
          Add role
        </summary>
        <div className="mt-6">
          <ResourceForm
            action={saveExperience}
            fields={FIELDS}
            values={{ published: true, order: experiences.length }}
            submitLabel="Create role"
          />
        </div>
      </details>

      <ul className="space-y-3">
        {experiences.map((experience) => (
          <li key={String(experience._id)} className="rounded-2xl border border-border bg-card">
            <details>
              <summary className="flex cursor-pointer flex-wrap items-center gap-3 p-4">
                <span className="font-semibold">{experience.role}</span>
                <span className="text-sm text-muted-foreground">{experience.company}</span>
                {experience.current ? <Badge variant="soft">Current</Badge> : null}
                {!experience.published ? <Badge variant="secondary">Hidden</Badge> : null}
              </summary>

              <div className="space-y-6 border-t border-border p-6">
                <ResourceForm
                  action={saveExperience}
                  fields={FIELDS}
                  values={experience as unknown as Record<string, unknown>}
                  id={String(experience._id)}
                  submitLabel="Save changes"
                />
                <div className="flex justify-end border-t border-border pt-4">
                  <DeleteButton
                    id={String(experience._id)}
                    label={`${experience.role} at ${experience.company}`}
                    action={deleteExperience}
                  />
                </div>
              </div>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
}
