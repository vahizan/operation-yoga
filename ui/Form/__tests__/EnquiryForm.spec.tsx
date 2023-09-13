import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EnquiryForm from "../EnquiryForm";
import { sendEmail } from "../../../hooks/api";

jest.mock("../../../hooks/api", () => ({
  sendEmail: jest.fn(),
}));

describe("EnquiryForm", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders form fields", () => {
    render(<EnquiryForm />);

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Subject")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  test("displays error messages for required fields", () => {
    render(<EnquiryForm />);

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(screen.getByText("Name is required")).toBeInTheDocument();
    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(screen.getByText("Subject is required")).toBeInTheDocument();
    expect(screen.getByText("Message is required")).toBeInTheDocument();
  });

  test("displays error message for invalid email", async () => {
    render(<EnquiryForm />);

    const emailField = screen.getByLabelText("Email");
    fireEvent.change(emailField, {
      target: { value: "invalid-email" },
    });
    fireEvent.blur(emailField);
    const submitButton = screen.getByRole("button", { name: "Submit" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(submitButton).toBeDisabled();
      expect(screen.getByText("Email is invalid")).toBeInTheDocument();
    });
  });

  test("should not display error message when email is empty", async () => {
    render(<EnquiryForm />);

    const emailField = screen.getByLabelText("Email");
    fireEvent.focus(emailField);
    fireEvent.blur(emailField);

    await waitFor(() => {
      expect(() => screen.getByText("Email is invalid")).toThrowError();
    });
  });

  test("should not display error messages before submit clicked", async () => {
    render(<EnquiryForm />);

    await waitFor(() => {
      expect(() => screen.getByText("Email is invalid")).toThrowError();
      expect(() => screen.getByText("Message is required")).toThrowError();
      expect(() => screen.getByText("Subject is required")).toThrowError();
    });
  });

  test("displays success message on successful form submission", async () => {
    (sendEmail as jest.Mock).mockResolvedValue("COOL");

    render(<EnquiryForm />);

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "johndoe@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Subject"), {
      target: { value: "Test Subject" },
    });
    fireEvent.change(screen.getByLabelText("Message"), {
      target: { value: "Test Message" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() =>
      expect(screen.getByText("Enquiry sent successfully")).toBeInTheDocument()
    );
  });

  test("displays error message on failed form submission", async () => {
    (sendEmail as jest.Mock).mockRejectedValueOnce(
      new Error("Submission Error")
    );

    render(<EnquiryForm />);

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "johndoe@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Subject"), {
      target: { value: "Test Subject" },
    });
    fireEvent.change(screen.getByLabelText("Message"), {
      target: { value: "Test Message" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() =>
      expect(
        screen.getByText("Failed to send your enquiry. Please try again")
      ).toBeInTheDocument()
    );
  });
});
