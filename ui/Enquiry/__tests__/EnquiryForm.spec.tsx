import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EnquiryForm from "../EnquiryForm";
import axios from "axios";
import useApi from "../../../hooks/useApi/useApi";
import Email from "../../../hooks/interfaces/Email";

jest.mock("../../../hooks/useApi/useApi");

describe("EnquiryForm", () => {
  it("should render the form fields", () => {
    render(<EnquiryForm />);

    const emailInput = screen.getByPlaceholderText("Email");
    const messageInput = screen.getByPlaceholderText("Enter your message");
    const submitButton = screen.getByText("Submit");

    expect(emailInput).toBeInTheDocument();
    expect(messageInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("should submit the form with valid email and message", async () => {
    (useApi as jest.Mock).mockReturnValue({
      data: "success",
      apiLoading: false,
      apiCallErrorMessage: undefined,
    });
    // jest
    //   .spyOn(axios, "post")
    //   .mockResolvedValue({ status: 200, data: "all good" });

    render(<EnquiryForm />);

    const emailInput = screen.getByPlaceholderText("Email");
    const messageInput = screen.getByPlaceholderText("Enter your message");
    const submitButton = screen.getByText("Submit");

    // Enter valid email and message
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(messageInput, { target: { value: "Test message" } });

    // Submit the form
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Enquiry sent successfully")).toBeInTheDocument();
    });
  });

  it("should display an error message for invalid email", async () => {
    (useApi as jest.Mock).mockReturnValue({
      data: "success",
      apiLoading: false,
      apiCallErrorMessage: undefined,
    });
    render(<EnquiryForm />);

    const emailInput = screen.getByPlaceholderText("Email");
    const messageInput = screen.getByPlaceholderText("Enter your message");
    const submitButton = screen.getByText("Submit");

    // Enter invalid email and valid message
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.change(messageInput, { target: { value: "Test message" } });

    // Submit the form
    fireEvent.click(submitButton);

    // Wait for the response
    await waitFor(() => {
      expect(
        // screen.getByText("Failed to send your enquiry. Please try again")
        screen.getByText("Email is invalid")
      ).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
    });
  });
});
