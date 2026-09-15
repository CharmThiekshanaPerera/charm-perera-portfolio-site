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

export type UrlProbeKind = "image" | "frame";
export type UrlProbeResult = { ok: boolean; message: string };

/**
 * Admin-panel diagnostic check — the "Test this link" button on the project
 * form, and the bulk Link Health page, both call this. Same underlying idea
 * as checkFrameable() above but returns a human-readable reason instead of
 * a boolean, and additionally validates that an image URL actually serves
 * an image (Content-Type) — the exact failure mode behind two real bugs
 * found this session: a Google Images thumbnail used as a cover image, and
 * a client's own /logo.png silently serving an HTML error page instead of a
 * PNG. Deliberately not cached/memoized — this runs only when a human
 * explicitly asks for it, not on every page render.
 */
export async function probeUrl(url: string, kind: UrlProbeKind): Promise<UrlProbeResult> {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return { ok: false, message: "Not a valid URL." };
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return { ok: false, message: "Must be an http(s) URL." };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    }).finally(() => clearTimeout(timeoutId));

    if (!response.ok) {
      return { ok: false, message: `Returned ${response.status} — this link doesn't work.` };
    }

    if (kind === "image") {
      const contentType = response.headers.get("content-type") ?? "";
      if (!contentType.startsWith("image/")) {
        return {
          ok: false,
          message: `Loads, but isn't actually an image (got "${contentType || "unknown content type"}"). This will show as a broken image on the live site.`,
        };
      }
      return { ok: true, message: `Loads correctly as an image (${contentType}).` };
    }

    const xFrameOptions = response.headers.get("x-frame-options")?.toLowerCase().trim();
    if (xFrameOptions === "deny" || xFrameOptions === "sameorigin") {
      return {
        ok: false,
        message:
          "Reachable, but this site blocks embedding (X-Frame-Options) — no live preview will show. That's the site's own choice, not a bug here.",
      };
    }

    const csp = response.headers.get("content-security-policy")?.toLowerCase();
    const frameAncestors = csp?.match(/frame-ancestors\s+([^;]+)/)?.[1]?.trim();
    if (frameAncestors && !frameAncestors.includes("*")) {
      return {
        ok: false,
        message:
          "Reachable, but this site's Content-Security-Policy blocks embedding — no live preview will show.",
      };
    }

    return { ok: true, message: "Reachable and allows embedding — the live preview will work." };
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return { ok: false, message: "Timed out — this link is very slow or unreachable." };
    }
    return {
      ok: false,
      message: "Could not reach this URL at all (DNS failure, connection refused, or similar).",
    };
  }
}
