import { Plus } from "lucide-react";
import {
  AddOn,
  ServicePackage,
  connectToDatabase,
  serialize,
  type AddOnDoc,
  type ServicePackageDoc,
} from "@charm/db";
import { Badge } from "@charm/ui/badge";
import { DeleteButton } from "@/components/admin/delete-button";
import { ResourceForm, type FieldSpec } from "@/components/admin/resource-form";
import { ICON_NAMES } from "@/lib/icons";
import { GRADIENT_NAMES } from "@/lib/gradients";
import { deleteAddOn, deletePackage, saveAddOn, savePackage } from "../../actions";

export const dynamic = "force-dynamic";

const PACKAGE_FIELDS: FieldSpec[] = [
  { name: "name", label: "Package name", required: true, half: true },
  { name: "slug", label: "Slug", required: true, hint: "Used in /services#slug", half: true },
  { name: "price", label: "Display price", required: true, hint: "e.g. $2,499", half: true },
  {
    name: "priceValue",
    label: "Numeric price",
    type: "number",
    hint: "Used in Offer structured data.",
    half: true,
  },
  { name: "currency", label: "Currency", half: true },
  { name: "period", label: "Period", hint: "e.g. one-time", half: true },
  { name: "deliveryTime", label: "Delivery time", hint: "e.g. 3-4 weeks", half: true },
  {
    name: "icon",
    label: "Icon",
    hint: `One of: ${ICON_NAMES.join(", ")}`,
    half: true,
  },
  {
    name: "gradient",
    label: "Icon gradient",
    hint: `One of: ${GRADIENT_NAMES.join(", ")}`,
    half: true,
  },
  { name: "description", label: "Description", type: "textarea", rows: 3 },
  {
    name: "features",
    label: "Features",
    type: "textarea",
    rows: 10,
    hint: "One feature per line.",
  },
  { name: "order", label: "Sort order", type: "number", half: true },
  { name: "highlighted", label: "Highlight as most popular" },
  { name: "published", label: "Published" },
];

const ADDON_FIELDS: FieldSpec[] = [
  { name: "title", label: "Title", required: true, half: true },
  { name: "price", label: "Price", required: true, hint: "e.g. $499", half: true },
  { name: "description", label: "Description", type: "textarea", rows: 2 },
  { name: "order", label: "Sort order", type: "number", half: true },
  { name: "published", label: "Published" },
];

async function getData() {
  try {
    await connectToDatabase();
    const [packages, addOns] = await Promise.all([
      ServicePackage.find().sort({ order: 1 }).lean<ServicePackageDoc[]>(),
      AddOn.find().sort({ order: 1 }).lean<AddOnDoc[]>(),
    ]);
    return { packages: serialize(packages), addOns: serialize(addOns) };
  } catch {
    return { packages: [] as ServicePackageDoc[], addOns: [] as AddOnDoc[] };
  }
}

export default async function AdminPackagesPage() {
  const { packages, addOns } = await getData();

  return (
    <div className="space-y-10">
      <header>
        <h1 className="font-display text-3xl font-bold">Packages &amp; add-ons</h1>
        <p className="mt-1 text-muted-foreground">
          Pricing shown on the home page and /services. Changes go live immediately.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Packages</h2>

        <details className="rounded-2xl border border-border bg-card p-6">
          <summary className="flex cursor-pointer items-center gap-2 font-semibold">
            <Plus className="h-4 w-4 text-primary" aria-hidden="true" />
            Add package
          </summary>
          <div className="mt-6">
            <ResourceForm
              action={savePackage}
              fields={PACKAGE_FIELDS}
              values={{
                currency: "USD",
                period: "one-time",
                icon: "Sparkles",
                gradient: "gold",
                published: true,
                order: packages.length,
              }}
              submitLabel="Create package"
            />
          </div>
        </details>

        <ul className="space-y-3">
          {packages.map((pkg) => (
            <li key={String(pkg._id)} className="rounded-2xl border border-border bg-card">
              <details>
                <summary className="flex cursor-pointer flex-wrap items-center gap-3 p-4">
                  <span className="font-semibold">{pkg.name}</span>
                  <span className="text-sm text-muted-foreground">{pkg.price}</span>
                  {pkg.highlighted ? <Badge variant="soft">Most popular</Badge> : null}
                  {!pkg.published ? <Badge variant="secondary">Hidden</Badge> : null}
                </summary>

                <div className="space-y-6 border-t border-border p-6">
                  <ResourceForm
                    action={savePackage}
                    fields={PACKAGE_FIELDS}
                    values={pkg as unknown as Record<string, unknown>}
                    id={String(pkg._id)}
                    submitLabel="Save changes"
                  />
                  <div className="flex justify-end border-t border-border pt-4">
                    <DeleteButton
                      id={String(pkg._id)}
                      label={pkg.name}
                      action={deletePackage}
                    />
                  </div>
                </div>
              </details>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Add-ons</h2>

        <details className="rounded-2xl border border-border bg-card p-6">
          <summary className="flex cursor-pointer items-center gap-2 font-semibold">
            <Plus className="h-4 w-4 text-primary" aria-hidden="true" />
            Add add-on
          </summary>
          <div className="mt-6">
            <ResourceForm
              action={saveAddOn}
              fields={ADDON_FIELDS}
              values={{ published: true, order: addOns.length }}
              submitLabel="Create add-on"
            />
          </div>
        </details>

        <ul className="space-y-3">
          {addOns.map((addon) => (
            <li key={String(addon._id)} className="rounded-2xl border border-border bg-card">
              <details>
                <summary className="flex cursor-pointer flex-wrap items-center gap-3 p-4">
                  <span className="font-semibold">{addon.title}</span>
                  <span className="text-sm text-muted-foreground">{addon.price}</span>
                  {!addon.published ? <Badge variant="secondary">Hidden</Badge> : null}
                </summary>

                <div className="space-y-6 border-t border-border p-6">
                  <ResourceForm
                    action={saveAddOn}
                    fields={ADDON_FIELDS}
                    values={addon as unknown as Record<string, unknown>}
                    id={String(addon._id)}
                    submitLabel="Save changes"
                  />
                  <div className="flex justify-end border-t border-border pt-4">
                    <DeleteButton
                      id={String(addon._id)}
                      label={addon.title}
                      action={deleteAddOn}
                    />
                  </div>
                </div>
              </details>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
