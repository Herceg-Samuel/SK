import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  did: string;
  handle: string;
  displayName?: string;
  avatar?: string;
  role: "user" | "owner" | "contributor";
  isAdmin: boolean;
  lastLoginAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    did: { type: String, required: true, unique: true, index: true },
    handle: { type: String, required: true, unique: true, index: true },
    displayName: { type: String },
    avatar: { type: String },
    role: {
      type: String,
      enum: ["user", "owner", "contributor"],
      default: "user",
    },
    isAdmin: { type: Boolean, default: false },
    lastLoginAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
);

export const User =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
