import { ImageResponse } from "next/og";
import { getSiteSettings } from "@/lib/content";

/**
 * Generated social card, replacing the old hard-coded lovable.dev image that
 * had nothing to do with this site. Rendered on demand and cached, so it always
 * reflects the current name and tagline from site settings.
 */
export const alt = "Charm Thiekshana Perera — Freelance Web Developer in Sri Lanka";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const revalidate = 86400;

export default async function OpengraphImage() {
  const settings = await getSiteSettings();

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #161310 0%, #241d16 55%, #2e2317 100%)",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              fontSize: 26,
              color: "#d6ac63",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            {settings.jobTitle}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              display: "flex",
              fontSize: 82,
              fontWeight: 700,
              color: "#f4ece0",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            {settings.fullName}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 34,
              color: "#d6ac63",
              lineHeight: 1.3,
              maxWidth: "900px",
            }}
          >
            {settings.tagline || "React, iOS & Android development"}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid rgba(214, 172, 99, 0.35)",
            paddingTop: "28px",
            fontSize: 26,
            color: "rgba(244, 236, 224, 0.75)",
          }}
        >
          <div style={{ display: "flex" }}>{settings.location}</div>
          <div style={{ display: "flex", color: "#d6ac63", fontWeight: 600 }}>
            charmperera.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
