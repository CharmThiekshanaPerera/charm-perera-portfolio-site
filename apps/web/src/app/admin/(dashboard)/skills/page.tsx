import { Plus } from "lucide-react";
import { SkillCategory, connectToDatabase, serialize, type SkillCategoryDoc } from "@charm/db";
import { Badge } from "@charm/ui/badge";
import { DeleteButton } from "@/components/admin/delete-button";
import { ResourceForm, type FieldSpec } from "@/components/admin/resource-form";
import { ICON_NAMES } from "@/lib/icons";
import { deleteSkillCategory, saveSkillCategory } from "../../actions";

export const dynamic = "force-dynamic";

const FIELDS: FieldSpec[] = [
  { name: "title", label: "Category title", required: true, half: true },
  {
    name: "icon",
    label: "Icon",
    hint: `One of: ${ICON_NAMES.join(", ")}`,
    half: true,
  },
  {
    name: "skills",
    label: "Skills",
    type: "textarea",
    rows: 8,
    hint: "One skill per line.",
  },
  { name: "order", label: "Sort order", type: "number", half: true },
  { name: "published", label: "Published" },
];

async function getCategories(): Promise<SkillCategoryDoc[]> {
  try {
    await connectToDatabase();
    const docs = await SkillCategory.find().sort({ order: 1 }).lean<SkillCategoryDoc[]>();
    return serialize(docs);
  } catch {
    return [];
  }
}

export default async function AdminSkillsPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-bold">Skills</h1>
        <p className="mt-1 text-muted-foreground">
          Skill categories shown on the home page and /about. The flat technology list lives in
          Site settings.
        </p>
      </header>

      <details className="rounded-2xl border border-border bg-card p-6">
        <summary className="flex cursor-pointer items-center gap-2 font-semibold">
          <Plus className="h-4 w-4 text-primary" aria-hidden="true" />
          Add category
        </summary>
        <div className="mt-6">
          <ResourceForm
            action={saveSkillCategory}
            fields={FIELDS}
            values={{ icon: "Code2", published: true, order: categories.length }}
            submitLabel="Create category"
          />
        </div>
      </details>

      <ul className="space-y-3">
        {categories.map((category) => (
          <li key={String(category._id)} className="rounded-2xl border border-border bg-card">
            <details>
              <summary className="flex cursor-pointer flex-wrap items-center gap-3 p-4">
                <span className="font-semibold">{category.title}</span>
                <span className="text-sm text-muted-foreground">
                  {category.skills?.length ?? 0} skills
                </span>
                {!category.published ? <Badge variant="secondary">Hidden</Badge> : null}
              </summary>

              <div className="space-y-6 border-t border-border p-6">
                <ResourceForm
                  action={saveSkillCategory}
                  fields={FIELDS}
                  values={category as unknown as Record<string, unknown>}
                  id={String(category._id)}
                  submitLabel="Save changes"
                />
                <div className="flex justify-end border-t border-border pt-4">
                  <DeleteButton
                    id={String(category._id)}
                    label={category.title}
                    action={deleteSkillCategory}
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
