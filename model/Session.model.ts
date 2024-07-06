import * as mongoose from "mongoose";
const { Schema, model } = mongoose;

export const SESSIONS = "sessions";
const sessionSchema = new Schema({
  instructor: String,
  startTime: Date,
  endTime: Date,
  dayOfWeek: Number,
});

const Session = mongoose.modelNames().includes(SESSIONS)
  ? mongoose.model(SESSIONS)
  : model(SESSIONS, sessionSchema);

export default Session;
