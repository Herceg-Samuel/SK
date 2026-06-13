import mongoose, { Schema, Document } from "mongoose";

export interface IBanger extends Document {
  title: string;
  description: string;
  url: string;
  category: string; // "article" | "project" | "person" | "tool" | "podcast" | "comedian"
  author?: string;
  featured: boolean;
  addedAt: Date;
  updatedAt: Date;
}

const BangerSchema = new Schema<IBanger>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    url: { type: String, required: true, unique: true },
    category: {
      type: String,
      enum: ["article", "project", "person", "tool", "podcast", "comedian"],
      required: true,
      index: true,
    },
    author: { type: String },
    featured: { type: Boolean, default: false, index: true },
  },
  {
    timestamps: { createdAt: "addedAt", updatedAt: true },
  },
);

export const Banger =
  mongoose.models.Banger || mongoose.model<IBanger>("Banger", BangerSchema);
