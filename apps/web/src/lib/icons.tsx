import {
  Brain,
  Cloud,
  Code2,
  Crown,
  Database,
  GitBranch,
  Globe,
  Layers,
  Palette,
  Rocket,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

/**
 * Icon names are stored in MongoDB as plain strings. Resolving them through an
 * explicit allow-list keeps the client bundle small (only these icons ship) and
 * means a bad value in the database renders a safe default rather than crashing
 * the page.
 */
const ICONS: Record<string, LucideIcon> = {
  Brain,
  Cloud,
  Code2,
  Crown,
  Database,
  GitBranch,
  Globe,
  Layers,
  Palette,
  Rocket,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Wrench,
  Zap,
};

export const ICON_NAMES = Object.keys(ICONS);

export function getIcon(name: string | undefined | null): LucideIcon {
  if (!name) return Code2;
  return ICONS[name] ?? Code2;
}
