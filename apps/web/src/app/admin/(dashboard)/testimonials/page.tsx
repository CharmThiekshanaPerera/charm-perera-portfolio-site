import { Plus } from "lucide-react";
import { Testimonial, connectToDatabase, serialize, type TestimonialDoc } from "@charm/db";
import { Badge } from "@charm/ui/badge";
import { DeleteButton } from "@/components/admin/delete-button";
import { ResourceForm, type FieldSpec } from "@/components/admin/resource-form";
import { deleteTestimonial, saveTestimonial } from "../../actions";

export const dynamic = "force-dynamic";

const FIELDS: FieldSpec[] = [
  { name: "name", label: "Client name", required: true, half: true },
  { name: "role", label: "Role", half: true },
  { name: "company", label: "Company", half: true },
  { name: "website", label: "Website", type: "url", half: true },
  { name: "content", label: "Testimonial", type: "textarea", rows: 5, required: true },
  { name: "avatar", label: "Initials", hint: "Two letters, e.g. SJ", half: true },
  { name: "rating", label: "Rating (1-5)", type: "number", half: true },
  { name: "order", label: "Sort order", type: "number", half: true },
  {
    name: "verified",
    label: "Verified for review markup",
    hint: "Only enable for testimonials you can evidence. Verified entries are published as Review structured data; marking up unverifiable reviews breaches Google policy.",
  },
  { name: "published", label: "Published" },
];

async function getTestimonials(): Promise<TestimonialDoc[]> {
  try {
    await connectToDatabase();
    const docs = await Testimonial.find().sort({ order: 1 }).lean<TestimonialDoc[]>();
    return serialize(docs);
  } catch {
    return [];
  }
}

export default async function AdminTestimonialsPage() {
  const testimonials = await getTestimonials();
  const verifiedCount = testimonials.filter((item) => item.verified).length;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-bold">Testimonials</h1>
        <p className="mt-1 text-muted-foreground">
          {testimonials.length} total · {verifiedCount} verified for review markup
        </p>
      </header>

      <p className="rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
        Testimonials always render on the page. Only ones marked{" "}
        <strong className="text-foreground">verified</strong> are emitted as Review structured
        data, because Google requires review snippets to be genuine and verifiable.
      </p>

      <details className="rounded-2xl border border-border bg-card p-6">
        <summary className="flex cursor-pointer items-center gap-2 font-semibold">
          <Plus className="h-4 w-4 text-primary" aria-hidden="true" />
          Add testimonial
        </summary>
        <div className="mt-6">
          <ResourceForm
            action={saveTestimonial}
            fields={FIELDS}
            values={{ rating: 5, published: true, order: testimonials.length }}
            submitLabel="Create testimonial"
          />
        </div>
      </details>

      <ul className="space-y-3">
        {testimonials.map((testimonial) => (
          <li key={String(testimonial._id)} className="rounded-2xl border border-border bg-card">
            <details>
              <summary className="flex cursor-pointer flex-wrap items-center gap-3 p-4">
                <span className="font-semibold">{testimonial.name}</span>
                {testimonial.company ? (
                  <span className="text-sm text-muted-foreground">{testimonial.company}</span>
                ) : null}
                {testimonial.verified ? <Badge variant="soft">Verified</Badge> : null}
                {!testimonial.published ? <Badge variant="secondary">Hidden</Badge> : null}
              </summary>

              <div className="space-y-6 border-t border-border p-6">
                <ResourceForm
                  action={saveTestimonial}
                  fields={FIELDS}
                  values={testimonial as unknown as Record<string, unknown>}
                  id={String(testimonial._id)}
                  submitLabel="Save changes"
                />
                <div className="flex justify-end border-t border-border pt-4">
                  <DeleteButton
                    id={String(testimonial._id)}
                    label={testimonial.name}
                    action={deleteTestimonial}
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
