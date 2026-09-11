import Link from "next/link";
import { Mail } from "lucide-react";
import { Message, connectToDatabase, serialize, type MessageDoc } from "@charm/db";
import { Badge } from "@charm/ui/badge";
import { Button } from "@charm/ui/button";
import { cn } from "@charm/ui/cn";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteMessage, updateMessageStatus } from "../../actions";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

const STATUSES = ["all", "unread", "read", "replied", "archived"] as const;
type Status = (typeof STATUSES)[number];

async function getMessages(status: Status): Promise<MessageDoc[]> {
  try {
    await connectToDatabase();
    const filter = status === "all" ? {} : { status };
    const docs = await Message.find(filter).sort({ createdAt: -1 }).limit(200).lean<MessageDoc[]>();
    return serialize(docs);
  } catch {
    return [];
  }
}

export default async function AdminMessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const params = await searchParams;
  const status = (STATUSES.includes(params.status as Status) ? params.status : "all") as Status;
  const messages = await getMessages(status);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-bold">Messages</h1>
        <p className="mt-1 text-muted-foreground">
          Enquiries submitted through the contact form.
        </p>
      </header>

      <nav className="flex flex-wrap gap-2" aria-label="Filter by status">
        {STATUSES.map((item) => (
          <Link
            key={item}
            href={item === "all" ? "/admin/messages" : `/admin/messages?status=${item}`}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium capitalize transition-colors",
              status === item
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            {item}
          </Link>
        ))}
      </nav>

      {messages.length === 0 ? (
        <p className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">
          No {status === "all" ? "" : status} messages.
        </p>
      ) : (
        <ul className="space-y-3">
          {messages.map((message) => (
            <li
              key={String(message._id)}
              className={cn(
                "rounded-2xl border bg-card p-6",
                message.status === "unread" ? "border-primary/40" : "border-border",
              )}
            >
              <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">
                    {message.name}{" "}
                    <a
                      href={`mailto:${message.email}`}
                      className="font-normal text-muted-foreground hover:text-primary"
                    >
                      &lt;{message.email}&gt;
                    </a>
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {formatDate(message.createdAt as unknown as string)}
                    {message.interestedIn ? ` · interested in ${message.interestedIn}` : ""}
                  </p>
                </div>
                <div className="flex flex-shrink-0 items-center gap-2">
                  {message.kind === "project" ? (
                    <Badge variant="outline" className="border-primary/40 text-primary">
                      Project inquiry
                    </Badge>
                  ) : null}
                  {message.kind === "chatbot" ? (
                    <Badge variant="outline" className="border-emerald-500/40 text-emerald-600 dark:text-emerald-400">
                      Chatbot lead
                    </Badge>
                  ) : null}
                  <Badge variant={message.status === "unread" ? "default" : "secondary"}>
                    {message.status}
                  </Badge>
                </div>
              </div>

              {message.subject ? (
                <p className="mb-2 font-medium">{message.subject}</p>
              ) : null}

              {message.kind === "project" &&
              (message.company || message.projectType || message.timeline || message.currentUrl) ? (
                <dl className="mb-3 grid grid-cols-2 gap-x-4 gap-y-1 rounded-xl bg-muted/50 p-3 text-xs sm:grid-cols-4">
                  {message.company ? (
                    <div>
                      <dt className="text-muted-foreground">Company</dt>
                      <dd className="font-medium">{message.company}</dd>
                    </div>
                  ) : null}
                  {message.projectType ? (
                    <div>
                      <dt className="text-muted-foreground">Project type</dt>
                      <dd className="font-medium">{message.projectType}</dd>
                    </div>
                  ) : null}
                  {message.timeline ? (
                    <div>
                      <dt className="text-muted-foreground">Timeline</dt>
                      <dd className="font-medium">{message.timeline}</dd>
                    </div>
                  ) : null}
                  {message.currentUrl ? (
                    <div>
                      <dt className="text-muted-foreground">Current site</dt>
                      <dd className="truncate font-medium">
                        <a
                          href={message.currentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary"
                        >
                          {message.currentUrl}
                        </a>
                      </dd>
                    </div>
                  ) : null}
                </dl>
              ) : null}

              <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
                {message.message}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-border pt-4">
                <Button asChild variant="outline" size="sm">
                  <a
                    href={`mailto:${message.email}?subject=${encodeURIComponent(
                      message.subject ? `Re: ${message.subject}` : "Re: your enquiry",
                    )}`}
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    Reply
                  </a>
                </Button>

                {(["read", "replied", "archived"] as const)
                  .filter((next) => next !== message.status)
                  .map((next) => (
                    <form key={next} action={updateMessageStatus}>
                      <input type="hidden" name="id" value={String(message._id)} />
                      <input type="hidden" name="status" value={next} />
                      <Button type="submit" variant="ghost" size="sm" className="capitalize">
                        Mark {next}
                      </Button>
                    </form>
                  ))}

                <div className="ml-auto">
                  <DeleteButton
                    id={String(message._id)}
                    label={`message from ${message.name}`}
                    action={deleteMessage}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
