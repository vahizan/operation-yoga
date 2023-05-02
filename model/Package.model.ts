import mongoose from "mongoose";
const { Schema, model } = mongoose;

export const PACKAGE = "Package";
const packageSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  currency: String,
  type: String,
  isIndiaExclusive: Boolean,
});

const Package = mongoose.modelNames().includes(PACKAGE)
  ? mongoose.model(PACKAGE)
  : model(PACKAGE, packageSchema);

export default Package;
