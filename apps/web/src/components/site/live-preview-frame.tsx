"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@charm/ui/cn";

/** Reference "desktop" viewport the iframe renders at before being scaled
 *  down to fit whatever width the card actually has. */
const REFERENCE_WIDTH = 1280;
const REFERENCE_HEIGHT = 800;

/**
 * A small, always-live preview of a real site, scaled to fit its container.
 *
 * A `ResizeObserver` measures the container's actual rendered width and
 * recomputes the scale on every resize/breakpoint change — genuinely
 * responsive, no hardcoded media queries. The gradient background is the
 * fallback for the (undetectable, client-side) case where the target site
 * refuses to be framed and the iframe renders blank.
 */
export function LivePreviewFrame({
  url,
  title,
  className,
  /** When the card itself is a link (project-card.tsx), the destination.
   *  `pointer-events: none` on the iframe is not reliably respected for
   *  cross-origin hit-testing in Chromium — clicks over it can get silently
   *  swallowed instead of passing through to the card's overlay link. A
   *  real (non-iframe) click-catcher on top sidesteps that entirely, rather
   *  than depending on pass-through. Omit this prop for a non-link context
   *  (the case-study hero banner, which isn't itself a link to anywhere). */
  href,
}: {
  url: string;
  title: string;
  className?: string;
  href?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? 0;
      if (width > 0) setScale(width / REFERENCE_WIDTH);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10",
        className,
      )}
    >
      {scale > 0 ? (
        <iframe
          src={url}
          title={`${title} — live preview`}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin"
          referrerPolicy="no-referrer"
          tabIndex={-1}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 origin-top-left border-0"
          style={{
            width: REFERENCE_WIDTH,
            height: REFERENCE_HEIGHT,
            transform: `scale(${scale})`,
          }}
        />
      ) : null}
      {href ? (
        <Link
          href={href}
          aria-hidden="true"
          tabIndex={-1}
          className="absolute inset-0 z-[1]"
        />
      ) : null}
    </div>
  );
}
