import Link from "next/link";
import { PageView, connectToDatabase } from "@charm/db";
import { cn } from "@charm/ui/cn";
import {
  RankedBars,
  StatTile,
  TimelineChart,
  type DailyPoint,
  type RankedItem,
} from "@/components/admin/analytics-charts";
import { getSiteSettings, getSiteUrl } from "@/lib/content";
import { getSearchConsoleSummary, isSearchConsoleConfigured } from "@/lib/search-console";

export const dynamic = "force-dynamic";

const RANGES = [7, 30, 90] as const;
type Range = (typeof RANGES)[number];

/** ISO day strings for the last n days, oldest first, including today. */
function dayRange(days: number): string[] {
  const out: string[] = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i -= 1) {
    const d = new Date(today);
    d.setUTCDate(d.getUTCDate() - i);
    out.push(d.toISOString().slice(0, 10));
  }
  return out;
}

async function getAnalytics(days: Range) {
  const daysList = dayRange(days);
  const since = daysList[0]!;
  const today = daysList[daysList.length - 1]!;

  try {
    await connectToDatabase();

    const inRange = { day: { $gte: since } };

    const [
      totalViews,
      uniqueVisitors,
      todayViews,
      todayUniques,
      byDay,
      byPath,
      byReferrer,
      byDevice,
      byBrowser,
      byCountry,
      allTime,
    ] = await Promise.all([
      PageView.countDocuments(inRange),
      PageView.distinct("visitorHash", inRange).then((v) => v.filter(Boolean).length),
      PageView.countDocuments({ day: today }),
      PageView.distinct("visitorHash", { day: today }).then((v) => v.filter(Boolean).length),
      PageView.aggregate<{ _id: string; count: number }>([
        { $match: inRange },
        { $group: { _id: "$day", count: { $sum: 1 } } },
      ]),
      PageView.aggregate<{ _id: string; count: number }>([
        { $match: inRange },
        { $group: { _id: "$path", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ]),
      PageView.aggregate<{ _id: string; count: number }>([
        { $match: { ...inRange, referrer: { $ne: "direct" } } },
        { $group: { _id: "$referrer", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 8 },
      ]),
      PageView.aggregate<{ _id: string; count: number }>([
        { $match: inRange },
        { $group: { _id: "$device", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      PageView.aggregate<{ _id: string; count: number }>([
        { $match: inRange },
        { $group: { _id: "$browser", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 6 },
      ]),
      PageView.aggregate<{ _id: string; count: number }>([
        { $match: { ...inRange, country: { $nin: ["", null] } } },
        { $group: { _id: "$country", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 8 },
      ]),
      PageView.estimatedDocumentCount(),
    ]);

    const counts = new Map(byDay.map((d) => [d._id, d.count]));
    const daily: DailyPoint[] = daysList.map((day) => ({
      day,
      views: counts.get(day) ?? 0,
    }));

    return {
      ok: true as const,
      error: null as string | null,
      totalViews,
      uniqueVisitors,
      todayViews,
      todayUniques,
      allTime,
      daily,
      byPath,
      byReferrer,
      byDevice,
      byBrowser,
      byCountry,
    };
  } catch (error) {
    return {
      ok: false as const,
      error: error instanceof Error ? error.message : "Could not reach the database.",
      totalViews: 0,
      uniqueVisitors: 0,
      todayViews: 0,
      todayUniques: 0,
      allTime: 0,
      daily: [] as DailyPoint[],
      byPath: [] as { _id: string; count: number }[],
      byReferrer: [] as { _id: string; count: number }[],
      byDevice: [] as { _id: string; count: number }[],
      byBrowser: [] as { _id: string; count: number }[],
      byCountry: [] as { _id: string; count: number }[],
    };
  }
}

const REGION_NAMES =
  typeof Intl !== "undefined" && "DisplayNames" in Intl
    ? new Intl.DisplayNames(["en"], { type: "region" })
    : null;

function countryName(code: string): string {
  try {
    return REGION_NAMES?.of(code) ?? code;
  } catch {
    return code;
  }
}

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>;
}) {
  const params = await searchParams;
  const parsed = Number(params.range);
  const days: Range = (RANGES as readonly number[]).includes(parsed) ? (parsed as Range) : 30;

  const gscConfigured = isSearchConsoleConfigured();
  const [stats, settings, gsc] = await Promise.all([
    getAnalytics(days),
    getSiteSettings(),
    gscConfigured ? getSearchConsoleSummary(days) : Promise.resolve(null),
  ]);
  const siteUrl = getSiteUrl(settings);

  const perDay = stats.daily.length
    ? Math.round(stats.totalViews / stats.daily.length)
    : 0;

  const pages: RankedItem[] = stats.byPath.map((row) => ({
    label: row._id,
    value: row.count,
    href: `${siteUrl}${row._id}`,
  }));

  const referrers: RankedItem[] = stats.byReferrer.map((row) => ({
    label: row._id,
    value: row.count,
    href: `https://${row._id}`,
  }));

  const devices: RankedItem[] = stats.byDevice.map((row) => ({
    label: row._id.charAt(0).toUpperCase() + row._id.slice(1),
    value: row.count,
  }));

  const browsers: RankedItem[] = stats.byBrowser.map((row) => ({
    label: row._id || "Unknown",
    value: row.count,
  }));

  const countries: RankedItem[] = stats.byCountry.map((row) => ({
    label: countryName(row._id),
    value: row.count,
  }));

  const gscDaily: DailyPoint[] = gsc?.ok
    ? gsc.data.daily.map((d) => ({ day: d.day, views: d.clicks }))
    : [];

  const gscQueries: RankedItem[] = gsc?.ok
    ? gsc.data.topQueries.map((q) => ({ label: q.query, value: q.clicks }))
    : [];

  const gscPages: RankedItem[] = gsc?.ok
    ? gsc.data.topPages.map((p) => ({
        label: p.page.replace(siteUrl, "") || "/",
        value: p.clicks,
        href: p.page,
      }))
    : [];

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">Site visits</h1>
          <p className="mt-1 text-muted-foreground">
            Traffic to your public pages. The admin panel is never counted.
          </p>
        </div>

        <nav className="flex gap-2" aria-label="Date range">
          {RANGES.map((r) => (
            <Link
              key={r}
              href={`/admin/analytics?range=${r}`}
              aria-current={r === days ? "page" : undefined}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                r === days
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {r} days
            </Link>
          ))}
        </nav>
      </header>

      {stats.error ? (
        <p
          role="alert"
          className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          Could not load analytics: {stats.error}
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile
          label={`Views (${days}d)`}
          value={stats.totalViews.toLocaleString()}
          hint={`~${perDay.toLocaleString()} per day`}
        />
        <StatTile
          label={`Unique visitors (${days}d)`}
          value={stats.uniqueVisitors.toLocaleString()}
          hint="Counted per day, no cookies"
        />
        <StatTile
          label="Today"
          value={stats.todayViews.toLocaleString()}
          hint={`${stats.todayUniques.toLocaleString()} unique`}
        />
        <StatTile
          label="All time"
          value={stats.allTime.toLocaleString()}
          hint="Views kept for 180 days"
        />
      </div>

      <TimelineChart data={stats.daily} days={days} />

      <div className="grid gap-4 lg:grid-cols-2">
        <RankedBars
          title="Top pages"
          description="Most visited routes in this period."
          items={pages}
        />
        <RankedBars
          title="Referrers"
          description="External sites sending traffic. Direct visits are excluded."
          items={referrers}
          emptyLabel="No external referrers yet — all traffic has been direct."
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <RankedBars title="Devices" items={devices} />
        <RankedBars title="Browsers" items={browsers} />
        <RankedBars
          title="Countries"
          items={countries}
          emptyLabel="Country data appears once the site is served from Vercel."
        />
      </div>

      <p className="text-xs text-muted-foreground">
        Visits are recorded first-party in your own database. No cookies are set and no
        third party receives the data. IP addresses are never stored — they are hashed with
        a salt that rotates daily, which is enough to count unique visitors without being
        able to follow anyone across days. Rows older than 180 days delete themselves.
      </p>

      <section className="space-y-4 border-t border-border pt-6">
        <div>
          <h2 className="font-display text-2xl font-bold">Search performance</h2>
          <p className="mt-1 text-muted-foreground">
            How the site is doing in Google Search — separate from the on-site traffic
            above, and sourced from Google, not your own database.
          </p>
        </div>

        {!gscConfigured ? (
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-sm">
              Not connected yet. Search Console data needs a service account with read
              access to your property —{" "}
              <span className="text-muted-foreground">
                see &ldquo;Search Console data&rdquo; in the README
              </span>{" "}
              for the three environment variables and the one-time step of adding the
              service account as a Restricted user in Search Console.
            </p>
          </div>
        ) : !gsc?.ok ? (
          <p
            role="alert"
            className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          >
            Could not load Search Console data: {gsc?.error ?? "unknown error"}
          </p>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatTile
                label={`Clicks (${days}d)`}
                value={gsc.data.totals.clicks.toLocaleString()}
                hint="Visits that started from a Google search"
              />
              <StatTile
                label={`Impressions (${days}d)`}
                value={gsc.data.totals.impressions.toLocaleString()}
                hint="Times a page appeared in results"
              />
              <StatTile
                label="Click-through rate"
                value={`${(gsc.data.totals.ctr * 100).toFixed(1)}%`}
                hint="Clicks ÷ impressions"
              />
              <StatTile
                label="Average position"
                value={gsc.data.totals.position.toFixed(1)}
                hint="Lower is better — 1 is the top result"
              />
            </div>

            <TimelineChart
              data={gscDaily}
              days={days}
              title="Search clicks per day"
              unitLabel="click"
              emptyLabel="No search clicks in this period yet."
            />

            <div className="grid gap-4 lg:grid-cols-2">
              <RankedBars
                title="Top search queries"
                description="The searches that led people to the site."
                items={gscQueries}
                valueLabel="Clicks"
                emptyLabel="No query data in this period yet."
              />
              <RankedBars
                title="Top pages in search"
                description="Which pages get clicked in Google results."
                items={gscPages}
                valueLabel="Clicks"
                emptyLabel="No page data in this period yet."
              />
            </div>

            <p className="text-xs text-muted-foreground">
              Google Search Console typically reports with a 2–3 day delay, so the most
              recent days are excluded from this range rather than shown as zero.
            </p>
          </>
        )}
      </section>
    </div>
  );
}
