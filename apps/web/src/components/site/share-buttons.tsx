"use client";

import { useState } from "react";
import { Check, Facebook, Link2, Linkedin, Twitter } from "lucide-react";
import { Button } from "@charm/ui/button";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";

/**
 * Share row for articles and case studies.
 *
 * The original site had these buttons inside the blog modal but they were
 * inert — no href, no handler. These open real share intents, and the copy
 * button falls back to a hidden textarea where the clipboard API is blocked.
 */
export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const targets = [
    {
      label: "Share on Twitter",
      name: "Twitter",
      Icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      label: "Share on LinkedIn",
      name: "LinkedIn",
      Icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      label: "Share on Facebook",
      name: "Facebook",
      Icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
  ];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Clipboard API needs a secure context and permission; fall back.
      const field = document.createElement("textarea");
      field.value = url;
      field.setAttribute("readonly", "");
      field.style.position = "absolute";
      field.style.left = "-9999px";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      document.body.removeChild(field);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="border-t border-border pt-8">
      <h2 className="mb-4 font-semibold text-foreground">Share this article</h2>

      <div className="flex flex-wrap gap-3">
        {targets.map(({ label, name, Icon, href }) => (
          <Button key={name} asChild variant="outline" size="sm">
            <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
              <Icon className="h-4 w-4" aria-hidden="true" />
              {name}
            </a>
          </Button>
        ))}

        <Button asChild variant="outline" size="sm">
          <a
            href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on WhatsApp"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>
        </Button>

        <Button variant="outline" size="sm" onClick={copyLink}>
          {copied ? (
            <>
              <Check className="h-4 w-4" aria-hidden="true" />
              Copied
            </>
          ) : (
            <>
              <Link2 className="h-4 w-4" aria-hidden="true" />
              Copy link
            </>
          )}
        </Button>
      </div>

      <p aria-live="polite" className="sr-only">
        {copied ? "Link copied to clipboard" : ""}
      </p>
    </div>
  );
}
