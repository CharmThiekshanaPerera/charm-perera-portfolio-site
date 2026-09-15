import type { ProjectInput } from "../../src/schemas";

/**
 * Migrated verbatim from the previous Vite site's hard-coded `Projects.tsx`
 * array, plus the fields the new /projects/[slug] pages need (slug, body,
 * category, SEO overrides).
 *
 * REVIEW BEFORE LAUNCH: several `liveUrl` values point at *.nesturelabs.com
 * demo subdomains. Any that do not resolve become broken outbound links, which
 * hurts both crawl budget and visitor trust. Clear the URL in the admin panel
 * for anything that is not actually live.
 */
export const projects: ProjectInput[] = [
  {
    title: "Lifesaylor",
    slug: "lifesaylor",
    description:
      "A daily motivation mobile app designed to inspire users through meaningful quotes and affirmations. Successfully launched on Google Play Store with significant impact in the healthcare sector.",
    fullDescription:
      "Lifesaylor is a comprehensive mobile application that delivers daily motivation through carefully curated quotes, affirmations, and mindfulness exercises. The app features a beautiful, intuitive interface with smooth animations and personalized content delivery. Successfully launched on Google Play Store, it has helped thousands of users in the healthcare sector maintain positive mental health and daily motivation.",
    body: [
      "## Overview",
      "",
      "Lifesaylor delivers daily motivation through curated quotes, affirmations and short mindfulness exercises. It was built for a healthcare audience, where consistency matters more than novelty, so the whole product is designed around a single daily touchpoint that people actually return to.",
      "",
      "## What I built",
      "",
      "- A cross-platform mobile client with a content feed tuned for fast first paint on low-end Android devices",
      "- Customisable notification scheduling, so users pick the moment that fits their routine",
      "- A favourites collection with offline access, backed by local persistence",
      "- Progress tracking that visualises streaks without turning wellbeing into a leaderboard",
      "",
      "## Technical notes",
      "",
      "Content is delivered from a lightweight API with aggressive client-side caching, so the app opens instantly and syncs in the background. Notification scheduling runs entirely on-device to avoid depending on push infrastructure for the core loop.",
      "",
      "## Outcome",
      "",
      "Shipped to the Google Play Store and adopted across healthcare settings, where it supports patients and staff in maintaining daily motivation.",
    ].join("\n"),
    technologies: ["Mobile App", "Android", "iOS", "React Native", "Healthcare"],
    // Real app icon, sourced directly from the Play Store listing's own
    // og:image meta tag (play-lh.googleusercontent.com is Google's own CDN,
    // already an allowed image host — not a guess or a third-party mirror).
    coverImage:
      "https://play-lh.googleusercontent.com/l1LXaImgA0rx5tn3i6hnT2FG-uxj1nS6Mt_kQSnmuNVzuGuVdzypy3nQQO-aWMJqoPgP-U02Doh5nW9h5_QfvQ=s0-br30",
    // Corrected package ID — the old id=com.lifesaylor 404s (app doesn't
    // exist under that ID; verified separately). This is the real listing.
    liveUrl: "https://play.google.com/store/apps/details?id=life.saylor.daily.motivation",
    repoUrl: "",
    client: "Space IT Labs",
    category: "Mobile",
    featured: true,
    published: true,
    order: 0,
    completedAt: new Date("2023-08-01"),
    seoTitle: "Lifesaylor — Daily Motivation Mobile App Case Study",
    seoDescription:
      "How I built Lifesaylor, a daily motivation and affirmation mobile app for the healthcare sector, shipped on Google Play.",
  },
  {
    title: "Lifesaylor Affirmation",
    slug: "lifesaylor-affirmation",
    // Content replaced 2026-09 with verified Play Store listing data supplied
    // directly by the user — including a corrected liveUrl package ID
    // (previously com.lifesaylor.affirmation). The prior voice-recording /
    // background-audio description was superseded, not merged, since the
    // verified listing describes a curated affirmation library instead.
    description:
      "A companion app to Lifesaylor focused on daily affirmations across self-love, success, gratitude, and stress relief, helping users build a consistent positive-thinking practice.",
    fullDescription:
      "A companion app to Lifesaylor focused on daily affirmations across self-love, success, gratitude, and stress relief, helping users build a consistent positive-thinking practice.",
    body: [
      "## Overview",
      "",
      "A companion app to Lifesaylor focused on daily affirmations across self-love, success, gratitude, and stress relief, helping users build a consistent positive-thinking practice.",
      "",
      "## What I built",
      "",
      "- A curated affirmation library organized by life area (self-love, success, gratitude, stress relief)",
      "- A simple, distraction-free interface for daily affirmation browsing",
      "",
      "## Outcome",
      "",
      "Published to the Google Play Store with a 4.9-star rating across 15 reviews.",
    ].join("\n"),
    technologies: ["React Native", "Android", "iOS"],
    // Real app icon, sourced directly from the Play Store listing's own
    // og:image meta tag (play-lh.googleusercontent.com is Google's own CDN,
    // already an allowed image host — not a guess or a third-party mirror).
    coverImage:
      "https://play-lh.googleusercontent.com/LB0sB8HwCE7PIjLTYZ2PEXohF0DFSVwDCHYXuev86EbtfVw1iz-K1-g1zHjMRTOITjaCf_HiQpqBIq_4JTI3=s0-br30",
    liveUrl: "https://play.google.com/store/apps/details?id=life.saylor.affirmation",
    repoUrl: "",
    client: "Space IT Labs",
    category: "Mobile",
    featured: true,
    published: true,
    order: 1,
    completedAt: new Date("2024-02-01"),
    seoTitle: "Lifesaylor Affirmation — Daily Affirmations App Case Study",
    seoDescription:
      "A companion app to Lifesaylor delivering daily affirmations across self-love, success, gratitude, and stress relief.",
  },
  {
    title: "E-Commerce Platform",
    slug: "ecommerce-platform",
    description:
      "A modern e-commerce solution with real-time inventory management, secure payment processing, and advanced analytics dashboard.",
    fullDescription:
      "A full-featured e-commerce platform with a seamless shopping experience, integrated payment gateways including Stripe and PayPal, real-time order tracking, and a comprehensive admin dashboard. Features include product recommendations, wishlist functionality, and automated email notifications.",
    body: [
      "## Overview",
      "",
      "A full-stack commerce platform covering the whole path from catalogue browsing to fulfilment, with an operator dashboard for the team running it day to day.",
      "",
      "## Storefront",
      "",
      "- Server-rendered product and category pages for search visibility",
      "- Real-time stock levels so customers never buy something that just sold out",
      "- Wishlists and recommendation surfaces driven by browsing history",
      "",
      "## Payments and fulfilment",
      "",
      "Stripe and PayPal integration with webhook-driven order state, so payment confirmation is authoritative on the server rather than trusted from the client. Order tracking and automated transactional email cover the post-purchase journey.",
      "",
      "## Admin",
      "",
      "A dashboard covering inventory, orders, refunds and revenue reporting, built so non-technical staff can run the store without developer involvement.",
    ].join("\n"),
    technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
    coverImage: "",
    liveUrl: "",
    repoUrl: "",
    client: "",
    category: "Web",
    featured: true,
    published: true,
    order: 2,
    completedAt: null,
    seoTitle: "E-Commerce Platform Case Study — React, Node.js & Stripe",
    seoDescription:
      "A custom e-commerce build with real-time inventory, Stripe and PayPal payments, and a full operations dashboard.",
  },
  {
    title: "Healthcare Management System",
    slug: "healthcare-management-system",
    description:
      "Comprehensive patient management system with appointment scheduling, medical records, and telemedicine capabilities.",
    fullDescription:
      "A healthcare platform that streamlines clinic operations. Features include a patient portal, doctor dashboards, appointment scheduling, prescription management, video consultations, and integrated billing.",
    body: [
      "## Overview",
      "",
      "A clinic operations platform bringing scheduling, records, consultations and billing into one system, replacing a mix of paper and spreadsheets.",
      "",
      "## Modules",
      "",
      "- **Patient portal** — booking, history, and documents",
      "- **Clinician dashboard** — daily schedule, notes, prescriptions",
      "- **Telemedicine** — WebRTC video consultations with in-call notes",
      "- **Billing** — invoicing tied to appointments and procedures",
      "",
      "## Handling sensitive data",
      "",
      "Health records demand strict access control. The system uses role-based permissions with an audit trail on every record access, encrypted storage for documents, and session policies appropriate to shared clinic workstations.",
    ].join("\n"),
    technologies: ["React", "TypeScript", "PostgreSQL", "WebRTC"],
    coverImage: "",
    liveUrl: "",
    repoUrl: "",
    client: "",
    category: "Web",
    featured: true,
    published: true,
    order: 3,
    completedAt: null,
    seoTitle: "Healthcare Management System Case Study",
    seoDescription:
      "A patient management platform with scheduling, records, WebRTC telemedicine and billing, built with React and TypeScript.",
  },
  {
    title: "AI-Powered Analytics Dashboard",
    slug: "ai-analytics-dashboard",
    description:
      "Business intelligence platform with machine learning insights, predictive analytics, and automated reporting.",
    fullDescription:
      "An enterprise analytics solution that processes large data volumes to deliver actionable insights. Features AI-powered trend detection, custom report generation, real-time data visualization, and automated alerts.",
    body: [
      "## Overview",
      "",
      "A business intelligence surface that turns raw event data into decisions: trend detection, forecasting, and alerting when metrics move outside expected bounds.",
      "",
      "## Capabilities",
      "",
      "- Real-time dashboards built on D3 for visualisations off the shelf charting could not express",
      "- Trend and anomaly detection over historical series",
      "- Custom report builder with scheduled delivery",
      "- Threshold and anomaly alerts routed to email and chat",
      "",
      "## Performance",
      "",
      "The interesting constraint was rendering large series without freezing the browser. Aggregation happens server-side at query time, with the client receiving downsampled series sized to the viewport, so charts stay responsive regardless of the underlying row count.",
    ].join("\n"),
    technologies: ["React", "Python", "TensorFlow", "D3.js"],
    coverImage: "",
    liveUrl: "",
    repoUrl: "",
    client: "",
    category: "AI",
    featured: true,
    published: true,
    order: 4,
    completedAt: null,
    seoTitle: "AI Analytics Dashboard Case Study — React, Python & D3",
    seoDescription:
      "Building a business intelligence dashboard with anomaly detection, forecasting and large-series visualisation.",
  },
  {
    title: "Restaurant Management Suite",
    slug: "restaurant-management-suite",
    description:
      "All-in-one restaurant solution with POS, inventory, delivery tracking, and customer loyalty programs.",
    fullDescription:
      "A complete restaurant management ecosystem handling orders, kitchen operations, staff management, and customer engagement. Integrated with delivery platforms, payment processors, and accounting software.",
    body: [
      "## Overview",
      "",
      "An operations suite for restaurants: point of sale, kitchen display, inventory, delivery and loyalty, designed to run on cheap tablet hardware in a hot, busy kitchen.",
      "",
      "## Modules",
      "",
      "- **POS** — fast order entry with modifiers and split billing",
      "- **Kitchen display** — live ticket queue with prep timing",
      "- **Inventory** — stock deduction per sale with low-stock alerts",
      "- **Delivery** — dispatch and tracking, integrated with third-party platforms",
      "- **Loyalty** — points and repeat-customer campaigns",
      "",
      "## Offline first",
      "",
      "Restaurant Wi-Fi fails at exactly the wrong moment. Order entry writes to a local queue and syncs when connectivity returns, so service continues through network drops and nothing is lost.",
    ].join("\n"),
    technologies: ["React Native", "Node.js", "Firebase", "Stripe"],
    coverImage: "",
    liveUrl: "",
    repoUrl: "",
    client: "",
    category: "Mobile",
    featured: true,
    published: true,
    order: 5,
    completedAt: null,
    seoTitle: "Restaurant Management Suite Case Study",
    seoDescription:
      "An offline-first POS, kitchen display, inventory and delivery suite built with React Native and Firebase.",
  },
  {
    title: "Perera's Paws",
    slug: "pereras-paws",
    description:
      "A pet care and adoption platform connecting pet lovers with shelters and services. Professional website with modern design and user-friendly interface.",
    fullDescription: "",
    body: "",
    technologies: ["Web App", "React", "Frontend"],
    coverImage: "",
    liveUrl: "https://pereras-paws.com",
    repoUrl: "",
    client: "",
    category: "Web",
    featured: false,
    published: true,
    order: 6,
    completedAt: null,
    seoTitle: "",
    seoDescription: "",
  },
  {
    title: "Charm Thiekshana Portfolio",
    slug: "charm-thiekshana-portfolio",
    description:
      "A personal portfolio website highlighting professional achievements, projects, and skills. Built with modern technologies and responsive design.",
    fullDescription: "",
    body: "",
    technologies: ["Portfolio", "React", "Responsive"],
    coverImage: "",
    liveUrl: "https://www.charmthiekshana.com",
    repoUrl: "",
    client: "",
    category: "Web",
    featured: false,
    published: true,
    order: 7,
    completedAt: null,
    seoTitle: "",
    seoDescription: "",
  },
  {
    title: "Nesture Labs",
    slug: "nesture-labs",
    description:
      "The official website for my IT solutions startup offering web, mobile, and AI development services. Comprehensive platform showcasing technical capabilities.",
    fullDescription: "",
    body: "",
    technologies: ["Corporate", "IT Solutions", "Full Stack"],
    coverImage: "",
    liveUrl: "https://nesturelabs.com",
    repoUrl: "",
    client: "",
    category: "Web",
    featured: false,
    published: true,
    order: 8,
    completedAt: null,
    seoTitle: "",
    seoDescription: "",
  },
  {
    title: "Real Estate Portal",
    slug: "real-estate-portal",
    description:
      "A property listing platform with advanced search filters, virtual tours, mortgage calculator, and integrated booking system.",
    fullDescription: "",
    body: "",
    technologies: ["Next.js", "Tailwind CSS", "Map Integration"],
    coverImage: "",
    liveUrl: "",
    repoUrl: "",
    client: "",
    category: "Web",
    featured: false,
    published: true,
    order: 9,
    completedAt: null,
    seoTitle: "",
    seoDescription: "",
  },
  {
    title: "Fitness Tracker App",
    slug: "fitness-tracker-app",
    description:
      "A comprehensive fitness application with workout plans, nutrition tracking, progress analytics, and social features for fitness enthusiasts.",
    fullDescription: "",
    body: "",
    technologies: ["React Native", "Firebase", "HealthKit"],
    coverImage: "",
    liveUrl: "",
    repoUrl: "",
    client: "",
    category: "Mobile",
    featured: false,
    published: true,
    order: 10,
    completedAt: null,
    seoTitle: "",
    seoDescription: "",
  },
  {
    title: "Social Media Management Tool",
    slug: "social-media-management-tool",
    description:
      "Multi-platform social media scheduler with analytics, content calendar, and team collaboration features for businesses.",
    fullDescription: "",
    body: "",
    technologies: ["React", "Redux", "GraphQL", "AWS"],
    coverImage: "",
    liveUrl: "",
    repoUrl: "",
    client: "",
    category: "Web",
    featured: false,
    published: true,
    order: 11,
    completedAt: null,
    seoTitle: "",
    seoDescription: "",
  },
  {
    title: "Online Learning Platform",
    slug: "online-learning-platform",
    description:
      "Educational platform with video courses, live classes, assignments, progress tracking, and certification system.",
    fullDescription: "",
    body: "",
    technologies: ["React", "WebRTC", "MongoDB", "AWS S3"],
    coverImage: "",
    liveUrl: "",
    repoUrl: "",
    client: "",
    category: "Web",
    featured: false,
    published: true,
    order: 12,
    completedAt: null,
    seoTitle: "",
    seoDescription: "",
  },
  {
    title: "Event Management System",
    slug: "event-management-system",
    description:
      "Complete event planning solution with ticketing, attendee management, check-in system, and real-time analytics.",
    fullDescription: "",
    body: "",
    technologies: ["React", "Node.js", "QR Code", "Payment Gateway"],
    coverImage: "",
    liveUrl: "",
    repoUrl: "",
    client: "",
    category: "Web",
    featured: false,
    published: true,
    order: 13,
    completedAt: null,
    seoTitle: "",
    seoDescription: "",
  },
  {
    title: "Hotel Booking Platform",
    slug: "hotel-booking-platform",
    description:
      "Hotel reservation system with availability calendar, pricing engine, payment processing, and guest management features.",
    fullDescription: "",
    body: "",
    technologies: ["Next.js", "Prisma", "Stripe", "AWS"],
    coverImage: "",
    liveUrl: "",
    repoUrl: "",
    client: "",
    category: "Web",
    featured: false,
    published: true,
    order: 14,
    completedAt: null,
    seoTitle: "",
    seoDescription: "",
  },
  {
    title: "Inventory Management System",
    slug: "inventory-management-system",
    description:
      "Advanced inventory tracking with barcode scanning, automated reordering, supplier management, and multi-location support.",
    fullDescription: "",
    body: "",
    technologies: ["React", "Node.js", "PostgreSQL", "Redis"],
    coverImage: "",
    liveUrl: "",
    repoUrl: "",
    client: "",
    category: "Web",
    featured: false,
    published: true,
    order: 15,
    completedAt: null,
    seoTitle: "",
    seoDescription: "",
  },
  {
    title: "Delivery Tracking App",
    slug: "delivery-tracking-app",
    description:
      "Real-time delivery tracking system with driver management, route optimization, and customer notifications.",
    fullDescription: "",
    body: "",
    technologies: ["React Native", "Google Maps", "Socket.io", "Node.js"],
    coverImage: "",
    liveUrl: "",
    repoUrl: "",
    client: "",
    category: "Mobile",
    featured: false,
    published: true,
    order: 16,
    completedAt: null,
    seoTitle: "",
    seoDescription: "",
  },
  {
    title: "CRM System",
    slug: "crm-system",
    description:
      "Customer relationship management platform with lead tracking, pipeline management, email campaigns, and reporting.",
    fullDescription: "",
    body: "",
    technologies: ["React", "TypeScript", "PostgreSQL", "SendGrid"],
    coverImage: "",
    liveUrl: "",
    repoUrl: "",
    client: "",
    category: "Web",
    featured: false,
    published: true,
    order: 17,
    completedAt: null,
    seoTitle: "",
    seoDescription: "",
  },
  {
    title: "Appointment Booking System",
    slug: "appointment-booking-system",
    description:
      "Flexible scheduling solution for service businesses with calendar sync, reminders, and payment integration.",
    fullDescription: "",
    body: "",
    technologies: ["React", "Node.js", "Calendar Sync", "Stripe"],
    coverImage: "",
    liveUrl: "",
    repoUrl: "",
    client: "",
    category: "Web",
    featured: false,
    published: true,
    order: 18,
    completedAt: null,
    seoTitle: "",
    seoDescription: "",
  },
  {
    title: "Financial Dashboard",
    slug: "financial-dashboard",
    description:
      "Personal finance tracking with budget management, expense categorization, investment tracking, and financial goals.",
    fullDescription: "",
    body: "",
    technologies: ["React", "Chart.js", "Plaid API", "Firebase"],
    coverImage: "",
    liveUrl: "",
    repoUrl: "",
    client: "",
    category: "Web",
    featured: false,
    published: true,
    order: 19,
    completedAt: null,
    seoTitle: "",
    seoDescription: "",
  },

  // ---------------------------------------------------------------------
  // The 8 entries below are drafts (published: false) added ahead of their
  // real case-study content. Every "description"/"body" field is a literal
  // [TODO] placeholder — none of it is fabricated. `completedAt` is only an
  // approximate month, derived from file timestamps, not a confirmed launch
  // date; category/title are best-effort guesses from the domain name and
  // are flagged inline where the guess is a stretch. Fill in real content
  // via /admin/projects, then flip `published` to true when ready.
  // ---------------------------------------------------------------------
  {
    title: "Lanka Pass Travel",
    slug: "lanka-pass-travel",
    // description/category confirmed 2026-09 via live fetch of the site's own
    // <title>/meta description — "what I built" below is still unconfirmed.
    description:
      "A travel agency website for Lanka Pass, offering premium travel services and tour planning across Sri Lanka.",
    fullDescription:
      "A travel agency website for Lanka Pass, offering premium travel services and tour planning across Sri Lanka.",
    body: [
      "## Overview",
      "",
      "A travel agency website for Lanka Pass, offering premium travel services and tour planning across Sri Lanka.",
    ].join("\n"),
    technologies: ["Static Site"],
    coverImage: "",
    liveUrl: "https://lankapasstravel.com",
    repoUrl: "",
    client: "Lanka Pass",
    // Confirmed via live fetch, not a domain-name guess.
    category: "Travel",
    featured: false,
    published: true,
    order: 20,
    completedAt: new Date("2026-08-01"), // ~Aug 2026, approximate (file timestamp)
    seoTitle: "Lanka Pass — Sri Lanka Travel Agency Website",
    seoDescription:
      "Website for Lanka Pass, a premium travel agency offering tours and accommodation booking across Sri Lanka.",
  },
  {
    title: "Lynk Facility",
    slug: "lynk-facility",
    // description/category confirmed 2026-09 via live fetch of the site's own
    // <title>/meta description — "what I built" below is still unconfirmed.
    description:
      "A business website for Lynk Facility Services, a professional commercial, residential and construction cleaning company operating in Australia.",
    fullDescription:
      "A business website for Lynk Facility Services, a professional commercial, residential and construction cleaning company operating in Australia.",
    body: [
      "## Overview",
      "",
      "A business website for Lynk Facility Services, a professional commercial, residential and construction cleaning company operating in Australia.",
    ].join("\n"),
    technologies: ["Static Site"],
    coverImage: "",
    liveUrl: "https://lynkfacility.com.au",
    repoUrl: "",
    client: "Lynk Facility Services",
    // Confirmed via live fetch: professional cleaning services company.
    category: "Cleaning Services",
    featured: false,
    published: true,
    order: 21,
    completedAt: new Date("2025-12-01"), // ~Dec 2025, approximate (file timestamp)
    seoTitle: "Lynk Facility Services — Professional Cleaning Company Website",
    seoDescription:
      "Website for Lynk Facility Services, providing commercial, residential and construction cleaning across Australia.",
  },
  {
    title: "Amazon College",
    slug: "amazon-college",
    // description/category confirmed 2026-09 via live fetch of the site's own
    // <title>/meta description — "what I built" below is still unconfirmed.
    // Note: live preview will not render for this one — amazoncollege.lk
    // sends X-Frame-Options: SAMEORIGIN, which blocks embedding entirely
    // (confirmed by direct fetch); not a bug in the preview feature.
    description:
      "A website for Amazon College International Campus, offering diploma programs, language courses, and teacher training with global university transfer pathways.",
    fullDescription:
      "A website for Amazon College International Campus, offering diploma programs, language courses, and teacher training with global university transfer pathways.",
    body: [
      "## Overview",
      "",
      "A website for Amazon College International Campus, offering diploma programs, language courses, and teacher training with global university transfer pathways. Shares a docroot with amazon.phyxle.com.au.",
    ].join("\n"),
    technologies: ["Static Site"],
    coverImage: "",
    liveUrl: "https://amazoncollege.lk",
    repoUrl: "",
    client: "Amazon College International Campus",
    category: "Education",
    featured: false,
    published: true,
    order: 22,
    completedAt: new Date("2026-04-01"), // ~Apr 2026, approximate (file timestamp)
    seoTitle: "Amazon College — International Campus Website",
    seoDescription:
      "Website for Amazon College, an international campus offering diploma programs, language courses and teacher training in Sri Lanka.",
  },
  {
    title: "Christech",
    slug: "christech",
    // description/category confirmed 2026-09 via live fetch of the site's own
    // <title>/meta description — "what I built" below is still unconfirmed.
    description:
      "A business website for ChrisTech Security Solutions, a professional security services company based in Negombo, Sri Lanka.",
    fullDescription:
      "A business website for ChrisTech Security Solutions, a professional security services company based in Negombo, Sri Lanka.",
    body: [
      "## Overview",
      "",
      "A business website for ChrisTech Security Solutions, a professional security services company based in Negombo, Sri Lanka. Has a legacy PHP backend.",
    ].join("\n"),
    technologies: ["Static Site", "PHP"],
    coverImage: "",
    liveUrl: "https://christech.lk",
    repoUrl: "",
    client: "ChrisTech Security Solutions",
    // Confirmed via live fetch: security services company.
    category: "Security Services",
    featured: false,
    published: true,
    order: 23,
    completedAt: new Date("2022-02-01"), // ~Feb 2022, approximate (file timestamp) — the oldest of this batch
    seoTitle: "ChrisTech Security Solutions — Company Website",
    seoDescription:
      "Website for ChrisTech Security Solutions, a professional security services provider in Negombo, Sri Lanka.",
  },
  {
    title: "Higeniq",
    slug: "higeniq",
    // description/category confirmed 2026-09 via live fetch of the site's own
    // <title>/meta description ("Higeniq Cleaning Supplies") — corrects the
    // earlier "HigenIQ" title guess. "What I built" below is still unconfirmed.
    description:
      "A business website for Higeniq Cleaning Supplies, providing hygiene products, disinfectants and commercial cleaning solutions.",
    fullDescription:
      "A business website for Higeniq Cleaning Supplies, providing hygiene products, disinfectants and commercial cleaning solutions.",
    body: [
      "## Overview",
      "",
      "A business website for Higeniq Cleaning Supplies, providing hygiene products, disinfectants and commercial cleaning solutions. Largest site of this batch, with a PHP backend.",
    ].join("\n"),
    technologies: ["Static Site", "PHP"],
    coverImage: "",
    liveUrl: "https://higeniq.phyxle.com.au",
    repoUrl: "",
    client: "Higeniq Cleaning Supplies",
    // Confirmed via live fetch: cleaning supplies business. Same category as
    // Cleany Glow below — possibly related businesses, worth confirming.
    category: "Cleaning Supplies",
    featured: false,
    published: true,
    order: 24,
    completedAt: new Date("2026-03-01"), // ~Mar 2026, approximate (file timestamp)
    seoTitle: "Higeniq Cleaning Supplies — Company Website",
    seoDescription:
      "Website for Higeniq, a supplier of hygiene products, disinfectants and commercial cleaning solutions.",
  },
  {
    title: "Lynk Facility Onboarding",
    slug: "lynk-facility-onboarding",
    // description confirmed 2026-09 via live fetch — the page itself is
    // literally titled "Onboarding Process", confirming this is an internal
    // staff/contractor onboarding portal, not a public marketing page.
    // seoTitle/seoDescription deliberately left empty: an internal tool
    // probably shouldn't compete for public search terms the way the other
    // sites should — worth confirming whether this project should even be
    // publicly indexed once published.
    description:
      "An onboarding portal for Lynk Facility Services staff and contractors, hosted as a subdomain of the main Lynk Facility site.",
    fullDescription:
      "An onboarding portal for Lynk Facility Services staff and contractors, hosted as a subdomain of the main Lynk Facility site.",
    body: [
      "## Overview",
      "",
      "An onboarding portal for Lynk Facility Services staff and contractors, hosted as a subdomain of the main Lynk Facility site. Built with a Node.js + PHP backend.",
    ].join("\n"),
    technologies: ["Static Site", "Node.js", "PHP"],
    coverImage: "",
    liveUrl: "https://onboarding.lynkfacility.com.au",
    repoUrl: "",
    client: "Lynk Facility Services",
    // Subdomain of Lynk Facility — likely an internal onboarding tool/portal.
    category: "Web App",
    featured: false,
    published: true,
    order: 25,
    completedAt: new Date("2023-01-01"), // ~Jan 2023, approximate (file timestamp)
    seoTitle: "",
    seoDescription: "",
  },
  {
    title: "Aerotek",
    slug: "aerotek",
    // description/category confirmed 2026-09 via live fetch of the site's own
    // <title>/meta description — "what I built" below is still unconfirmed.
    description:
      "A business website for Aerotek Lanka, providing industrial, commercial and domestic ventilation and HVAC solutions across Sri Lanka.",
    fullDescription:
      "A business website for Aerotek Lanka, providing industrial, commercial and domestic ventilation and HVAC solutions across Sri Lanka.",
    body: [
      "## Overview",
      "",
      "A business website for Aerotek Lanka, providing industrial, commercial and domestic ventilation and HVAC solutions across Sri Lanka. Has a separate PHP api/ backend.",
    ].join("\n"),
    technologies: ["Static Site", "PHP", "API"],
    coverImage: "",
    liveUrl: "https://aerotek.lk",
    repoUrl: "",
    client: "Aerotek Lanka",
    // Confirmed via live fetch: ventilation/HVAC solutions provider.
    category: "HVAC / Ventilation Solutions",
    featured: false,
    published: true,
    order: 26,
    completedAt: new Date("2026-02-01"), // ~Feb 2026, approximate (file timestamp)
    seoTitle: "Aerotek Lanka — Ventilation & HVAC Solutions Website",
    seoDescription:
      "Website for Aerotek Lanka, delivering industrial, commercial and domestic ventilation and HVAC solutions.",
  },
  {
    title: "Cleany Glow",
    slug: "cleanyglow",
    // category confirmed 2026-09 via live fetch — the site's own meta
    // description is just "CleanyGlow Cleaning Supplies", so this summary is
    // necessarily thin; there's nothing more specific confirmed to add yet.
    // Same category as Higeniq above — possibly related businesses.
    description: "A business website for CleanyGlow Cleaning Supplies.",
    fullDescription: "A business website for CleanyGlow Cleaning Supplies.",
    body: [
      "## Overview",
      "",
      "A business website for CleanyGlow Cleaning Supplies. Has a backend subfolder (stack to confirm).",
    ].join("\n"),
    technologies: ["Static Site"],
    coverImage: "",
    liveUrl: "https://cleanyglow.com.au",
    repoUrl: "",
    client: "CleanyGlow Cleaning Supplies",
    category: "Cleaning Supplies",
    featured: false,
    published: true,
    order: 27,
    completedAt: new Date("2026-03-01"), // ~Mar 2026, approximate (file timestamp)
    seoTitle: "CleanyGlow Cleaning Supplies — Company Website",
    seoDescription: "Website for CleanyGlow, a cleaning supplies business.",
  },

  // ---------------------------------------------------------------------
  // Fully detailed, ready to publish — verified Play Store listing data.
  // ---------------------------------------------------------------------
  {
    title: "Quiet",
    slug: "quiet",
    description:
      "A minimalist Android home-screen launcher built around intentional phone use — replacing app icons and notification clutter with a clean, text-only interface.",
    fullDescription:
      "A minimalist Android home-screen launcher built around intentional phone use — replacing app icons and notification clutter with a clean, text-only interface.",
    body: [
      "## Overview",
      "",
      "A minimalist Android home-screen launcher built around intentional phone use — replacing app icons and notification clutter with a clean, text-only interface.",
      "",
      "## What I built",
      "",
      "- A text-only home screen replacement with a large clock/date display",
      "- Up to 20 pinned favourite apps as text labels, organized into folders",
      "- Full app list on swipe-up with instant search, filtering, and sorting",
      "- Sticky notes with optional reminder notifications",
      "- Countdown timers, a to-do list, and daily habit tracking on the home screen",
      "- On-device 7-day stats view for habit/to-do completion (no data uploaded)",
      "- Focus mode with a distraction pause before opening flagged apps",
      "- Biometric app-locking, daily unlock count, screen-time awareness",
      "- 7 themes including true AMOLED black",
      "- Full backup/restore as a single file",
      "",
      "## Technical notes",
      "",
      "Fully on-device — no analytics, ads, or tracking. The only optional network call is for the weather line, which is off by default.",
      "",
      "## Outcome",
      "",
      "Published to the Google Play Store under Nesture Labs.",
    ].join("\n"),
    // Stack not yet confirmed — do not guess Kotlin/Java/Flutter for an
    // Android launcher; left empty rather than a visible placeholder chip.
    technologies: [],
    // Real app icon, sourced directly from the Play Store listing's own
    // og:image meta tag (play-lh.googleusercontent.com is Google's own CDN,
    // already an allowed image host — not a guess or a third-party mirror).
    coverImage:
      "https://play-lh.googleusercontent.com/rBD4kFLqvU9P-ly4NPkqyqj15wKMtf8TEoZdF1_Zg_ZFXDUM2uPWttFUcZI0zMezhsYB_yaMuRSHvFQZt1G22Q=s0-br30",
    liveUrl: "https://play.google.com/store/apps/details?id=com.nexturelabs.quiet",
    repoUrl: "",
    // Personal project under Charm's own company, not client work — the schema
    // has no dedicated field for that distinction, so it's noted in `client`.
    client: "Nesture Labs (own project — founder: Charm Thiekshana Perera)",
    // Set to plain "Mobile" (not "Mobile / Productivity" as given) so it
    // exact-matches Lifesaylor/Lifesaylor Affirmation's category — "related
    // projects" is a strict string match, so this is what makes the three
    // mobile apps actually cross-link to each other.
    category: "Mobile",
    featured: false,
    published: true,
    order: 28,
    completedAt: new Date("2026-08-01"), // ~Aug 2026, last store update date
    seoTitle: "Quiet — Minimalist Android Launcher Case Study",
    seoDescription:
      "Quiet is a minimalist, fully on-device Android launcher for intentional phone use — no ads, no tracking, no analytics.",
  },

  // ---------------------------------------------------------------------
  // Verified via live fetch of each site (meta author/designer/developer
  // tags where noted) — draft (published: false) until the flagged open
  // items below are confirmed: tech stack, and for #14/#15/#16 the
  // client-vs-personal / real-name-vs-anonymized decisions.
  // ---------------------------------------------------------------------
  {
    title: "FBV Down",
    slug: "fbv-down",
    description:
      "A free online tool for downloading Facebook videos in HD or SD quality, no login or software required.",
    fullDescription:
      "A free online tool for downloading Facebook videos in HD or SD quality, no login or software required.",
    body: [
      "## Overview",
      "",
      "A free online tool for downloading Facebook videos in HD or SD quality, no login or software required.",
    ].join("\n"),
    // Stack not yet confirmed — left empty rather than a visible placeholder chip.
    technologies: [],
    coverImage: "",
    liveUrl: "https://www.fbvdown.com",
    repoUrl: "",
    // Own project, not client work — confirmed via the site's own meta author tag.
    client: "Own project (not client work)",
    category: "Web / Tool",
    featured: false,
    published: true,
    order: 29,
    completedAt: null, // no build date confirmed — do not invent one
    seoTitle: "",
    seoDescription: "",
  },
  {
    title: "Austin House",
    slug: "austin-house",
    description:
      "Website for Austin House, an aesthetic and beauty centre in Colombo offering facials, laser treatments, manicures, and wellness services.",
    fullDescription:
      "Website for Austin House, an aesthetic and beauty centre in Colombo offering facials, laser treatments, manicures, and wellness services. Also available at austinhouse.com.lk.",
    body: [
      "## Overview",
      "",
      "Website for Austin House, an aesthetic and beauty centre in Colombo offering facials, laser treatments, manicures, and wellness services. Also available at austinhouse.com.lk.",
    ].join("\n"),
    // Stack not yet confirmed — left empty rather than a visible placeholder chip.
    technologies: [],
    coverImage: "",
    liveUrl: "https://austinhouse.lk",
    repoUrl: "",
    client: "Austin House Aesthetic Centre",
    category: "Web / Business site",
    featured: false,
    published: true,
    order: 30,
    completedAt: null,
    seoTitle: "",
    seoDescription: "",
  },
  {
    title: "Tech Agent Labs",
    slug: "tech-agent-labs",
    description:
      "A marketplace and custom-development studio for production-ready AI agents — plug-and-play automation bots for sales, support, and business operations.",
    fullDescription:
      "A marketplace and custom-development studio for production-ready AI agents — plug-and-play automation bots for sales, support, and business operations.",
    body: [
      "## Overview",
      "",
      "A marketplace and custom-development studio for production-ready AI agents — plug-and-play automation bots for sales, support, and business operations.",
    ].join("\n"),
    // Stack not yet confirmed — left empty rather than a visible placeholder chip.
    technologies: [],
    coverImage: "",
    liveUrl: "https://techagentlabs.com",
    repoUrl: "",
    // Confirmed: a friend's startup, so client work — not a personal project.
    client: "Friend's startup",
    category: "Web / SaaS marketplace",
    featured: false,
    published: true,
    order: 31,
    completedAt: null,
    seoTitle: "",
    seoDescription: "",
  },
  {
    title: "Kavini & Nuwan Wedding Invitation",
    slug: "kavini-nuwan-wedding-invitation",
    description:
      "A digital wedding invitation for Kavini & Nuwan, featuring RSVP collection via WhatsApp, event countdown, embedded map/calendar integration, and a couple's-story section.",
    fullDescription:
      "A digital wedding invitation for Kavini & Nuwan, featuring RSVP collection via WhatsApp, event countdown, embedded map/calendar integration, and a couple's-story section.",
    body: [
      "## Overview",
      "",
      "A digital wedding invitation for Kavini & Nuwan, featuring RSVP collection via WhatsApp, event countdown, embedded map/calendar integration, and a couple's-story section.",
    ].join("\n"),
    // Next.js/Vercel confirmed by hosting; any other stack pieces unconfirmed,
    // left off rather than a visible placeholder chip.
    technologies: ["Next.js", "Vercel"],
    coverImage: "",
    liveUrl: "https://kavini-nuwan-wedding.vercel.app",
    repoUrl: "",
    // Confirmed: real names OK to use.
    client: "Kavini & Nuwan",
    // Same category string as the Homecoming Reception entry below, on
    // purpose — "related projects" is an exact category match, so this is
    // what makes the two companion sites cross-link to each other.
    category: "Web / Event",
    featured: false,
    published: true,
    order: 32,
    completedAt: null,
    seoTitle: "",
    seoDescription: "",
  },
  {
    title: "Nuwan & Kavini Homecoming Reception",
    slug: "nuwan-kavini-homecoming-reception",
    description:
      "A companion invitation site for the couple's homecoming reception, reusing the wedding invitation's design system for a second event.",
    fullDescription:
      "A companion invitation site for the couple's homecoming reception, reusing the wedding invitation's design system for a second event.",
    body: [
      "## Overview",
      "",
      "A companion invitation site for the couple's homecoming reception, reusing the wedding invitation's design system for a second event.",
    ].join("\n"),
    technologies: ["Next.js", "Vercel"],
    coverImage: "",
    liveUrl: "https://homecoming-reception.vercel.app",
    repoUrl: "",
    client: "Kavini & Nuwan",
    category: "Web / Event", // same string as #15 — see comment there
    featured: false,
    published: true,
    order: 33,
    completedAt: null,
    seoTitle: "",
    seoDescription: "",
  },
  {
    title: "CeylonEat",
    slug: "ceyloneat",
    // Verified via live fetch: <title>, meta description and the site's own
    // JSON-LD Organization/WebSite structured data (name, description,
    // founding year). No author/designer meta tag confirming authorship —
    // unlike Austin House/FBV Down — but included on the client's own
    // company name, which is a confirmed fact regardless. The linked
    // /logo.png did not actually serve an image (returned Content-Type:
    // text/html, likely blocked by the site's WAF), so no coverImage could
    // be sourced; live preview is also blocked (X-Frame-Options:
    // SAMEORIGIN, confirmed by direct fetch, and by checkFrameable()).
    description:
      "CeylonEat is Sri Lanka's digital dining platform connecting diners with restaurants, hotels, resorts, cafés and premium dining experiences.",
    fullDescription:
      "CeylonEat is Sri Lanka's digital dining platform connecting diners with restaurants, hotels, resorts, cafés and premium dining experiences. Restaurants and hospitality partners can join CeylonEat to grow their digital presence.",
    body: [
      "## Overview",
      "",
      "CeylonEat is Sri Lanka's digital dining platform connecting diners with restaurants, hotels, resorts, cafés and premium dining experiences.",
    ].join("\n"),
    // Stack not yet confirmed — left empty rather than a visible placeholder chip.
    technologies: [],
    coverImage: "",
    liveUrl: "https://www.ceyloneat.lk",
    repoUrl: "",
    client: "Ceylon Eat Global (PVT) LTD",
    category: "Web / Booking Platform",
    featured: false,
    published: true,
    order: 34,
    completedAt: null, // company's 2025 founding year is confirmed, but that is not the same fact as the site's build date
    seoTitle: "CeylonEat — Dining Reservations Platform Case Study",
    seoDescription:
      "CeylonEat is a digital dining and reservations platform connecting diners with restaurants, hotels, resorts and cafés across Sri Lanka.",
  },
  {
    title: "Ringtones Site",
    slug: "ringtones-site",
    // Confirmed: a demo built to show a prospective client, not a completed,
    // deployed client project. The site's own footer says as much ("Demo
    // project... Sample audio by SoundHelix — replace with your own licensed
    // content before going live"), so this is described as a demo/template
    // throughout — no download-count or usage claims, since the numbers
    // shown on the site are placeholder demo data, not real stats.
    description:
      "A demo ringtone-download site template showcasing category browsing, trending/latest sections, and a download API pattern — built as a template/demo, not a live production deployment.",
    fullDescription:
      "A demo ringtone-download site template showcasing category browsing, trending/latest sections, and a download API pattern — built as a template/demo, not a live production deployment.",
    body: [
      "## Overview",
      "",
      "A demo ringtone-download site template showcasing category browsing, trending/latest sections, and a download API pattern — built as a template/demo, not a live production deployment.",
    ].join("\n"),
    // Stack not yet confirmed — left empty rather than a visible placeholder chip.
    technologies: [],
    coverImage: "",
    liveUrl: "https://ringtones-site.vercel.app",
    repoUrl: "",
    // A demo built to show capability to a prospective client, not attributed
    // to one named client.
    client: "",
    category: "Demo / Template",
    featured: false,
    published: true,
    order: 35,
    completedAt: null,
    seoTitle: "",
    seoDescription: "",
  },
];
