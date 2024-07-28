import {
  LessonTemplateFormDataValidation,
  LessonTemplateFormData,
} from "./types";
import { Currency } from "../../model/admin/enums";

export const validateInput = (
  formData: LessonTemplateFormData,
  currency?: Currency,
  selectedInstructorId?: string
) => {
  const errorValues: LessonTemplateFormDataValidation = {};

  if (!formData.description) {
    errorValues.description = "Description is required";
  }

  if (!formData.startTime) {
    errorValues.startTime =
      "Start time is required and should not be in the past";
  }

  if (!formData.endTime) {
    errorValues.endTime = "End time is required";
  }

  if (
    formData.startTime &&
    formData.endTime &&
    Number(formData.startTime) > Number(formData.endTime)
  ) {
    errorValues.startTime =
      "Invalid duration, start time cannot be greater than end time";
  }

  if (!formData.dayOfWeek) {
    errorValues.dayOfWeek =
      "Please specify the day of the week the lesson will take place";
  }

  if (!formData.price) {
    errorValues.price = "Price is required";
  }

  if (!currency) {
    errorValues.currency = "Currency is required";
  }

  if (!formData.lessonName) {
    errorValues.lessonName = "Lesson name is required";
  }

  if (!selectedInstructorId) {
    errorValues.instructor = "Instructor is required";
  }

  return errorValues;
};
