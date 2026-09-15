"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@charm/ui/button";
import { Textarea } from "@charm/ui/textarea";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import {
  FacebookIcon,
  LinkedInIcon,
  XIcon,
} from "@/components/shared/social-icons";

/** Same clipboard-with-fallback pattern as the public ShareButtons component. */
async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return;
  } catch {
    // Clipboard API needs a secure context and permission; fall back.
  }
  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "");
  field.style.position = "absolute";
  field.style.left = "-9999px";
  document.body.appendChild(field);
  field.select();
  document.execCommand("copy");
  document.body.removeChild(field);
}

/**
 * Auto-drafted share panel shown on an already-published project/post's
 * admin edit page — not automatic posting (LinkedIn/Instagram lock that down
 * behind a developer-review process well beyond a personal site's needs),
 * but a one-click-closer manual share: X and WhatsApp open pre-filled with
 * the caption; LinkedIn and Facebook copy the caption and open the composer,
 * since neither platform lets a link pre-fill custom post text.
 */
export function SharePanel({
  url,
  initialCaption,
}: {
  url: string;
  initialCaption: string;
}) {
  const [caption, setCaption] = useState(initialCaption);
  const [copied, setCopied] = useState(false);

  function flashCopied() {
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  async function handleCopy() {
    await copyText(caption);
    flashCopied();
  }

  async function copyThenOpen(composerUrl: string) {
    await copyText(caption);
    flashCopied();
    window.open(composerUrl, "_blank", "noopener,noreferrer");
  }

  const encodedCaption = encodeURIComponent(caption);

  return (
    <section className="space-y-4 rounded-2xl border border-border bg-card p-6">
      <div>
        <h2 className="text-lg font-semibold">Share this</h2>
        <p className="text-sm text-muted-foreground">
          Drafted from the fields above — edit it before sharing if you like. X
          and WhatsApp open pre-filled; LinkedIn and Facebook don&apos;t allow
          pre-filling post text from a link, so those copy the caption and open
          the composer for you to paste.
        </p>
      </div>

      <Textarea
        value={caption}
        onChange={(event) => setCaption(event.target.value)}
        rows={6}
        className="font-mono text-sm"
        aria-label="Share caption"
      />

      <div className="flex flex-wrap gap-2">
        <Button asChild variant="outline" size="sm">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodedCaption}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <XIcon className="h-4 w-4" />
            Post to X
          </a>
        </Button>
        <Button asChild variant="outline" size="sm">
          <a
            href={`https://wa.me/?text=${encodedCaption}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Send via WhatsApp
          </a>
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            copyThenOpen("https://www.linkedin.com/feed/?shareActive=true")
          }
        >
          <LinkedInIcon className="h-4 w-4" />
          Copy &amp; open LinkedIn
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => copyThenOpen("https://www.facebook.com/")}
        >
          <FacebookIcon className="h-4 w-4" />
          Copy &amp; open Facebook
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={handleCopy}>
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          {copied ? "Copied" : "Copy caption"}
        </Button>
      </div>
    </section>
  );
}
