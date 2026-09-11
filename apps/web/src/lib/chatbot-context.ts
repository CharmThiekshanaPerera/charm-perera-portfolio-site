/**
 * Shape of the data the chatbot answers are built from, plus a hardcoded
 * fallback. Deliberately free of any "server-only" or database import —
 * this file is imported by both the client bundle (chatbot.tsx,
 * chatbot-faqs.ts) and the server (the /api/chatbot/context route), so it
 * must stay safe to ship to the browser. All real DB access lives only in
 * the route handler.
 */

export type ChatbotContext = {
  fullName: string;
  jobTitle: string;
  tagline: string;
  yearsExperience: number;
  location: string;
  availability: string;
  email: string;
  phone: string;
  whatsapp: string;
  avatarUrl: string;
  social: Partial<Record<"github" | "linkedin" | "twitter" | "upwork" | "fiverr", string>>;
  technologies: string[];
  about: string[];
  experiences: { role: string; company: string; period: string; current: boolean }[];
  projects: { title: string; slug: string; category: string }[];
  testimonials: { name: string; role: string; company: string; content: string }[];
  faqs: { question: string; answer: string }[];
};

/**
 * Real default facts (matching content.ts's FALLBACK_SETTINGS), used when
 * /api/chatbot/context hasn't resolved yet or fails outright. The bot must
 * never lose basic contact info just because a fetch timed out.
 */
export const FALLBACK_CONTEXT: ChatbotContext = {
  fullName: "Charm Thiekshana Perera",
  jobTitle: "Senior Freelance Web Developer",
  tagline: "React, iOS & Android development from Colombo, Sri Lanka",
  yearsExperience: 5,
  location: "Colombo, Sri Lanka",
  availability: "Available for freelance opportunities",
  email: "charmthiekshana97@gmail.com",
  phone: "+94754465955",
  whatsapp: "94754465955",
  avatarUrl: "/profile.png",
  social: {},
  technologies: [],
  about: [],
  experiences: [],
  projects: [],
  testimonials: [],
  faqs: [],
};
