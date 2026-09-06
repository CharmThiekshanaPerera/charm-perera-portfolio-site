import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    description: { type: String, required: true },
    fullDescription: { type: String, default: "" },
    /** Long-form Markdown body rendered on /projects/[slug] — this is what search engines index. */
    body: { type: String, default: "" },
    technologies: { type: [String], default: [] },
    coverImage: { type: String, default: "" },
    liveUrl: { type: String, default: "" },
    repoUrl: { type: String, default: "" },
    client: { type: String, default: "" },
    category: { type: String, default: "Web" },
    /** Featured projects render as wide cards on the home page. */
    featured: { type: Boolean, default: false, index: true },
    published: { type: Boolean, default: true, index: true },
    order: { type: Number, default: 0 },
    completedAt: { type: Date, default: null },
    seoTitle: { type: String, default: "" },
    seoDescription: { type: String, default: "" },
  },
  { timestamps: true, collection: "projects" },
);

ProjectSchema.index({ published: 1, featured: -1, order: 1 });

export type ProjectDoc = InferSchemaType<typeof ProjectSchema> & { _id: string };
export const Project: Model<ProjectDoc> =
  (models.Project as Model<ProjectDoc>) || model<ProjectDoc>("Project", ProjectSchema);
