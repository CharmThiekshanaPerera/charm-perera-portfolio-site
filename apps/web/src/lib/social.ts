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

type SocialPlatform = {
  key: SocialKey;
  label: string;
  /** Real brand color — used as the icon's tint and hover fill. */
  color: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

/**
 * Single source of truth for every social platform the site knows about —
 * the admin form, footer, hero and about section all read from this list so
 * adding a new platform means editing one array, not four components.
 */
export const SOCIAL_PLATFORMS: SocialPlatform[] = [
  { key: "github", label: "GitHub", color: "#181717", Icon: GitHubIcon },
  { key: "linkedin", label: "LinkedIn", color: "#0A66C2", Icon: LinkedInIcon },
  { key: "twitter", label: "X (Twitter)", color: "#000000", Icon: XIcon },
  { key: "instagram", label: "Instagram", color: "#E4405F", Icon: InstagramIcon },
  { key: "facebook", label: "Facebook", color: "#1877F2", Icon: FacebookIcon },
  { key: "youtube", label: "YouTube", color: "#FF0000", Icon: YouTubeIcon },
  { key: "tiktok", label: "TikTok", color: "#000000", Icon: TikTokIcon },
  { key: "behance", label: "Behance", color: "#1769FF", Icon: BehanceIcon },
  { key: "dribbble", label: "Dribbble", color: "#EA4C89", Icon: DribbbleIcon },
  { key: "upwork", label: "Upwork", color: "#14A800", Icon: UpworkIcon },
  { key: "fiverr", label: "Fiverr", color: "#1DBF73", Icon: FiverrIcon },
];

/** Only the platforms that actually have a URL set, in the same fixed order. */
export function getSocialLinks(social: SiteSettingsData["social"] | undefined) {
  return SOCIAL_PLATFORMS.map((platform) => ({
    ...platform,
    href: social?.[platform.key],
  })).filter((item): item is SocialPlatform & { href: string } => Boolean(item.href));
}
