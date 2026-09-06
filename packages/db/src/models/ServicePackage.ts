import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const ServicePackageSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    /** Display string, e.g. "$2,499". Kept separate from priceValue for schema.org. */
    price: { type: String, required: true },
    priceValue: { type: Number, default: 0 },
    currency: { type: String, default: "USD" },
    period: { type: String, default: "one-time" },
    description: { type: String, default: "" },
    features: { type: [String], default: [] },
    deliveryTime: { type: String, default: "" },
    icon: { type: String, default: "Sparkles" },
    gradient: { type: String, default: "gold" },
    highlighted: { type: Boolean, default: false },
    published: { type: Boolean, default: true, index: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true, collection: "servicePackages" },
);

export type ServicePackageDoc = InferSchemaType<typeof ServicePackageSchema> & { _id: string };
export const ServicePackage: Model<ServicePackageDoc> =
  (models.ServicePackage as Model<ServicePackageDoc>) ||
  model<ServicePackageDoc>("ServicePackage", ServicePackageSchema);

const AddOnSchema = new Schema(
  {
    title: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String, default: "" },
    published: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true, collection: "addOns" },
);

export type AddOnDoc = InferSchemaType<typeof AddOnSchema> & { _id: string };
export const AddOn: Model<AddOnDoc> =
  (models.AddOn as Model<AddOnDoc>) || model<AddOnDoc>("AddOn", AddOnSchema);
