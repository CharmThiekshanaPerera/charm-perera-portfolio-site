import Link from "next/link";
import {
  Briefcase,
  FileText,
  FolderKanban,
  Inbox,
  MessageSquareQuote,
  Sparkles,
} from "lucide-react";
import {
  Experience,
  Message,
  Post,
  Project,
  ServicePackage,
  Testimonial,
  connectToDatabase,
  serialize,
  type MessageDoc,
} from "@charm/db";
import { Button } from "@charm/ui/button";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

async function getStats() {
  try {
    await connectToDatabase();
    const [projects, drafts, posts, testimonials, packages, experiences, unread, recent] =
      await Promise.all([
        Project.countDocuments({ published: true }),
        Project.countDocuments({ published: false }),
        Post.countDocuments({ published: true }),
        Testimonial.countDocuments({ published: true }),
        ServicePackage.countDocuments({ published: true }),
        Experience.countDocuments({ published: true }),
        Message.countDocuments({ status: "unread" }),
        Message.find().sort({ createdAt: -1 }).limit(5).lean<MessageDoc[]>(),
      ]);

    return {
      projects,
      drafts,
      posts,
      testimonials,
      packages,
      experiences,
      unread,
      recent: serialize(recent),
      error: null as string | null,
    };
  } catch (error) {
    return {
      projects: 0,
      drafts: 0,
      posts: 0,
      testimonials: 0,
      packages: 0,
      experiences: 0,
      unread: 0,
      recent: [] as MessageDoc[],
      error: error instanceof Error ? error.message : "Could not reach the database.",
    };
  }
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const cards = [
    { label: "Published projects", value: stats.projects, href: "/admin/projects", icon: FolderKanban },
    { label: "Blog posts", value: stats.posts, href: "/admin/posts", icon: FileText },
    { label: "Testimonials", value: stats.testimonials, href: "/admin/testimonials", icon: MessageSquareQuote },
    { label: "Packages", value: stats.packages, href: "/admin/packages", icon: Sparkles },
    { label: "Roles listed", value: stats.experiences, href: "/admin/experience", icon: Briefcase },
    { label: "Unread messages", value: stats.unread, href: "/admin/messages", icon: Inbox },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-3xl font-bold">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Manage the content that appears on charmperera.com.
        </p>
      </header>

      {stats.error ? (
        <p
          role="alert"
          className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          Database unavailable: {stats.error}
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ label, value, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-gold"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{label}</span>
              <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <p className="text-3xl font-bold">{value}</p>
          </Link>
        ))}
      </div>

      {stats.drafts > 0 ? (
        <p className="rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
          You have {stats.drafts} unpublished project{stats.drafts === 1 ? "" : "s"}.
        </p>
      ) : null}

      <section className="rounded-2xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border p-6">
          <h2 className="text-lg font-semibold">Recent messages</h2>
          <Button asChild variant="outline" size="sm">
            <Link href="/admin/messages">View all</Link>
          </Button>
        </div>

        {stats.recent.length === 0 ? (
          <p className="p-6 text-sm text-muted-foreground">No messages yet.</p>
        ) : (
          <ul className="divide-y divide-border">
            {stats.recent.map((message) => (
              <li key={String(message._id)} className="flex items-start gap-4 p-6">
                <span
                  className={`mt-1.5 h-2 w-2 flex-shrink-0 rounded-full ${
                    message.status === "unread" ? "bg-primary" : "bg-muted-foreground/40"
                  }`}
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-medium">
                    {message.name}{" "}
                    <span className="font-normal text-muted-foreground">
                      &lt;{message.email}&gt;
                    </span>
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                    {message.message}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {formatDate(message.createdAt as unknown as string)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
