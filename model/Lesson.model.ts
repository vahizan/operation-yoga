import * as mongoose from "mongoose";
const { Schema, model } = mongoose;

export const LESSONS = "lessons";
const lessonSchema = new Schema({
  startTime: Date,
  endTime: Date,
  dayOfWeek: Number,
  type: String,
  location: Object,
});

const Lesson = mongoose.modelNames().includes(LESSONS)
  ? mongoose.model(LESSONS)
  : model(LESSONS, lessonSchema);

export default Lesson;
