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
  // This site's own domain: one of the seeded projects *is* this portfolio,
  // with its own URL as the "live" link. Embedding it would nest the site
  // inside itself, which nests its own Featured Projects section inside
  // itself again, and so on — a self-referential recursion with no natural
  // stopping point.
  "charmthiekshana.com",
  "www.charmthiekshana.com",
]);

/** Best-effort check — there's no reliable client-side way to know a site
 * blocks framing until you actually try, so this only filters the known
 * worst offenders. Everything else gets attempted as a live preview. */
export function isLikelyEmbeddable(url: string): boolean {
  try {
    return !UNEMBEDDABLE_HOSTS.has(new URL(url).hostname.toLowerCase());
  } catch {
    return false;
  }
}
