import { config as loadEnv } from "dotenv";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Next.js only reads .env files from this app's own directory, but in a
 * monorepo the natural place for them is the repository root — which is also
 * where the @charm/db scripts look. Load the root files here so a single
 * .env.local drives `next dev`, `next build`, `npm run seed` and
 * `npm run create-admin` alike.
 *
 * Existing process.env values always win, so Vercel's dashboard variables are
 * never overwritten (and the files simply do not exist there).
 */
const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
loadEnv({ path: resolve(repoRoot, ".env.local") });
loadEnv({ path: resolve(repoRoot, ".env") });

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Workspace packages ship raw TS/TSX, so Next compiles them as app source.
  transpilePackages: ["@charm/ui", "@charm/db"],

  // Mongoose must stay a real Node module — bundling it breaks its dynamic
  // driver loading inside serverless functions.
  serverExternalPackages: ["mongoose", "bcryptjs"],

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "play-lh.googleusercontent.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
      {
        // The admin panel must never be indexed, cached by a CDN, or archived.
        source: "/admin/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
          { key: "Cache-Control", value: "no-store, max-age=0" },
        ],
      },
    ];
  },

  async redirects() {
    return [
      // The old SPA used hash anchors as its only "pages". These now have real
      // URLs, so preserve any inbound links people already shared.
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/projects.html", destination: "/projects", permanent: true },
      { source: "/blog.html", destination: "/blog", permanent: true },
    ];
  },
};

export default nextConfig;
