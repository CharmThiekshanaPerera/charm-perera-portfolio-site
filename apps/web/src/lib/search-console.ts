import "server-only";

import { JWT } from "google-auth-library";

/**
 * Google Search Console (Search Analytics) integration.
 *
 * Authenticated with a service account rather than OAuth, so the admin panel
 * can query it server-to-server with no login flow. The service account has
 * to be added as a "Restricted" user on the property in Search Console
 * (Settings -> Users and permissions) before this can read anything - a
 * clear README section covers that.
 *
 * All functions fail soft: missing credentials or an API error return
 * `{ ok: false, error }` instead of throwing, so a misconfigured integration
 * degrades to a helpful message on /admin/analytics rather than a broken page.
 */

const SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";
const API_BASE = "https://www.googleapis.com/webmasters/v3";

export type GscQueryRow = {
  keys: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

type GscResult<T> = { ok: true; data: T } | { ok: false; error: string };

let cachedClient: JWT | null = null;

function getCredentials(): { email: string; key: string; siteUrl: string } | null {
  const email = process.env.GSC_CLIENT_EMAIL;
  // Service account keys are single-line env vars with literal "\n" — the
  // real newlines get restored here, or JWT signing fails silently.
  const key = process.env.GSC_PRIVATE_KEY?.replace(/\n/g, "\n");
  const siteUrl =
    process.env.GSC_SITE_URL ||
    (process.env.NEXT_PUBLIC_SITE_URL
      ? `${process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")}/`
      : "");

  if (!email || !key || !siteUrl) return null;
  return { email, key, siteUrl };
}

/** Whether the integration is configured at all — used to skip the section entirely. */
export function isSearchConsoleConfigured(): boolean {
  return getCredentials() !== null;
}

function getClient(): JWT | null {
  const creds = getCredentials();
  if (!creds) return null;

  if (!cachedClient) {
    cachedClient = new JWT({ email: creds.email, key: creds.key, scopes: [SCOPE] });
  }
  return cachedClient;
}

/**
 * Runs one Search Analytics query. `dimensions` controls the grouping:
 * `["date"]` for a daily trend, `["query"]` or `["page"]` for ranked lists.
 */
async function query(
  body: Record<string, unknown>,
): Promise<GscResult<GscQueryRow[]>> {
  const creds = getCredentials();
  const client = getClient();
  if (!creds || !client) {
    return { ok: false, error: "Search Console is not configured." };
  }

  try {
    const res = await client.request<{ rows?: GscQueryRow[] }>({
      url: `${API_BASE}/sites/${encodeURIComponent(creds.siteUrl)}/searchAnalytics/query`,
      method: "POST",
      data: body,
    });
    return { ok: true, data: res.data.rows ?? [] };
  } catch (error) {
    // The service-account-not-added-yet case surfaces as a 403 here — worth
    // naming explicitly since it's the most likely first-run failure.
    const message = error instanceof Error ? error.message : "Unknown error";
    const hint = message.includes("403")
      ? " Add the service account as a Restricted user on this property in Search Console."
      : "";
    return { ok: false, error: message + hint };
  }
}

/** ISO date n days before today, in Search Console's local reporting calendar. */
function daysAgo(n: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return d.toISOString().slice(0, 10);
}

export type SearchConsoleSummary = {
  totals: { clicks: number; impressions: number; ctr: number; position: number };
  daily: { day: string; clicks: number; impressions: number }[];
  topQueries: { query: string; clicks: number; impressions: number }[];
  topPages: { page: string; clicks: number; impressions: number }[];
};

/**
 * Everything /admin/analytics needs, in one call.
 *
 * Search Console typically lags 2-3 days behind real time, so the window ends
 * 3 days ago rather than today - querying up to "today" would just return a
 * misleadingly empty tail on the chart.
 */
export async function getSearchConsoleSummary(
  days: number,
): Promise<GscResult<SearchConsoleSummary>> {
  if (!isSearchConsoleConfigured()) {
    return { ok: false, error: "not configured" };
  }

  const LAG_DAYS = 3;
  const endDate = daysAgo(LAG_DAYS);
  const startDate = daysAgo(days + LAG_DAYS - 1);

  const [totalsRes, dailyRes, queriesRes, pagesRes] = await Promise.all([
    query({ startDate, endDate, dimensions: [] }),
    query({ startDate, endDate, dimensions: ["date"], rowLimit: 1000 }),
    query({ startDate, endDate, dimensions: ["query"], rowLimit: 10 }),
    query({ startDate, endDate, dimensions: ["page"], rowLimit: 10 }),
  ]);

  if (!totalsRes.ok) return totalsRes;

  const totalsRow = totalsRes.ok ? totalsRes.data[0] : undefined;
  const totals = {
    clicks: totalsRow?.clicks ?? 0,
    impressions: totalsRow?.impressions ?? 0,
    ctr: totalsRow?.ctr ?? 0,
    position: totalsRow?.position ?? 0,
  };

  // Fill every day in range, including zero-click days, so the chart reads
  // as a continuous timeline rather than skipping gaps.
  const byDay = new Map(
    dailyRes.ok ? dailyRes.data.map((r) => [r.keys[0]!, r]) : [],
  );
  const daily: SearchConsoleSummary["daily"] = [];
  for (let i = days - 1; i >= 0; i -= 1) {
    const day = daysAgo(i + LAG_DAYS);
    const row = byDay.get(day);
    daily.push({ day, clicks: row?.clicks ?? 0, impressions: row?.impressions ?? 0 });
  }

  const topQueries = queriesRes.ok
    ? queriesRes.data.map((r) => ({
        query: r.keys[0]!,
        clicks: r.clicks,
        impressions: r.impressions,
      }))
    : [];

  const topPages = pagesRes.ok
    ? pagesRes.data.map((r) => ({
        page: r.keys[0]!,
        clicks: r.clicks,
        impressions: r.impressions,
      }))
    : [];

  return { ok: true, data: { totals, daily, topQueries, topPages } };
}
