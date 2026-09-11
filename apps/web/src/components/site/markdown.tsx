import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@charm/ui/cn";

/**
 * Renders article and case-study bodies (and, at the "sm" size, chatbot
 * answers) — the full prose is present in the HTML response for anything
 * server-rendered, which is the entire point of moving the blog off a
 * client-side modal.
 */
export function Markdown({
  children,
  size = "lg",
}: {
  children: string;
  /** "sm" is a compact variant for tight spaces like chat bubbles. */
  size?: "sm" | "lg";
}) {
  if (!children?.trim()) return null;

  return (
    <div
      className={cn(
        "prose max-w-none dark:prose-invert prose-headings:font-display prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-code:rounded prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:before:content-none prose-code:after:content-none prose-pre:border prose-pre:border-border prose-pre:bg-muted prose-img:rounded-xl",
        size === "sm"
          ? "prose-sm prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0 prose-headings:my-1.5"
          : "prose-lg",
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // External links open in a new tab and do not pass ranking signals.
          a: ({ href, children: linkChildren, ...props }) => {
            const isExternal = Boolean(href && /^https?:\/\//.test(href));
            return (
              <a
                href={href}
                {...(isExternal
                  ? { target: "_blank", rel: "noopener noreferrer nofollow" }
                  : {})}
                {...props}
              >
                {linkChildren}
              </a>
            );
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
