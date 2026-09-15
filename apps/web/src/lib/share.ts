/**
 * Auto-drafted social captions for the admin panel.
 *
 * Deliberately a template over fields you already entered — title,
 * description, tags, the real published URL — never invented copy. LinkedIn
 * and Facebook don't support pre-filling a custom caption from a share link
 * (both dropped that years ago for anti-spam reasons — only a URL, with the
 * platform generating its own preview from your OG tags), so this is meant
 * to be copied and pasted there; X and WhatsApp do support a pre-filled
 * message, so those get real deep links straight from the caption.
 */
export function buildShareCaption({
  emoji,
  kind,
  title,
  description,
  url,
  tags = [],
}: {
  emoji: string;
  kind: string;
  title: string;
  description: string;
  url: string;
  tags?: string[];
}): string {
  const hashtags = tags
    .slice(0, 3)
    .map((tag) => `#${tag.replace(/[^a-zA-Z0-9]/g, "")}`)
    .filter((tag) => tag.length > 1)
    .join(" ");

  const parts = [`${emoji} New ${kind}: ${title}`, "", description, "", url];
  if (hashtags) parts.push("", hashtags);

  return parts.join("\n");
}
