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
