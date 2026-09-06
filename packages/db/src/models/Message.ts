import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const MessageSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    subject: { type: String, default: "" },
    message: { type: String, required: true },
    budget: { type: String, default: "" },
    /** Which package the visitor was looking at, when they came from /services. */
    interestedIn: { type: String, default: "" },
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
