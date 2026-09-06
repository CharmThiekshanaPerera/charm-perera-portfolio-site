"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Records a page view on first load and on every client-side navigation.
 *
 * Fire-and-forget: `keepalive` lets the request survive the page unloading, and
 * every failure is swallowed. Analytics should never be able to affect what a
 * visitor sees.
 */
export function PageViewTracker() {
  const pathname = usePathname();
  const lastSent = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname) return;
    // React 18 StrictMode double-invokes effects in development; this also
    // guards against a re-render firing a duplicate for the same route.
    if (lastSent.current === pathname) return;
    lastSent.current = pathname;

    const payload = JSON.stringify({ path: pathname, referrer: document.referrer });

    void fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    }).catch(() => {});
  }, [pathname]);

  return null;
}
