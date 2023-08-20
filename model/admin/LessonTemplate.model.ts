import { Schema, model, models } from "mongoose";
import { USER_MODEL_NAME, IUser } from "./User.model";
import { Document } from "mongoose";

export const LESSON_MODEL_NAME = "Lesson";

export interface ILesson extends Document {
  availability: number;
  startTime: Date;
  endTime: Date;
  dayOfWeek: number;
  name: string;
  createdBy: IUser;
  room: string;
  location: Object;
  price: Object;
  instructor: IUser;
}

const lessonSchema = new Schema({
  name: String,
  dayOfWeek: {
    type: Number,
    min: [1, "Must be at least 1, got {VALUE}"],
    max: [7, "Must be at most 7, got {VALUE}"],
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: USER_MODEL_NAME,
    required: true,
  },
  room: String,
  location: Object,
  price: Schema.Types.Map,
  instructor: {
    type: Schema.Types.ObjectId,
    ref: USER_MODEL_NAME,
    required: true,
  },
});

const Lesson = models.Lesson || model<ILesson>(LESSON_MODEL_NAME, lessonSchema);

export default Lesson;
