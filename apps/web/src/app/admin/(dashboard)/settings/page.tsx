import { SiteSettings, connectToDatabase, serialize, type SiteSettingsDoc } from "@charm/db";
import { SettingsForm } from "./settings-form";
import { PasswordForm } from "./password-form";

export const dynamic = "force-dynamic";

async function getSettings() {
  try {
    await connectToDatabase();
    const doc = await SiteSettings.findOne({ key: "default" }).lean<SiteSettingsDoc>();
    return doc ? serialize(doc) : null;
  } catch {
    return null;
  }
}

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <header>
        <h1 className="font-display text-3xl font-bold">Site settings</h1>
        <p className="mt-1 text-muted-foreground">
          Identity, contact details, SEO defaults and FAQs. Saving refreshes the public cache
          immediately.
        </p>
      </header>

      {settings ? null : (
        <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          No settings document found. Saving this form will create one, or run{" "}
          <code>npm run seed</code> to import your existing content first.
        </p>
      )}

      <SettingsForm settings={settings ?? {}} />

      <section className="space-y-4 rounded-2xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold">Change password</h2>
        <PasswordForm />
      </section>
    </div>
  );
}
