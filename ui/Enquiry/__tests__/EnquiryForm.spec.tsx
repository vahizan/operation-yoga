import React from "react";

import { render, fireEvent, waitFor } from "@testing-library/react";
import EnquiryForm from "../EnquiryForm";

describe("EnquiryForm", () => {
  test("should submit form with correct data", async () => {
    const handleSubmit = jest.fn();

    const { getByLabelText, getByText } = render(
      <EnquiryForm onSubmit={handleSubmit} />
    );

    // Fill in the form fields
    fireEvent.change(getByLabelText("Name:"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(getByLabelText("Email:"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(getByLabelText("Message:"), {
      target: { value: "Hello, World!" },
    });

    // Submit the form
    fireEvent.click(getByText("Submit"));

    // Wait for form submission to complete
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
      expect(handleSubmit).toHaveBeenCalledWith({
        name: "John Doe",
        email: "john@example.com",
        message: "Hello, World!",
      });
    });
  });
});
