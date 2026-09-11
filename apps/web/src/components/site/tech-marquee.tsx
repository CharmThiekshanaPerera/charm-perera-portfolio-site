import type { CSSProperties } from "react";
import { getTechBadge } from "@/lib/tech-badge";

function TechCard({ name }: { name: string }) {
  const { Icon, color, isBadgeShaped } = getTechBadge(name);

  return (
    <li
      className="flex flex-shrink-0 items-center gap-3 rounded-2xl border border-border bg-card px-5 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--brand)]/50 hover:shadow-gold"
      style={{ "--brand": color } as CSSProperties}
    >
      {isBadgeShaped ? (
        <Icon className="h-8 w-8 flex-shrink-0 rounded-lg" aria-hidden="true" />
      ) : (
        <span
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)`, color }}
        >
          <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
        </span>
      )}
      <span className="whitespace-nowrap text-sm font-semibold text-foreground/90">{name}</span>
    </li>
  );
}

function MarqueeRow({
  technologies,
  reverse,
}: {
  technologies: string[];
  reverse?: boolean;
}) {
  if (technologies.length === 0) return null;

  return (
    <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <ul
        className={`flex w-max gap-4 py-1 group-hover:[animation-play-state:paused] ${
          reverse ? "motion-safe:animate-marquee-reverse" : "motion-safe:animate-marquee"
        }`}
      >
        {/* Rendered twice back-to-back so the 50%-translate loop is seamless. */}
        {[...technologies, ...technologies].map((name, index) => (
          <TechCard key={`${name}-${index}`} name={name} />
        ))}
      </ul>
    </div>
  );
}

/**
 * Two infinite marquee rows scrolling in opposite directions — reads as
 * "always moving" without ever jumping or resetting, and pauses on hover so
 * a name can actually be read. Falls back to a static (non-animated) wrap
 * for prefers-reduced-motion via the motion-safe: variant.
 */
export function TechMarquee({ technologies }: { technologies: string[] }) {
  if (technologies.length === 0) return null;

  const midpoint = Math.ceil(technologies.length / 2);
  const firstRow = technologies.slice(0, midpoint);
  const secondRow = technologies.slice(midpoint);

  return (
    <div className="animate-fade-in space-y-4">
      <MarqueeRow technologies={firstRow} />
      {secondRow.length > 0 ? <MarqueeRow technologies={secondRow} reverse /> : null}
    </div>
  );
}
