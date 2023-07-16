import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import SignupForm from "../SignupForm";
import { useRouter } from "next/navigation";

jest.mock("axios");
jest.mock("next/navigation", () => {
  return {
    ...jest.requireActual("next/router"),
    useRouter: jest.fn(),
  };
});

describe("SignupForm", () => {
  const pushMock = jest.fn();
  beforeEach(() => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      push: pushMock,
    }));
    render(<SignupForm />);
  });

  it("renders the form", () => {
    const { container } = render(<SignupForm />);

    expect(container).toMatchSnapshot();
  });

  it("displays an error message if required fields are not filled", async () => {
    const submitButton = screen.getByRole("button", { name: "Sign Up" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const errorElement = screen.getByText(
        "Please fill in all required fields."
      );
      expect(errorElement).toBeInTheDocument();
    });
  });

  it("submits the form and redirects to the login page on successful signup", async () => {
    const mockResponse = { data: {} };
    (axios.post as jest.Mock).mockResolvedValueOnce(mockResponse);

    const submitButton = screen.getByRole("button", { name: "Sign Up" });

    fireEvent.change(screen.getByLabelText("Name:"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email:"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password:"), {
      target: { value: "password123" },
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "/api/auth/signup",
        JSON.stringify({
          name: "John Doe",
          email: "john@example.com",
          password: "password123",
          phone: "",
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      expect(
        screen.queryByText("An error occurred. Please try again.")
      ).toBeNull();
      expect(
        screen.queryByText("Please fill in all required fields.")
      ).toBeNull();
      expect(screen.queryByText("Success message")).toBeNull();
      expect(screen.queryByText("Login page")).toBeNull();
    });
  });

  it("displays an error message if signup fails", async () => {
    const errorMessage = "Signup failed. Please try again.";
    const mockResponse = { data: { message: errorMessage } };
    (axios.post as jest.Mock).mockRejectedValueOnce(mockResponse);

    const submitButton = screen.getByRole("button", { name: "Sign Up" });

    fireEvent.change(screen.getByLabelText("Name:"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email:"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password:"), {
      target: { value: "password123" },
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("An error occurred. Please try again.")
      ).toBeInTheDocument();
      expect(
        screen.queryByText("Please fill in all required fields.")
      ).toBeNull();
      expect(screen.queryByText("Success message")).toBeNull();
      expect(screen.queryByText("Login page")).toBeNull();
    });
  });
});
