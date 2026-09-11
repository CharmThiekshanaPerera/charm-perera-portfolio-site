"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";
import { Button } from "@charm/ui/button";

const CONSENT_KEY = "charm-cookie-consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function updateConsent(granted: boolean) {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer?.push(arguments);
    };
  window.gtag("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
  });
}

/**
 * Shown once per browser until a choice is made. Purely additive to Consent
 * Mode's default (set earlier by ConsentDefaultScript) — this only ever
 * upgrades analytics_storage to "granted", or confirms "denied".
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(CONSENT_KEY)) setVisible(true);
    } catch {
      // No storage access (private mode, etc.) — skip the banner rather than
      // show it on every single page load with no way to persist a choice.
    }
  }, []);

  function choose(granted: boolean) {
    try {
      window.localStorage.setItem(CONSENT_KEY, granted ? "granted" : "denied");
    } catch {
      // Best-effort only; the choice still applies for this page view.
    }
    updateConsent(granted);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie notice"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-xl rounded-2xl border border-border bg-card p-5 shadow-elegant sm:inset-x-auto sm:right-6"
    >
      <div className="flex gap-3">
        <Cookie className="h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
        <div className="space-y-3">
          <p className="text-sm leading-relaxed text-foreground/90">
            This site uses cookies for analytics to understand how visitors use it. See the{" "}
            <Link href="/privacy" className="underline hover:text-primary">
              Privacy Policy
            </Link>{" "}
            for details.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="sm" onClick={() => choose(true)}>
              Accept
            </Button>
            <Button size="sm" variant="outline" onClick={() => choose(false)}>
              Decline
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
