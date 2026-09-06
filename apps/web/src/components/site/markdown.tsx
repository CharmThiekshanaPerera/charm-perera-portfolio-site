import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Renders article and case-study bodies.
 *
 * Runs on the server, so the full prose is present in the HTML response —
 * which is the entire point of moving the blog off a client-side modal.
 */
export function Markdown({ children }: { children: string }) {
  if (!children?.trim()) return null;

  return (
    <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-display prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-code:rounded prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:before:content-none prose-code:after:content-none prose-pre:border prose-pre:border-border prose-pre:bg-muted prose-img:rounded-xl">
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
