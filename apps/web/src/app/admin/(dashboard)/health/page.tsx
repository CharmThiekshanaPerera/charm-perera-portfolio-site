import { LinkHealthPanel } from "@/components/admin/link-health-panel";

export const dynamic = "force-dynamic";

export default function AdminHealthPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-bold">Link Health</h1>
        <p className="mt-1 text-muted-foreground">
          Checks every project&apos;s Live URL and cover image, and every post&apos;s cover
          image, for dead links and broken images — the same problems we&apos;ve found and
          fixed by hand before, now one click away.
        </p>
      </header>

      <LinkHealthPanel />
    </div>
  );
}
