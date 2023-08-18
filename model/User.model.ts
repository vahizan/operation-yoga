import mongoose, { Document, Schema } from "mongoose";

export const USER_MODEL_NAME = "User";
export enum UserType {
  ADMIN = "admin",
  SUBSCRIBER = "subscriber",
  NON_SUBSCRIBER = "non-subscriber",
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  userType?: UserType;
  phone?: string;
  createdAt?: Date;
  verifyToken?: string;
  isVerified?: boolean;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  verifyToken: { type: String, default: undefined },
  isVerified: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User =
  mongoose.models.User || mongoose.model<IUser>(USER_MODEL_NAME, userSchema);
