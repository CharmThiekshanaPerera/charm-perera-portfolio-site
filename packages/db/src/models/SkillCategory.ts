import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const SkillCategorySchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    /** Lucide icon name, resolved through a whitelist map on the client. */
    icon: { type: String, default: "Code2" },
    skills: { type: [String], default: [] },
    published: { type: Boolean, default: true, index: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true, collection: "skillCategories" },
);

export type SkillCategoryDoc = InferSchemaType<typeof SkillCategorySchema> & { _id: string };
export const SkillCategory: Model<SkillCategoryDoc> =
  (models.SkillCategory as Model<SkillCategoryDoc>) ||
  model<SkillCategoryDoc>("SkillCategory", SkillCategorySchema);
