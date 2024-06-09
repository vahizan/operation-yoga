import { validateInput } from "../helpers";
import { LessonTemplateFormData } from "../types";
import { Currency } from "../../../model/admin/enums";

describe("validateInput function", () => {
  const validFormData: LessonTemplateFormData = {
    description: "Valid description",
    startTime: 10,
    endTime: 12,
    roomLocation: "Room 101",
    price: 50,
    lessonName: "Math Lesson",
    instructorName: "John Doe",
    availability: 20,
    dayOfWeek: 1,
  };

  test("should return an empty object for valid input", () => {
    const result = validateInput(validFormData, Currency.USD, "instructor123");
    expect(result).toEqual({});
  });

  test("should return error for missing description", () => {
    const formData = { ...validFormData, description: undefined };
    const result = validateInput(formData, Currency.USD, "instructor123");
    expect(result.description).toEqual("Description is required");
  });

  test("should return error for invalid start time", () => {
    const formData = { ...validFormData, startTime: undefined };
    const result = validateInput(formData, Currency.USD, "instructor123");
    expect(result.startTime).toEqual(
      "Start time is required and should not be in the past"
    );
  });
});
