import { Schema, model, models, Document } from "mongoose";
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

export interface ILessonTemplateWithId extends ILessonTemplate, Document {}

const lessonTemplateSchema = new Schema({
  name: Schema.Types.String,
  startTime: {
    type: Schema.Types.Number,
    min: [0, "Must be at least 1, got {VALUE}"],
    max: [24, "Must be at most 7, got {VALUE}"],
  },
  endTime: {
    type: Schema.Types.Number,
    min: [0, "Must be at least 1, got {VALUE}"],
    max: [24, "Must be at most 7, got {VALUE}"],
  },
  dayOfWeek: {
    type: Schema.Types.Number,
    min: [1, "Must be at least 1, got {VALUE}"],
    max: [7, "Must be at most 7, got {VALUE}"],
  },
  instructor: {
    type: Schema.Types.Map,
    ref: USER_MODEL_NAME,
    required: true,
  },
  createdBy: {
    type: Schema.Types.Map,
    ref: USER_MODEL_NAME,
    required: true,
  },
  room: Schema.Types.String,
  location: Schema.Types.String,
  price: Schema.Types.Number,
  currency: {
    type: Schema.Types.String,
    enum: Currency,
    default: Currency.USD,
  },
});

const LessonTemplate =
  models.LessonTemplate ||
  model<ILessonTemplate>(LESSON_TEMPLATE_MODEL_NAME, lessonTemplateSchema);

export default LessonTemplate;
