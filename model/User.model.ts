import mongoose, { Document, Schema } from "mongoose";

export const USER_MODEL_NAME = "User";
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone?: string;
  createdAt?: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User =
  mongoose.models.User || mongoose.model<IUser>(USER_MODEL_NAME, userSchema);
