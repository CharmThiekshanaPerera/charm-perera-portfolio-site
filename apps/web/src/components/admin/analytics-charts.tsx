import { cn } from "@charm/ui/cn";

/**
 * Chart primitives for the analytics dashboard.
 *
 * Every chart here is single-series, so there is no legend - the heading names
 * the series - and no categorical palette. Bar length already encodes
 * magnitude, so colouring bars by value would encode the same thing twice;
 * marks use one flat brand hue and all text wears ink tokens rather than the
 * series colour.
 *
 * These render on the server. Hover uses SVG <title> and the native title
 * attribute, which gives per-mark tooltips and screen-reader text without
 * shipping any JavaScript.
 */

export function StatTile({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 font-display text-3xl font-bold tabular-nums">{value}</p>
      {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

export type DailyPoint = { day: string; views: number };

/**
 * Views per day. Bars sit on a common baseline with a 2px gap between them;
 * only the first, last and peak days are labelled, so the axis never turns
 * into a wall of text.
 */
export function TimelineChart({ data, days }: { data: DailyPoint[]; days: number }) {
  if (data.length === 0) {
    return (
      <p className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
        No visits recorded yet.
      </p>
    );
  }

  const max = Math.max(...data.map((d) => d.views), 1);
  const peakIndex = data.reduce((best, d, i) => (d.views > data[best]!.views ? i : best), 0);

  // Geometry in a fixed viewBox; the SVG scales to its container width.
  const width = 900;
  const height = 220;
  const padBottom = 26;
  const plotHeight = height - padBottom;
  const slot = width / data.length;
  const gap = data.length > 60 ? 1 : 2;
  const barWidth = Math.max(1, slot - gap);
  const radius = barWidth >= 8 ? 4 : barWidth / 2;

  const shortDate = (day: string) =>
    new Date(`${day}T00:00:00Z`).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      timeZone: "UTC",
    });

  return (
    <figure className="rounded-2xl border border-border bg-card p-6">
      <figcaption className="mb-1 font-semibold">Visits per day</figcaption>
      <p className="mb-5 text-sm text-muted-foreground">Last {days} days</p>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-56 w-full"
        role="img"
        aria-label={`Daily visits for the last ${days} days. Peak of ${max} on ${shortDate(
          data[peakIndex]!.day,
        )}.`}
      >
        {/* Recessive baseline - the only rule the chart needs. */}
        <line
          x1="0"
          y1={plotHeight}
          x2={width}
          y2={plotHeight}
          stroke="hsl(var(--border))"
          strokeWidth="1"
        />

        {data.map((point, index) => {
          const barHeight = point.views === 0 ? 0 : (point.views / max) * (plotHeight - 8);
          const x = index * slot + gap / 2;
          const y = plotHeight - barHeight;

          return (
            <g key={point.day}>
              {point.views > 0 ? (
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  rx={Math.min(radius, barHeight / 2)}
                  fill="hsl(var(--primary))"
                  opacity={index === peakIndex ? 1 : 0.75}
                >
                  <title>{`${shortDate(point.day)}: ${point.views} view${point.views === 1 ? "" : "s"}`}</title>
                </rect>
              ) : (
                // A 2px stub keeps zero-days visible as days rather than gaps.
                <rect
                  x={x}
                  y={plotHeight - 2}
                  width={barWidth}
                  height="2"
                  fill="hsl(var(--border))"
                >
                  <title>{`${shortDate(point.day)}: no views`}</title>
                </rect>
              )}
            </g>
          );
        })}

        {/* Only the ends and the peak are labelled. */}
        {[0, peakIndex, data.length - 1]
          .filter((v, i, arr) => arr.indexOf(v) === i)
          .map((index) => {
            const anchor = index === 0 ? "start" : index === data.length - 1 ? "end" : "middle";
            const x =
              index * slot + (anchor === "start" ? 0 : anchor === "end" ? barWidth : barWidth / 2);
            return (
              <text
                key={`label-${index}`}
                x={x}
                y={height - 8}
                textAnchor={anchor}
                fontSize="12"
                fill="hsl(var(--muted-foreground))"
              >
                {shortDate(data[index]!.day)}
              </text>
            );
          })}
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        Peak {max} view{max === 1 ? "" : "s"} on {shortDate(data[peakIndex]!.day)}
      </p>
    </figure>
  );
}

export type RankedItem = { label: string; value: number; href?: string };

/**
 * Ranked magnitude list. Rendered as a table so the numbers are readable
 * directly - the bar is a visual aid layered behind each row, not the only way
 * to read the value.
 */
export function RankedBars({
  title,
  description,
  items,
  emptyLabel = "Nothing recorded yet.",
  valueLabel = "Views",
}: {
  title: string;
  description?: string;
  items: RankedItem[];
  emptyLabel?: string;
  valueLabel?: string;
}) {
  const max = Math.max(...items.map((i) => i.value), 1);

  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <h2 className="font-semibold">{title}</h2>
      {description ? (
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      ) : null}

      {items.length === 0 ? (
        <p className="mt-5 text-sm text-muted-foreground">{emptyLabel}</p>
      ) : (
        <table className="mt-5 w-full">
          <caption className="sr-only">
            {title} by {valueLabel.toLowerCase()}
          </caption>
          <thead className="sr-only">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">{valueLabel}</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.label}>
                <td className="py-1.5 pr-4 align-middle">
                  <div className="relative overflow-hidden rounded-md">
                    {/* Bar sits behind the label; length encodes magnitude. */}
                    <div
                      className="absolute inset-y-0 left-0 rounded-md bg-primary/20"
                      style={{ width: `${(item.value / max) * 100}%` }}
                      aria-hidden="true"
                    />
                    <span
                      className={cn(
                        "relative block truncate px-3 py-1.5 text-sm",
                        item.href ? "text-foreground" : "text-foreground/90",
                      )}
                      title={item.label}
                    >
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary hover:underline"
                        >
                          {item.label}
                        </a>
                      ) : (
                        item.label
                      )}
                    </span>
                  </div>
                </td>
                <td className="w-16 py-1.5 text-right align-middle text-sm font-medium tabular-nums text-muted-foreground">
                  {item.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
