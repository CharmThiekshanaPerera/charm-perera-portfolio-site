import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const PageViewSchema = new Schema(
  {
    /** Pathname only - never the query string, which can carry personal data. */
    path: { type: String, required: true, index: true },
    /** Referring host, or "direct". Full URLs are reduced to the origin. */
    referrer: { type: String, default: "direct", index: true },
    country: { type: String, default: "" },
    device: { type: String, enum: ["mobile", "tablet", "desktop"], default: "desktop" },
    browser: { type: String, default: "" },
    /**
     * Salted hash of IP + user agent, rotated daily. Enough to count unique
     * visitors within a day without storing an identifier that can follow
     * someone across days, and no cookie is set.
     */
    visitorHash: { type: String, default: "", index: true },
    /** Midnight UTC for the view's day, so daily rollups are a plain group-by. */
    day: { type: String, required: true, index: true },
  },
  { timestamps: { createdAt: true, updatedAt: false }, collection: "pageViews" },
);

PageViewSchema.index({ createdAt: -1 });
PageViewSchema.index({ day: 1, path: 1 });

/**
 * Views older than 180 days delete themselves. Analytics rows are the only
 * unbounded-growth collection here, and the free tier has 512MB to spend.
 */
PageViewSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 180 });

export type PageViewDoc = InferSchemaType<typeof PageViewSchema> & { _id: string };
export const PageView: Model<PageViewDoc> =
  (models.PageView as Model<PageViewDoc>) || model<PageViewDoc>("PageView", PageViewSchema);
