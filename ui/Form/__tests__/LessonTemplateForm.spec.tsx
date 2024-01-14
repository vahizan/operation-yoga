import React from "react";
import {
  render,
  screen,
  fireEvent,
  RenderResult,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LessonTemplateForm from "../LessonTemplateForm";
import { SessionProvider } from "next-auth/react";

describe("LessonTemplateForm", () => {
  let rendered: RenderResult = render(<div></div>);
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    rendered = render(
      <SessionProvider
        session={{ user: { name: undefined, email: undefined }, expires: "1" }}
      >
        <LessonTemplateForm onSubmit={mockOnSubmit} />
      </SessionProvider>
    );
  });

  test("renders form fields", () => {
    const { container } = rendered;
    expect(container).toMatchSnapshot();
  });

  test("handles form submission", () => {
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
