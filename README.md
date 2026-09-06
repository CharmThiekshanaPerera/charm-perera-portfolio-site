# charmthiekshana.com

Portfolio site and admin CMS for **Charm Thiekshana Perera** — freelance web &
mobile developer, Colombo, Sri Lanka.

A Turborepo monorepo: one Next.js 15 application serving both the public,
server-rendered marketing site and a password-protected CMS at `/admin`, backed
by MongoDB Atlas and deployed on Vercel.

---

## Contents

- [Layout](#layout)
- [First-time setup](#first-time-setup)
- [Everyday commands](#everyday-commands)
- [Deploying to Vercel](#deploying-to-vercel)
- [The admin panel](#the-admin-panel)
- [How SEO is handled](#how-seo-is-handled)
- [Content that needs your review](#content-that-needs-your-review)
- [Troubleshooting](#troubleshooting)
- [Architecture notes](#architecture-notes)

---

## Layout

```text
charm-perera-portfolio-site/
├─ apps/
│  └─ web/                    Next.js 15 App Router — public site + /admin
│     ├─ src/app/
│     │  ├─ (site)/           Public pages, wrapped in header/footer
│     │  ├─ admin/            CMS (login + dashboard route group)
│     │  ├─ api/              contact, auth, revalidate
│     │  ├─ sitemap.ts        Generated from the database
│     │  ├─ robots.ts
│     │  └─ opengraph-image.tsx   Generated social card
│     ├─ src/components/      site/, admin/, shared/
│     └─ src/lib/             auth, content access, structured data
├─ packages/
│  ├─ db/                     Mongoose models, Zod schemas, seed scripts
│  ├─ ui/                     Design system + shared primitives
│  └─ config/                 Shared tsconfig + Tailwind preset
├─ turbo.json
└─ vercel.json
```

**Public routes:** `/`, `/about`, `/projects`, `/projects/[slug]`, `/services`,
`/blog`, `/blog/[slug]`, `/contact`, plus `/sitemap.xml`, `/robots.txt`,
`/blog/rss.xml`, `/manifest.webmanifest` and `/opengraph-image`.

---

## First-time setup

### 1. Create the MongoDB Atlas cluster

The API key supplied during the rebuild was scoped to a single project and could
not create a new one, so this part is manual — about two minutes:

1. In [Atlas](https://cloud.mongodb.com), create a project (e.g.
   `charm-portfolio`) and a **free M0 cluster** in **AWS / Singapore
   (ap-southeast-1)** — closest to both you and the Vercel `sin1` region this
   project deploys to.
2. **Database Access →** add a user (e.g. `portfolio_app`) with
   *Read and write to any database*. Save the generated password.
3. **Network Access →** add `0.0.0.0/0`.

   > This is required. Vercel's serverless functions have dynamic egress IPs, so
   > an allow-list of fixed addresses will make the live site unable to reach the
   > database. The database user password is what protects the cluster. If you
   > later want a fixed egress IP, that needs an M10+ cluster with VPC peering.

4. **Connect → Drivers** and copy the `mongodb+srv://…` connection string.

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

Fill it in:

| Variable | Required | Purpose |
| --- | --- | --- |
| `MONGODB_URI` | yes | Atlas connection string (URL-encode special characters in the password) |
| `MONGODB_DB` | yes | Database name, e.g. `charm_portfolio` |
| `AUTH_SECRET` | yes | Signs the admin session JWT. `openssl rand -base64 32` |
| `NEXT_PUBLIC_SITE_URL` | yes | Canonical origin, no trailing slash |
| `REVALIDATE_SECRET` | no | Bearer token for `POST /api/revalidate` |
| `RESEND_API_KEY` | no | Emails you on each new contact message |
| `CONTACT_NOTIFY_EMAIL` | no | Where those notifications go |

### 3. Install, seed, and create your login

```bash
npm install
npm run seed                                    # imports all existing content
npm run create-admin -- you@example.com         # prints a generated password once
npm run dev
```

`npm run seed` is idempotent — re-running updates existing documents rather than
duplicating them. Add `-- --reset` to wipe the content collections first. It
never touches `messages` or `adminUsers`.

Then open <http://localhost:3000> and <http://localhost:3000/admin>.

---

## Everyday commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server on :3000 |
| `npm run build` | Production build of every workspace |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` across all workspaces |
| `npm run seed` | Import/refresh seed content |
| `npm run create-admin -- <email> [password]` | Create an admin, or reset an existing password |

> Pass the email and password as **positional** arguments, not `--email` /
> `--password`: npm claims those two names as its own config flags and strips
> them before the script runs. Omit the password to have a strong one generated
> and printed once.

---

## Deploying to Vercel

The existing Vercel project points at the repository root, and the committed
`vercel.json` makes that work unchanged:

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": "apps/web/.next",
  "regions": ["sin1"]
}
```

**Before the first deploy of this version, add the environment variables** from
the table above under *Settings → Environment Variables* (Production, Preview and
Development). `MONGODB_URI`, `MONGODB_DB`, `AUTH_SECRET` and
`NEXT_PUBLIC_SITE_URL` are mandatory — the build will succeed without them, but
every page will fall back to placeholder content.

> Alternative: set *Settings → General → Root Directory* to `apps/web` and delete
> `vercel.json`. Both work; do one or the other, not both.

After the first successful deploy, in Google Search Console submit
`https://www.charmthiekshana.com/sitemap.xml` and request re-indexing of the home page —
the URL structure has changed substantially and it is worth prompting a recrawl.

---

## The admin panel

`/admin`, gated by an httpOnly session cookie.

| Section | What you can do |
| --- | --- |
| Dashboard | Content counts and the five most recent enquiries |
| Projects | Full CRUD, Markdown case-study body, per-project SEO overrides |
| Blog posts | Full CRUD, Markdown articles, tags, publish dates |
| Testimonials | CRUD plus the **verified** flag (see below) |
| Packages | Pricing, features, add-ons |
| Experience | Roles and responsibilities |
| Skills | Skill categories |
| Messages | Contact inbox with unread/read/replied/archived and reply-by-email |
| Site settings | Identity, hero copy, contact details, socials, SEO defaults, FAQs, password change |

Saving anything purges the affected public pages immediately, so edits go live
without a redeploy.

**Security:** bcrypt password hashing (cost 12), signed JWT sessions, Edge
middleware on every `/admin` route, a second `requireSession()` check inside
every server action, per-account lockout after 8 failed logins, per-IP rate
limiting on login and the contact form, and `X-Robots-Tag: noindex` plus
`Cache-Control: no-store` on all admin responses.

---

## How SEO is handled

The previous site was a client-rendered Vite SPA: one indexable URL, an empty
HTML shell, and content that only existed after JavaScript ran. That was the
single biggest constraint on its search performance. What changed:

**Rendering and URLs**

- Every page is server-rendered. The home page ships ~78 KB of real HTML.
- Nine indexable routes instead of one, plus a page per project and per article.
- The old sitemap listed hash fragments (`/#about`), which Google collapses into
  the home page. Every sitemap entry is now a distinct URL, generated from the
  database so publishing something lists it automatically.
- Unknown paths return a genuine 404 instead of a 200 soft-404.

**Metadata**

- Per-route `generateMetadata`, canonical URLs via `metadataBase`, Open Graph and
  Twitter cards throughout.
- The OG image is generated at `/opengraph-image` from live site settings,
  replacing the hard-coded `lovable.dev` image that had nothing to do with this
  site.

**Structured data** — `Person`, `ProfessionalService` (with an `OfferCatalog`
built from your real packages), `WebSite`, `FAQPage`, `BreadcrumbList`,
`BlogPosting` per article, `CollectionPage` for listings.

**Content**

- FAQ answers now appear visibly on the page. Previously they existed only inside
  JSON-LD, which breaches Google's requirement that FAQ markup reflect visible
  content.
- Blog articles are full Markdown documents rendered server-side. The old site
  rendered the *same* generic "Introduction / Key Takeaways / Conclusion"
  boilerplate into every post modal — textbook thin, duplicated content.

**Performance** — fonts self-hosted via `next/font` (no render-blocking Google
Fonts request, no layout shift), `next/image` with AVIF/WebP, a `priority` hint
on the LCP hero image, ISR with hourly revalidation, and far less client
JavaScript because most sections are server components.

**Also** — RSS feed at `/blog/rss.xml`, a generated web manifest, security
headers, `prefers-reduced-motion` support, skip-to-content link, and correct
heading hierarchy on every page.

### The testimonials decision

Testimonials render on the page as normal, but **only those flagged `verified` in
the admin panel are emitted as `Review` / `AggregateRating` structured data.**
Everything is seeded as unverified.

This is deliberate. Google requires review snippets to be genuine and
verifiable, and marking up reviews that cannot be substantiated risks a manual
action against the whole domain — a far larger loss than the star ratings are
worth. Flip `verified` on for any testimonial you can evidence, and the schema
appears automatically.

---

## Content that needs your review

Migration was faithful, but a few things in the original content are worth a
decision before you promote the new site:

1. **Fabricated demo links.** Several projects pointed at `*.nesturelabs.com`
   subdomains (`ecommerce-demo`, `healthcare-demo`, `analytics`, `crm`, …) that
   do not appear to resolve. Broken outbound links waste crawl budget and cost
   visitor trust, so those `liveUrl` values were seeded **empty**; the projects
   themselves are all still published. Add real URLs in the admin panel where
   they exist. The genuine links — Google Play, `pereras-paws.com`,
   `charmthiekshana.com`, `nesturelabs.com` — were kept.

2. **Testimonials.** Fifteen were migrated with named people and companies. Only
   you know which are real. See the section above for why this matters more than
   it looks.

3. **Blog articles.** The eight posts had titles but only placeholder bodies, so
   each now has a real, unique article written to match its title. Treat them as
   first drafts: read them, put them in your voice, and add your own examples.
   They are already good enough to index, and better in your words.

4. **Chatbot answers.** The assistant's knowledge base was ported verbatim,
   including one answer that names testimonial clients ("Sarah Johnson, CEO
   TechStart Inc") who do not match the testimonials list. Worth reconciling.

5. **Project claims.** Several descriptions cite specific outcomes ("improved
   efficiency by 60%", "increase client ROI by 45%"). Keep the ones you can
   stand behind.

---

## Troubleshooting

**`querySrv ECONNREFUSED` when connecting to Atlas.** Node's DNS client cannot
resolve the `mongodb+srv://` SRV record, usually because a corporate network,
VPN or sandbox blocks it. The system resolver is often fine even when Node's is
not — check with:

```bash
nslookup -type=SRV _mongodb._tcp.<cluster-host>.mongodb.net
nslookup -type=TXT  <cluster-host>.mongodb.net      # gives replicaSet + authSource
```

If those resolve, use the non-SRV form of the connection string, which lists the
shard hosts directly and needs no SRV lookup:

```
mongodb://USER:PASSWORD@host-00:27017,host-01:27017,host-02:27017/?ssl=true&replicaSet=<name>&authSource=admin&retryWrites=true&w=majority
```

This only matters locally. Vercel resolves SRV without issue, so keep the
`mongodb+srv://` URI in the Vercel environment variables.

**The deployed site shows no projects, posts or packages.** The environment
variables are missing or wrong on Vercel, and the pages have fallen back to
placeholder content. Quickest check: `/sitemap.xml` should list ~34 URLs. If it
lists 6, the app cannot reach MongoDB.

**Cannot connect from Vercel but works locally.** The Atlas Network Access list
does not include `0.0.0.0/0`. Local access works because your own IP was added
during onboarding; Vercel's functions use dynamic egress IPs and need the open
rule.

---

## Architecture notes

**Why one app rather than two.** The admin lives inside the public app under
`/admin`, so there is one Vercel project, one domain, one set of environment
variables and no CORS. The monorepo still pays off: `@charm/db` and `@charm/ui`
are consumable by a second app whenever you want one.

**Database access.** `packages/db` owns the Mongoose connection, cached on
`globalThis` so serverless cold starts do not exhaust Atlas connection limits.
Read functions in `apps/web/src/lib/content.ts` are wrapped in React's `cache()`
and each falls back to sensible defaults if Mongo is unreachable — the site
degrades to placeholder copy rather than returning a 500.

**Validation.** Zod schemas in `packages/db/src/schemas.ts` are the single source
of truth, shared by the admin forms, the server actions and the public contact
endpoint.

**Known advisory.** `npm audit` reports a PostCSS advisory reachable only through
Next.js 15's build tooling. It affects build-time CSS processing, not the
deployed site. It clears on the Next.js 16 upgrade, which was left alone here
because it is a major version bump and deserves its own change.
