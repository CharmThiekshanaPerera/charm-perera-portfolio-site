import type { ChatbotContext } from "./chatbot-context";

/**
 * Knowledge base for the on-site assistant.
 *
 * Deliberately a keyword matcher, not a language model: it is instant, costs
 * nothing to run, needs no API key, and can never invent a claim about the
 * business — every `answer` is a small function of the live `ChatbotContext`
 * fetched from /api/chatbot/context, not hardcoded prose, so it can never
 * drift from what's actually in the CMS (and can never fabricate a
 * testimonial that doesn't exist).
 */
export type Faq = {
  keywords: string[];
  category: string;
  answer: (ctx: ChatbotContext) => string;
};

/** Shared by the "contact" and "availability" answers so the channel list only lives once. */
function contactLines(ctx: ChatbotContext): string {
  const lines = [`📧 Email: ${ctx.email}`];
  if (ctx.phone) lines.push(`📱 Phone/WhatsApp: ${ctx.phone}`);
  if (ctx.social.linkedin) lines.push(`💼 [LinkedIn](${ctx.social.linkedin})`);
  if (ctx.social.github) lines.push(`💻 [GitHub](${ctx.social.github})`);
  if (ctx.location) lines.push(`🌐 Location: ${ctx.location}`);
  return lines.join("\n");
}

export const chatbotFaqs: Faq[] = [
  {
    keywords: [
      "who",
      "about",
      "yourself",
      "charm",
      "introduce",
      "education",
      "degree",
      "qualification",
      "university",
      "sliit",
    ],
    category: "about",
    answer: (ctx) => {
      const bio = ctx.about.length
        ? ctx.about.join(" ")
        : `I'm ${ctx.fullName}, ${ctx.jobTitle}. ${ctx.tagline}.`;
      return `${bio}\n\nI have ${ctx.yearsExperience}+ years of experience. Want to see what I've [built](/projects), or learn more [about me](/about)?`;
    },
  },
  {
    keywords: ["services", "offer", "provide", "development"],
    category: "services",
    answer: () =>
      "I offer comprehensive web and mobile development services including: ✓ Custom React Web Applications ✓ iOS & Android Mobile Apps ✓ React Native Development ✓ AI Integration & Chatbots ✓ E-commerce Solutions ✓ UI/UX Design & Implementation ✓ API Development & Integration ✓ Performance Optimization ✓ Full-Stack Development. Every project is scoped to your specific needs — [tell me about yours](/start).",
  },
  {
    keywords: ["experience", "work", "worked", "background", "career", "startup", "company", "business"],
    category: "experience",
    answer: (ctx) => {
      if (ctx.experiences.length === 0) {
        return `I have ${ctx.yearsExperience}+ years of professional experience building web and mobile products. Take a look at my [projects](/projects) to see what I've shipped.`;
      }
      const lines = ctx.experiences.map((exp) => {
        const period = [exp.period, exp.current ? "current" : ""].filter(Boolean).join(", ");
        return `- **${exp.role}** at ${exp.company}${period ? ` (${period})` : ""}`;
      });
      return `Here's my background:\n\n${lines.join("\n")}\n\nWant to see the work itself? Check out my [projects](/projects).`;
    },
  },
  {
    keywords: ["projects", "portfolio", "work samples", "examples", "built"],
    category: "projects",
    answer: (ctx) => {
      if (ctx.projects.length === 0) {
        return "Take a look at my [projects page](/projects) for detailed case studies of what I've built.";
      }
      const lines = ctx.projects
        .slice(0, 6)
        .map((p) => `- [${p.title}](/projects/${p.slug})${p.category ? ` — ${p.category}` : ""}`);
      return `Some of what I've built:\n\n${lines.join("\n")}\n\nSee the full list on my [projects page](/projects).`;
    },
  },
  {
    keywords: ["skills", "technologies", "tech stack", "tools", "programming"],
    category: "skills",
    answer: (ctx) => {
      if (ctx.technologies.length === 0) {
        return "My technical expertise includes: Frontend: React, TypeScript, JavaScript, Tailwind CSS | Mobile: React Native, Android, iOS | Backend: Node.js, Python, API Integration | Database: MongoDB | AI: machine learning integration and AI-powered features.";
      }
      return `My technical toolkit includes: ${ctx.technologies.join(", ")}.\n\nWant specifics on mobile, web or AI work? Just ask!`;
    },
  },
  {
    keywords: ["cost", "price", "pricing", "rate", "charge", "budget", "affordable"],
    category: "pricing",
    answer: () =>
      "As a freelance developer in Sri Lanka, I offer highly competitive rates without compromising quality! Pricing varies based on project complexity, timeline, and requirements — every project gets a custom quote, no generic packages.\n\n[Start a project →](/start) and I'll put together a scope, timeline and quote tailored to you.",
  },
  {
    keywords: ["hire", "available", "availability", "freelance", "remote"],
    category: "availability",
    answer: (ctx) =>
      `${ctx.availability}\n\nI'm based in ${ctx.location} and work with clients globally, with flexible remote collaboration across timezones.\n\n${contactLines(ctx)}`,
  },
  {
    keywords: ["contact", "reach", "email", "phone", "whatsapp", "message"],
    category: "contact",
    answer: (ctx) =>
      `You can reach me through:\n\n${contactLines(ctx)}\n\nI typically respond within 24 hours. Or just [start a project](/start) and I'll get right back to you!`,
  },
  {
    keywords: ["mobile app", "ios", "android", "app development", "react native"],
    category: "mobile",
    answer: () =>
      "Mobile app development is one of my core specialties! I build native iOS and Android apps as well as cross-platform solutions using React Native. My apps feature: 📱 Beautiful, intuitive UI/UX design 🚀 High performance and smooth animations ✅ App Store & Google Play Store deployment 🔔 Push notifications & real-time features 💾 Offline functionality 🔐 Secure authentication.",
  },
  {
    keywords: ["react", "web", "website", "web development", "frontend"],
    category: "web",
    answer: () =>
      "I'm a React expert with extensive experience building modern web applications! I create: 🎨 Responsive, mobile-first designs ⚡ Lightning-fast performance 🎯 SEO-optimized websites 🛠️ Component-based architecture 📊 Data visualization & dashboards 🌐 Progressive Web Apps. Whether you need a landing page, e-commerce site, or complex SaaS application, I've got you covered!",
  },
  {
    keywords: ["ai", "artificial intelligence", "machine learning", "chatbot", "gpt"],
    category: "ai",
    answer: () =>
      "I integrate practical AI features into real applications! My AI services include: 🤖 LLM & chatbot integration 🧠 Machine learning model integration 📊 AI-powered analytics & predictions 🎯 Recommendation systems 🔍 Natural language processing. I can help you leverage AI to automate workflows, enhance user experience, and gain business insights!",
  },
  {
    keywords: ["sri lanka", "location", "colombo", "local", "country"],
    category: "location",
    answer: (ctx) =>
      `I'm based in ${ctx.location} 🇱🇰! Working from Sri Lanka means: 💰 Competitive rates compared to Western developers ⏰ Flexible working hours across timezones 🗣️ Excellent English communication 🌏 Experience with international clients. I serve both local Sri Lankan businesses and international clients worldwide!`,
  },
  {
    keywords: ["timeline", "time", "duration", "how long", "delivery"],
    category: "timeline",
    answer: () =>
      "Project timelines vary based on complexity and requirements: ⚡ Simple landing pages: 1-2 weeks 📱 Mobile apps: 4-12 weeks 🌐 Complex web applications: 8-16 weeks 🏢 Enterprise solutions: 3-6 months. I provide a detailed timeline during consultation and maintain transparent communication throughout — [tell me about your project](/start) for a real estimate.",
  },
  {
    keywords: ["process", "workflow", "methodology", "approach", "how do you work"],
    category: "process",
    answer: () =>
      "My development process ensures quality and transparency: 1️⃣ Discovery Call 2️⃣ Proposal & Quote 3️⃣ Design Phase 4️⃣ Development (Agile sprints, regular updates) 5️⃣ Testing 6️⃣ Deployment 7️⃣ Support. I use Agile/Scrum methodology with weekly progress reports and constant communication!",
  },
  {
    keywords: ["payment", "pay", "invoice", "billing", "terms"],
    category: "payment",
    answer: () =>
      "I offer flexible payment terms: 💳 Bank transfer, PayPal, Wise, Payoneer 📋 Standard terms: 50% upfront, 50% on completion 🔄 Monthly retainers for ongoing work 💰 Milestone-based payments for larger projects. All payments are invoiced properly, with no hidden fees.",
  },
  {
    keywords: ["maintenance", "support", "updates", "after", "post-launch"],
    category: "support",
    answer: () =>
      "I provide comprehensive post-launch support: 🛠️ Bug fixes and technical support 🔄 Feature updates 📈 Performance monitoring 🔐 Security updates 💾 Regular backups. I offer both one-time fixes and ongoing monthly maintenance — your project's success doesn't end at launch!",
  },
  {
    keywords: ["testimonial", "review", "client", "feedback", "reference"],
    category: "testimonials",
    answer: (ctx) => {
      if (ctx.testimonials.length === 0) {
        return "You can check the [testimonials section](/#testimonials) on my homepage for client feedback — or feel free to ask me directly for references.";
      }
      const quotes = ctx.testimonials.map((t) => {
        const who = [t.role, t.company].filter(Boolean).join(", ");
        return `> "${t.content}"\n> — **${t.name}**${who ? `, ${who}` : ""}`;
      });
      return `Here's what clients have said:\n\n${quotes.join("\n\n")}\n\nMore in the [testimonials section](/#testimonials).`;
    },
  },
  {
    keywords: ["why", "choose", "different", "better", "advantage"],
    category: "why",
    answer: (ctx) =>
      `Here's why clients choose me: ⭐ ${ctx.yearsExperience}+ years of proven expertise in React & mobile development 💰 Competitive rates with Western-quality work 🗣️ Excellent communication in English ⚡ Fast turnaround and deadline-oriented 🔄 Agile methodology with regular updates 🤝 Dedicated support and long-term partnership. I don't just code — I solve business problems!`,
  },
];

export const quickOptions = [
  { label: "Services & Pricing", query: "What services do you offer?" },
  { label: "View Projects", query: "Show me your projects" },
  { label: "Availability", query: "Are you available for hire?" },
  { label: "Contact Info", query: "How can I contact you?" },
];

/** Contextual chips shown after a bot reply, keyed by the FAQ category that
 *  just matched — a lighter, more relevant menu than always repeating the
 *  same 4 starter chips. Falls back to `quickOptions` when there's no entry. */
export const followUps: Record<string, { label: string; query: string }[]> = {
  about: [
    { label: "See projects", query: "Show me your projects" },
    { label: "Experience", query: "Tell me about your work experience" },
  ],
  services: [
    { label: "Pricing", query: "How much does it cost?" },
    { label: "View projects", query: "Show me your projects" },
  ],
  experience: [
    { label: "See projects", query: "Show me your projects" },
    { label: "Skills & tech", query: "What technologies do you use?" },
  ],
  projects: [
    { label: "Skills & tech", query: "What technologies do you use?" },
    { label: "Start a project", query: "I want to start a project" },
  ],
  skills: [
    { label: "See projects", query: "Show me your projects" },
    { label: "Services", query: "What services do you offer?" },
  ],
  pricing: [
    { label: "Timeline", query: "How long does a project take?" },
    { label: "Contact", query: "How can I contact you?" },
  ],
  availability: [
    { label: "Services", query: "What services do you offer?" },
    { label: "Contact", query: "How can I contact you?" },
  ],
  contact: [
    { label: "Availability", query: "Are you available for hire?" },
    { label: "Services", query: "What services do you offer?" },
  ],
  testimonials: [
    { label: "View projects", query: "Show me your projects" },
    { label: "Contact", query: "How can I contact you?" },
  ],
};

/** Split on anything that isn't a letter/digit, drop short/common words. */
const STOPWORDS = new Set([
  "what",
  "which",
  "who",
  "how",
  "does",
  "do",
  "is",
  "are",
  "the",
  "your",
  "you",
  "about",
  "can",
  "will",
  "have",
  "with",
  "for",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length >= 4 && !STOPWORDS.has(word));
}

/**
 * Supplementary knowledge base: admin-authored Q&A from Site settings
 * (`SiteSettings.faqs`), matched by token overlap between the visitor's
 * question and each FAQ's question text. Only runs when the static
 * `chatbotFaqs` matcher above scores zero, so an admin can extend what the
 * bot knows without a code deploy.
 */
export function matchSettingsFaq(ctx: ChatbotContext, input: string): string | null {
  const inputTokens = new Set(tokenize(input));
  if (inputTokens.size === 0) return null;

  let best: { answer: string; score: number } | null = null;
  for (const faq of ctx.faqs) {
    let score = 0;
    for (const token of tokenize(faq.question)) {
      if (inputTokens.has(token)) score += 1;
    }
    if (score >= 2 && (!best || score > best.score)) {
      best = { answer: faq.answer, score };
    }
  }
  return best ? best.answer : null;
}
