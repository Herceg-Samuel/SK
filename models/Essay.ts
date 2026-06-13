import mongoose, { Schema, Document } from "mongoose";

export interface IEssay extends Document {
  slug: string;
  title: string;
  description: string;
  content: string; // MDX content
  authorDid: string;
  published: boolean;
  featured: boolean;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const EssaySchema = new Schema<IEssay>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    authorDid: { type: String, required: true, index: true },
    published: { type: Boolean, default: false, index: true },
    featured: { type: Boolean, default: false, index: true },
    views: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);

export const Essay =
  mongoose.models.Essay || mongoose.model<IEssay>("Essay", EssaySchema);
