import type { ComponentType, SVGProps } from "react";
import {
  BehanceIcon,
  DribbbleIcon,
  FacebookIcon,
  FiverrIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  TikTokIcon,
  UpworkIcon,
  XIcon,
  YouTubeIcon,
} from "@/components/shared/social-icons";
import type { SiteSettingsData } from "./content";

export type SocialKey =
  | "github"
  | "linkedin"
  | "twitter"
  | "instagram"
  | "facebook"
  | "youtube"
  | "tiktok"
  | "behance"
  | "dribbble"
  | "upwork"
  | "fiverr";

/** True black/white marks (GitHub, X, TikTok) whose real brand color is
 * whichever of black/white contrasts with the surface it sits on — not one
 * fixed hex. Hard-coding #000000 for these renders invisibly on the dark
 * theme's near-black card background.
 */
const THEME_FOREGROUND = "hsl(var(--foreground))";
const THEME_BACKGROUND = "hsl(var(--background))";

type SocialPlatform = {
  key: SocialKey;
  label: string;
  /** Real brand color — used as the icon's tint and hover fill. */
  color: string;
  /** Text color to use once the hover fill uses `color` as a solid background. */
  contrast: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

/**
 * Single source of truth for every social platform the site knows about —
 * the admin form, footer, hero and about section all read from this list so
 * adding a new platform means editing one array, not four components.
 */
export const SOCIAL_PLATFORMS: SocialPlatform[] = [
  { key: "github", label: "GitHub", color: THEME_FOREGROUND, contrast: THEME_BACKGROUND, Icon: GitHubIcon },
  { key: "linkedin", label: "LinkedIn", color: "#0A66C2", contrast: "#ffffff", Icon: LinkedInIcon },
  { key: "twitter", label: "X (Twitter)", color: THEME_FOREGROUND, contrast: THEME_BACKGROUND, Icon: XIcon },
  { key: "instagram", label: "Instagram", color: "#E4405F", contrast: "#ffffff", Icon: InstagramIcon },
  { key: "facebook", label: "Facebook", color: "#1877F2", contrast: "#ffffff", Icon: FacebookIcon },
  { key: "youtube", label: "YouTube", color: "#FF0000", contrast: "#ffffff", Icon: YouTubeIcon },
  { key: "tiktok", label: "TikTok", color: THEME_FOREGROUND, contrast: THEME_BACKGROUND, Icon: TikTokIcon },
  { key: "behance", label: "Behance", color: "#1769FF", contrast: "#ffffff", Icon: BehanceIcon },
  { key: "dribbble", label: "Dribbble", color: "#EA4C89", contrast: "#ffffff", Icon: DribbbleIcon },
  { key: "upwork", label: "Upwork", color: "#14A800", contrast: "#ffffff", Icon: UpworkIcon },
  { key: "fiverr", label: "Fiverr", color: "#1DBF73", contrast: "#ffffff", Icon: FiverrIcon },
];

/** Only the platforms that actually have a URL set, in the same fixed order. */
export function getSocialLinks(social: SiteSettingsData["social"] | undefined) {
  return SOCIAL_PLATFORMS.map((platform) => ({
    ...platform,
    href: social?.[platform.key],
  })).filter((item): item is SocialPlatform & { href: string } => Boolean(item.href));
}
