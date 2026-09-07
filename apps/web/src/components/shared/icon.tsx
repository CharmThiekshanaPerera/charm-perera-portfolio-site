import { cn } from "@charm/ui/cn";

/**
 * Sprite for the icons that repeat inside lists.
 *
 * Most Lucide icons appear once or twice per page and are best left as normal
 * components. A handful sit inside repeated markup - a check per package
 * feature, a tag per post tag, a quote per testimonial - and were emitting the
 * same path data dozens of times. Measured on the home page: 282 <path>
 * elements, only 57 distinct, 13.3KB of duplicated path data.
 *
 * The geometry below is copied verbatim from the Lucide output it replaces, so
 * the icons render identically. `<symbol>` inherits the stroke presentation
 * attributes from the sprite root, and `currentColor` still resolves against
 * the element that references it.
 *
 * Note this does not reduce DOM nodes - `<svg><use/></svg>` is the same two
 * nodes as `<svg><path/></svg>`. The win is purely bytes.
 */
const SYMBOLS = {
  check: <path d="M20 6 9 17l-5-5" />,
  tag: (
    <>
      <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
      <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
    </>
  ),
  "external-link": (
    <>
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </>
  ),
  quote: (
    <>
      <path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
      <path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
    </>
  ),
  "arrow-right": (
    <>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </>
  ),
  "arrow-up-right": (
    <>
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </>
  ),
  calendar: (
    <>
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </>
  ),
} as const;

export type IconName = keyof typeof SYMBOLS;

/**
 * Rendered once, near the top of the body. Hidden from layout and from
 * assistive technology; it only supplies geometry for <use> references.
 */
export function IconSprite() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <defs>
        {Object.entries(SYMBOLS).map(([name, shape]) => (
          <symbol
            key={name}
            id={`i-${name}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {shape}
          </symbol>
        ))}
      </defs>
    </svg>
  );
}

/**
 * Drop-in replacement for a Lucide icon inside repeated markup.
 *
 * Decorative by default. Pass a `label` when the icon is the only thing
 * conveying meaning, which promotes it to an image with an accessible name.
 */
export function Icon({
  name,
  className,
  label,
}: {
  name: IconName;
  className?: string;
  label?: string;
}) {
  return (
    <svg
      className={cn("shrink-0", className)}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      {label ? <title>{label}</title> : null}
      <use href={`#i-${name}`} />
    </svg>
  );
}
