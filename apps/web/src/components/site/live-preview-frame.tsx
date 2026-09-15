"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@charm/ui/cn";

/** Reference "desktop" viewport the iframe renders at before being scaled
 *  down to fit whatever width the card actually has. */
const REFERENCE_WIDTH = 1280;
const REFERENCE_HEIGHT = 800;

/** Safety net for a load that never fires at all (e.g. the connection just
 *  hangs) — the real filtering happens server-side, see below. */
const LOAD_TIMEOUT_MS = 8000;

/**
 * A small, always-live preview of a real site, scaled to fit its container.
 *
 * A `ResizeObserver` measures the container's actual rendered width and
 * recomputes the scale on every resize/breakpoint change — genuinely
 * responsive, no hardcoded media queries.
 *
 * Callers are expected to have already checked `checkFrameable()`
 * (lib/live-preview.ts) server-side before rendering this at all — that's
 * the actually-reliable way to know a site allows being framed. A
 * client-side check *after* the iframe loads was tried and doesn't work:
 * tested directly against a real X-Frame-Options: sameorigin response,
 * Chromium throws the exact same cross-origin SecurityError for a
 * genuinely blocked frame as it does for a real successful load, so the two
 * can't be told apart that way. The timeout here is only a last-resort net
 * for a load that never fires at all.
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
  // Holds the pending "never loaded" timeout so onLoad can actually cancel
  // it. A previous version scheduled this timeout once and never cleared it
  // on success, so every preview — including ones that loaded perfectly
  // fine — silently vanished ~8s after appearing. This ref is what makes
  // cancellation possible: state alone can't reach into an already-running
  // setTimeout closure.
  const timeoutRef = useRef<number | null>(null);
  const [scale, setScale] = useState(0);
  const [timedOut, setTimedOut] = useState(false);

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

  useEffect(() => {
    if (scale <= 0) return;

    timeoutRef.current = window.setTimeout(() => setTimedOut(true), LOAD_TIMEOUT_MS);
    return () => {
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    };
  }, [scale]);

  function handleLoad() {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }

  if (timedOut) return null;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10",
        className,
      )}
    >
      {scale > 0 ? (
        <>
          <iframe
            src={url}
            title={`${title} — live preview`}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
            referrerPolicy="no-referrer"
            tabIndex={-1}
            aria-hidden="true"
            onLoad={handleLoad}
            className="pointer-events-none absolute left-0 top-0 origin-top-left border-0"
            style={{
              width: REFERENCE_WIDTH,
              height: REFERENCE_HEIGHT,
              transform: `scale(${scale})`,
            }}
          />
          {/* A slight dim reads as deliberate styling rather than an accident. */}
          <div className="pointer-events-none absolute inset-0 bg-black/25" aria-hidden="true" />
        </>
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
