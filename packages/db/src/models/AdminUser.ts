import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const AdminUserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    name: { type: String, default: "" },
    /** bcrypt hash — the plaintext password is never stored or logged. */
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["admin", "editor"], default: "admin" },
    lastLoginAt: { type: Date, default: null },
    /** Incremented on failed logins to support lockout; reset on success. */
    failedAttempts: { type: Number, default: 0 },
    lockedUntil: { type: Date, default: null },
  },
  { timestamps: true, collection: "adminUsers" },
);

export type AdminUserDoc = InferSchemaType<typeof AdminUserSchema> & { _id: string };
export const AdminUser: Model<AdminUserDoc> =
  (models.AdminUser as Model<AdminUserDoc>) ||
  model<AdminUserDoc>("AdminUser", AdminUserSchema);
