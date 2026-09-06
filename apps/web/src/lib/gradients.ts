/**
 * Gradient presets for package cards.
 *
 * Tailwind scans source files for class names at build time. A class that only
 * ever exists as a string in MongoDB is never seen, so it gets purged and the
 * element renders unstyled. Writing every class literally here keeps them in
 * the compiled CSS; the database only stores the preset *name*.
 *
 * Same reasoning as the Lucide icon allow-list in `icons.tsx`.
 */
const GRADIENTS = {
  gold: "from-primary to-amber-400",
  blue: "from-blue-500 to-cyan-500",
  purple: "from-purple-500 to-pink-500",
  green: "from-emerald-500 to-teal-500",
  rose: "from-rose-500 to-orange-400",
  slate: "from-slate-500 to-slate-700",
} as const;

export type GradientName = keyof typeof GRADIENTS;

export const GRADIENT_NAMES = Object.keys(GRADIENTS) as GradientName[];

/**
 * Resolves a stored value to a class string.
 *
 * Accepts a preset name (preferred) and also tolerates a legacy raw class
 * string, so rows seeded before this change keep working — though a raw string
 * only renders if those exact classes appear somewhere else in the source.
 */
export function getGradient(value: string | undefined | null): string {
  if (!value) return GRADIENTS.gold;
  if (value in GRADIENTS) return GRADIENTS[value as GradientName];
  return value.includes("from-") ? value : GRADIENTS.gold;
}
