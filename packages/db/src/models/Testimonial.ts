import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const TestimonialSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, default: "" },
    company: { type: String, default: "" },
    content: { type: String, required: true },
    /** Two-letter fallback shown when there is no avatarUrl. */
    avatar: { type: String, default: "" },
    avatarUrl: { type: String, default: "" },
    website: { type: String, default: "" },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    /**
     * Only testimonials explicitly marked as verified are eligible for Review
     * structured data. Unverified entries still render as page copy but are
     * kept out of JSON-LD, because marking up unverifiable reviews violates
     * Google's review snippet guidelines and risks a manual action.
     */
    verified: { type: Boolean, default: false },
    published: { type: Boolean, default: true, index: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true, collection: "testimonials" },
);

export type TestimonialDoc = InferSchemaType<typeof TestimonialSchema> & { _id: string };
export const Testimonial: Model<TestimonialDoc> =
  (models.Testimonial as Model<TestimonialDoc>) ||
  model<TestimonialDoc>("Testimonial", TestimonialSchema);
