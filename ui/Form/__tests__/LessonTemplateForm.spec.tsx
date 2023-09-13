import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LessonTemplateForm from "../LessonTemplateForm";

describe("LessonTemplateForm", () => {
  test("renders form fields", () => {
    render(<LessonTemplateForm onSubmit={jest.fn()} />);

    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getByLabelText("Start Date and Time")).toBeInTheDocument();
    expect(screen.getByLabelText("Duration")).toBeInTheDocument();
  });

  test("handles form submission", () => {
    const mockOnSubmit = jest.fn();
    render(<LessonTemplateForm onSubmit={mockOnSubmit} />);

    // Fill out the form fields
    userEvent.type(screen.getByLabelText("Description"), "Sample description");
    userEvent.type(
      screen.getByLabelText("Start Date and Time"),
      "2023-08-22T10:00"
    );
    userEvent.type(screen.getByLabelText("Duration"), "1");
    // Fill out other form fields as needed

    // Submit the form
    fireEvent.click(screen.getByText("Create Lesson"));

    // Verify that the submit handler was called
    expect(mockOnSubmit).toHaveBeenCalled();
    // You can also add more assertions based on your form validation and submission logic
  });
});
