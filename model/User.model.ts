import mongoose, { Document, Schema } from "mongoose";
import { UserType } from "../enum/UserType";

export const USER_MODEL_NAME = "User";

export interface IUserEssential extends Document {
  name: string;
  id: string;
  email?: string;
}
export interface IUserReadOnly extends Document {
  name: string;
  type?: UserType;
  id: string;
  email?: string;
  phone?: string;
  createdAt?: Date;
  isVerified?: boolean;
}
export interface IUser extends Document {
  id?: string;
  name: string;
  email: string;
  password: string;
  type?: UserType;
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
  type: {
    type: String,
    enum: Object.values(UserType),
    default: UserType.SUBSCRIBER,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User =
  mongoose.models.User || mongoose.model<IUser>(USER_MODEL_NAME, userSchema);
