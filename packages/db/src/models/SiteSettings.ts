import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const FaqSchema = new Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { _id: false },
);

const SiteSettingsSchema = new Schema(
  {
    /** Singleton guard — exactly one document, always keyed "default". */
    key: { type: String, default: "default", unique: true, index: true },

    // Identity
    fullName: { type: String, default: "Charm Thiekshana Perera" },
    shortName: { type: String, default: "Charm Perera" },
    initials: { type: String, default: "CT" },
    jobTitle: { type: String, default: "Senior Freelance Web Developer" },
    tagline: { type: String, default: "" },
    /** Rotating strings for the hero typewriter. */
    roles: { type: [String], default: [] },
    heroHeadline: { type: String, default: "" },
    heroHighlight: { type: String, default: "" },
    heroIntro: { type: String, default: "" },
    aboutParagraphs: { type: [String], default: [] },
    profileImage: { type: String, default: "/profile.png" },
    resumeUrl: { type: String, default: "" },
    yearsExperience: { type: Number, default: 5 },

    // Contact
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    whatsapp: { type: String, default: "" },
    location: { type: String, default: "Colombo, Sri Lanka" },
    addressLocality: { type: String, default: "Colombo" },
    addressCountry: { type: String, default: "LK" },
    availability: { type: String, default: "" },

    // Social
    social: {
      github: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      twitter: { type: String, default: "" },
      instagram: { type: String, default: "" },
      facebook: { type: String, default: "" },
    },

    // SEO defaults — editable without a redeploy
    seo: {
      siteUrl: { type: String, default: "https://www.charmthiekshana.com" },
      defaultTitle: { type: String, default: "" },
      titleTemplate: { type: String, default: "%s | Charm Perera" },
      defaultDescription: { type: String, default: "" },
      keywords: { type: [String], default: [] },
      ogImage: { type: String, default: "" },
      twitterHandle: { type: String, default: "" },
      googleSiteVerification: { type: String, default: "" },
      bingSiteVerification: { type: String, default: "" },
    },

    faqs: { type: [FaqSchema], default: [] },
    technologies: { type: [String], default: [] },
  },
  { timestamps: true, collection: "siteSettings", minimize: false },
);

export type SiteSettingsDoc = InferSchemaType<typeof SiteSettingsSchema> & { _id: string };
export const SiteSettings: Model<SiteSettingsDoc> =
  (models.SiteSettings as Model<SiteSettingsDoc>) ||
  model<SiteSettingsDoc>("SiteSettings", SiteSettingsSchema);
