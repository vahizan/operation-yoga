import { Schema, model, models } from "mongoose";
import { Document } from "mongoose";
import { USER_MODEL_NAME } from "./User.model";
import { LESSON_MODEL_NAME } from "./Lesson.model";

export enum PAYMENT_TYPE {
  CASH_ON_DELIVERY = "Cash on delivery",
  PAYPAL = "Paypal",
  CARD = "Card",
  CRYPTO = "Cryptocurrency",
}

export enum PAYMENT_STATUS {
  PAID = "Paid",
  UNPAID = "Unpaid",
}
export const BOOKING_MODEL_NAME = "BOOKING";

export interface IBooking extends Document {
  lessonId: string;
}

const BookingSchema = new Schema({
  lessonId: {
    type: Schema.Types.ObjectId,
    ref: LESSON_MODEL_NAME,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: USER_MODEL_NAME,
    required: true,
  },
  paymentType: {
    type: Schema.Types.Map,
    enum: Object.values(PAYMENT_TYPE),
  },
  paymentStatus: {
    type: Schema.Types.Map,
    enum: Object.values(PAYMENT_STATUS),
  },
});

const Booking =
  models.BOOKING || model<IBooking>(BOOKING_MODEL_NAME, BookingSchema);

export default Booking;
