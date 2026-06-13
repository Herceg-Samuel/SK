import mongoose, { Schema, Document } from "mongoose";

export interface IBangerPost extends Document {
  authorDid: string; // atproto decentralized ID (did:plc:...)
  slug: string; // URL slug generated safely via Zod validation
  title: string; // Public title
  content: string; // Raw, uncompiled markdown/MDX code
  createdAt: Date;
  updatedAt: Date;
}

const BangerPostSchema = new Schema<IBangerPost>(
  {
    authorDid: { type: String, required: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const BangerPost =
  mongoose.models.BangerPost ||
  mongoose.model<IBangerPost>("BangerPost", BangerPostSchema);
