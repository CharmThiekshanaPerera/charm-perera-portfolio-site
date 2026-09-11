import type { ComponentType, SVGProps } from "react";
import { Brain, Cloud, GitMerge, Plug, RefreshCw, Sparkles } from "lucide-react";
import {
  AndroidIcon,
  AppleIcon,
  JavaScriptIcon,
  MongoDBIcon,
  NextJsIcon,
  NodeIcon,
  PythonIcon,
  ReactIcon,
  TailwindIcon,
  TypeScriptIcon,
} from "@/components/shared/tech-icons";

type TechBadge = {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  /** Real brand color, or a theme-aware CSS value for monochrome marks. */
  color: string;
  /** True brand mark rendered at natural size (already colored/squared), vs
   *  a plain glyph that still needs a tinted circle behind it. */
  isBadgeShaped?: boolean;
};

const THEME_FOREGROUND = "hsl(var(--foreground))";

/**
 * Ordered keyword matchers — first match wins, checked as a case-insensitive
 * substring of the admin-entered technology name. Covers real product logos
 * (highest confidence shapes only) and the handful of process/practice terms
 * already in use, which get a concept icon instead of a logo since they
 * don't have one.
 */
const MATCHERS: { test: RegExp; badge: TechBadge }[] = [
  { test: /react native/i, badge: { Icon: ReactIcon, color: "#61DAFB" } },
  { test: /^react\b|react\.js/i, badge: { Icon: ReactIcon, color: "#61DAFB" } },
  { test: /next\.?js/i, badge: { Icon: NextJsIcon, color: THEME_FOREGROUND } },
  { test: /typescript/i, badge: { Icon: TypeScriptIcon, color: "#3178C6", isBadgeShaped: true } },
  {
    test: /javascript|^js$/i,
    badge: { Icon: JavaScriptIcon, color: "#F7DF1E", isBadgeShaped: true },
  },
  { test: /node/i, badge: { Icon: NodeIcon, color: "#339933" } },
  { test: /python/i, badge: { Icon: PythonIcon, color: "#3776AB", isBadgeShaped: true } },
  { test: /android/i, badge: { Icon: AndroidIcon, color: "#3DDC84" } },
  { test: /\bios\b|swift/i, badge: { Icon: AppleIcon, color: THEME_FOREGROUND } },
  { test: /mongo/i, badge: { Icon: MongoDBIcon, color: "#47A248" } },
  { test: /tailwind/i, badge: { Icon: TailwindIcon, color: "#38BDF8" } },
  { test: /api/i, badge: { Icon: Plug, color: "#F59E0B" } },
  { test: /ci\s*\/?\s*cd|devops/i, badge: { Icon: GitMerge, color: "#F97316" } },
  { test: /agile|scrum/i, badge: { Icon: RefreshCw, color: "#8B5CF6" } },
  { test: /cloud/i, badge: { Icon: Cloud, color: "#38BDF8" } },
  { test: /\bai\b|artificial intelligence|machine learning/i, badge: { Icon: Brain, color: "#EC4899" } },
];

/** Colors cycled for the generic monogram fallback, so unmatched entries
 *  still look intentional instead of all defaulting to one flat color. */
const FALLBACK_COLORS = ["#EA580C", "#0EA5E9", "#A855F7", "#059669", "#DC2626", "#CA8A04"];

function fallbackColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) % FALLBACK_COLORS.length;
  return FALLBACK_COLORS[Math.abs(hash) % FALLBACK_COLORS.length]!;
}

/** Resolves any technology name (including ones an admin might type in the
 * future that this file has never heard of) to something displayable. */
export function getTechBadge(name: string): TechBadge {
  for (const { test, badge } of MATCHERS) {
    if (test.test(name)) return badge;
  }
  return { Icon: Sparkles, color: fallbackColor(name) };
}
