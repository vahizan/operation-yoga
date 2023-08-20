import { Document, models, Schema, model } from "mongoose";
import { USER_MODEL_NAME } from "./User.model";

export const LESSON_MODEL_NAME = "Lesson";

export interface ILesson extends Document {
  availability: Number;
  startTime: Date;
  endTime: Date;
  instructor: String;
  info: String;
}

const lessonSchema = new Schema({
  availability: Number,
  startTime: Date,
  endTime: Date,
  instructor: {
    type: Schema.Types.ObjectId,
    ref: USER_MODEL_NAME,
    required: true,
  },
  info: {
    type: Schema.Types.ObjectId,
    ref: LESSON_MODEL_NAME,
    required: true,
  },
});

const Lesson = models.Lesson || model<ILesson>(LESSON_MODEL_NAME, lessonSchema);

export default Lesson;
