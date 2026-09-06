import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const PostSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    excerpt: { type: String, required: true },
    /** Markdown body. Rendered server-side so the full article text is crawlable. */
    body: { type: String, default: "" },
    coverImage: { type: String, default: "" },
    category: { type: String, default: "Web Development", index: true },
    tags: { type: [String], default: [], index: true },
    readTimeMinutes: { type: Number, default: 5 },
    published: { type: Boolean, default: true, index: true },
    featured: { type: Boolean, default: false },
    publishedAt: { type: Date, default: () => new Date(), index: true },
    seoTitle: { type: String, default: "" },
    seoDescription: { type: String, default: "" },
  },
  { timestamps: true, collection: "posts" },
);

PostSchema.index({ published: 1, publishedAt: -1 });

export type PostDoc = InferSchemaType<typeof PostSchema> & { _id: string };
export const Post: Model<PostDoc> =
  (models.Post as Model<PostDoc>) || model<PostDoc>("Post", PostSchema);
