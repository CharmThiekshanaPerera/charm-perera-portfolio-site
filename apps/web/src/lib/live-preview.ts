import { cache } from "react";

/**
 * Hosts known to always refuse to be embedded in an iframe (they send
 * X-Frame-Options / CSP frame-ancestors that block it). Filtering these out
 * up front avoids showing a guaranteed-blank preview for the app-store links
 * every mobile project uses as its "live" URL.
 */
const UNEMBEDDABLE_HOSTS = new Set([
  "play.google.com",
  "apps.apple.com",
  "facebook.com",
  "www.facebook.com",
  "instagram.com",
  "www.instagram.com",
  "linkedin.com",
  "www.linkedin.com",
  "twitter.com",
  "www.twitter.com",
  "x.com",
  "www.x.com",
]);

/** This site's own domain: one of the seeded projects *is* this portfolio,
 * with its own URL as the "live" link. Embedding it is fine on the project's
 * own case-study page (a single level — the embedded homepage's project grid
 * still refuses to embed itself, see `allowSelf` below), but MUST stay
 * excluded on the home page / project grid: that grid embedding itself would
 * embed its own grid again inside the embed, and again inside that, with no
 * natural stopping point. */
const SELF_HOSTS = new Set(["charmthiekshana.com", "www.charmthiekshana.com"]);

/** Best-effort check — there's no reliable client-side way to know a site
 * blocks framing until you actually try, so this only filters the known
 * worst offenders. Everything else gets attempted as a live preview.
 *
 * `allowSelf` opts a specific call site into embedding this site's own
 * domain — only safe where the embedded page can't itself recurse (i.e. NOT
 * the project grid; see the comment on SELF_HOSTS above). Defaults to false. */
export function isLikelyEmbeddable(url: string, { allowSelf = false } = {}): boolean {
  try {
    const hostname = new URL(url).hostname.toLowerCase();
    if (UNEMBEDDABLE_HOSTS.has(hostname)) return false;
    if (!allowSelf && SELF_HOSTS.has(hostname)) return false;
    return true;
  } catch {
    return false;
  }
}

/** True for project categories whose `coverImage` is a square app icon
 * (from a Play/App Store listing) rather than a landscape website
 * screenshot — those need `object-contain` on a padded backdrop instead of
 * `object-cover`, or they render as a distorted, oversized crop. */
export function isAppIcon(category: string): boolean {
  return category.toLowerCase().includes("mobile");
}

/**
 * Server-side, header-based check for whether a site actually allows being
 * framed — the only fully reliable way to know. A client-side check (inspect
 * the iframe after it loads) turns out NOT to work: tested directly against
 * a real X-Frame-Options: sameorigin response, Chromium throws the exact
 * same cross-origin SecurityError for a genuinely blocked frame as it does
 * for a real successful load, so the two cases can't be told apart that way.
 *
 * This runs server-side instead, before the iframe is ever rendered: fetch
 * the URL and read its own X-Frame-Options / CSP frame-ancestors headers
 * directly. Retries once on a network-level failure (timeout, refused
 * connection) before giving up — this result gets baked into the page for
 * up to an hour (ISR), so one unlucky transient blip during a single
 * revalidation shouldn't be able to hide an otherwise-fine preview for that
 * whole window. A failure that persists through the retry is treated the
 * same as "blocked" — either way there's nothing to preview. Call sites
 * should cache/memoize this per request; it does a real network round-trip.
 */
export const checkFrameable = cache(async (url: string): Promise<boolean> => {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const response = await fetch(url, {
        redirect: "follow",
        signal: controller.signal,
        headers: {
          // A realistic browser UA, not a self-identifying bot string — the
          // point is to see exactly what a real visitor's browser would see
          // when it tries to load this in an iframe. An obvious bot UA risks
          // a different (and possibly inconsistent) response from a WAF.
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
      }).finally(() => clearTimeout(timeoutId));

      const xFrameOptions = response.headers.get("x-frame-options")?.toLowerCase().trim();
      if (xFrameOptions === "deny" || xFrameOptions === "sameorigin") return false;

      const csp = response.headers.get("content-security-policy")?.toLowerCase();
      const frameAncestors = csp?.match(/frame-ancestors\s+([^;]+)/)?.[1]?.trim();
      if (frameAncestors) {
        // A wildcard is the only case that's unambiguously fine; anything
        // else ('none', 'self', or a specific allowlist) doesn't include an
        // arbitrary third-party origin like this portfolio.
        if (!frameAncestors.includes("*")) return false;
      }

      return true;
    } catch {
      // Timed out, refused to connect, DNS never resolved, etc. — try once
      // more before concluding there's nothing to preview.
      if (attempt === 0) continue;
      return false;
    }
  }
  return false;
});
