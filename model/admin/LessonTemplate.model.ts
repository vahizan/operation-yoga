import { Schema, model, models } from "mongoose";
import { USER_MODEL_NAME, IUser } from "../User.model";

export const LESSON_TEMPLATE_MODEL_NAME = "LessonTemplate";

export interface ILessonTemplate {
  availability: number;
  startTime: number;
  endTime: number;
  dayOfWeek: number;
  name: string;
  createdBy: string;
  instructor: IUser;
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
  dayOfWeek: {
    type: Number,
    min: [1, "Must be at least 1, got {VALUE}"],
    max: [7, "Must be at most 7, got {VALUE}"],
  },
  instructor: {
    type: Schema.Types.ObjectId,
    ref: USER_MODEL_NAME,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  room: String,
  location: Object,
  price: Schema.Types.Map,
});

const LessonTemplate =
  models.LessonTemplate ||
  model<ILessonTemplate>(LESSON_TEMPLATE_MODEL_NAME, lessonTemplateSchema);

export default LessonTemplate;
