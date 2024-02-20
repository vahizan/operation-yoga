import { Schema, model, models } from "mongoose";
import { IUserEssential, IUserReadOnly, USER_MODEL_NAME } from "../User.model";
import { Currency } from "./enums";

export const LESSON_TEMPLATE_MODEL_NAME = "LessonTemplate";

export interface ILessonTemplate {
  availability: number;
  startTime: number;
  endTime: number;
  dayOfWeek: number;
  name: string;
  createdBy: IUserEssential;
  instructor: IUserReadOnly;
  room?: string;
  location?: string;
  price: number;
  currency: string;
}

export interface ILessonTemplateWithId extends ILessonTemplate {
  _id: string;
}

const lessonTemplateSchema = new Schema({
  name: String,
  startTime: {
    type: Number,
    min: [0, "Must be at least 1, got {VALUE}"],
    max: [24, "Must be at most 7, got {VALUE}"],
  },
  endTime: {
    type: Number,
    min: [0, "Must be at least 1, got {VALUE}"],
    max: [24, "Must be at most 7, got {VALUE}"],
  },
  dayOfWeek: {
    type: Number,
    min: [1, "Must be at least 1, got {VALUE}"],
    max: [7, "Must be at most 7, got {VALUE}"],
  },
  instructorId: {
    type: Schema.Types.ObjectId,
    ref: USER_MODEL_NAME,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: USER_MODEL_NAME,
    required: true,
  },
  room: String,
  location: String,
  price: Number,
  currency: { type: String, enum: Currency, default: Currency.USD },
});

const LessonTemplate =
  models.LessonTemplate ||
  model<ILessonTemplate>(LESSON_TEMPLATE_MODEL_NAME, lessonTemplateSchema);

export default LessonTemplate;
