import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const ExperienceSchema = new Schema(
  {
    role: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    companyUrl: { type: String, default: "" },
    location: { type: String, default: "" },
    period: { type: String, default: "" },
    startDate: { type: Date, default: null },
    endDate: { type: Date, default: null },
    current: { type: Boolean, default: false },
    responsibilities: { type: [String], default: [] },
    published: { type: Boolean, default: true, index: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true, collection: "experiences" },
);

export type ExperienceDoc = InferSchemaType<typeof ExperienceSchema> & { _id: string };
export const Experience: Model<ExperienceDoc> =
  (models.Experience as Model<ExperienceDoc>) ||
  model<ExperienceDoc>("Experience", ExperienceSchema);
