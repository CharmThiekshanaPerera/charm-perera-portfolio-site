import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const MessageSchema = new Schema(
  {
    /** Which form submitted this: the general contact form, /start's project intake, or the chatbot's inline lead form. */
    kind: { type: String, enum: ["contact", "project", "chatbot"], default: "contact", index: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    subject: { type: String, default: "" },
    message: { type: String, required: true },
    budget: { type: String, default: "" },
    /** Free-text summary shown in the inbox list, e.g. a package name or project type. */
    interestedIn: { type: String, default: "" },
    // Structured fields from the /start project-intake form. Empty on plain
    // contact-form submissions.
    company: { type: String, default: "" },
    projectType: { type: String, default: "" },
    timeline: { type: String, default: "" },
    currentUrl: { type: String, default: "" },
    status: {
      type: String,
      enum: ["unread", "read", "replied", "archived"],
      default: "unread",
      index: true,
    },
    /** Retained for abuse triage and rate limiting; never rendered publicly. */
    ipHash: { type: String, default: "" },
    userAgent: { type: String, default: "" },
    referrer: { type: String, default: "" },
  },
  { timestamps: true, collection: "messages" },
);

MessageSchema.index({ status: 1, createdAt: -1 });

export type MessageDoc = InferSchemaType<typeof MessageSchema> & { _id: string };
export const Message: Model<MessageDoc> =
  (models.Message as Model<MessageDoc>) || model<MessageDoc>("Message", MessageSchema);
