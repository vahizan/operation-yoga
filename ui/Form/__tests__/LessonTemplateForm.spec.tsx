import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LessonTemplateForm from "../LessonTemplateForm";

describe("LessonTemplateForm", () => {
  test("renders form fields", () => {
    const { container } = render(<LessonTemplateForm onSubmit={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });

  test("handles form submission", () => {
    const mockOnSubmit = jest.fn();
    render(<LessonTemplateForm onSubmit={mockOnSubmit} />);

    // Fill out the form fields
    const startTime = screen.getByText("Start Time");
    userEvent.selectOptions(startTime, "13:00");
    const endTime = screen.getByText("End Time");
    userEvent.selectOptions(endTime, "14:00");

    // Submit the form
    fireEvent.click(screen.getByText("Create Lesson"));

    // Verify that the submit handler was called
    expect(mockOnSubmit).toHaveBeenCalled();
    // You can also add more assertions based on your form validation and submission logic
  });
});
