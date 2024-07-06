import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "../LoginForm";
import { signIn } from "next-auth/react";

jest.mock("next-auth/react", () => ({
  ...jest.requireActual("next-auth/react"),
  signIn: jest.fn(),
}));

describe("LoginForm", () => {
  it("should display error message when form is submitted with empty fields", async () => {
    const { getByText } = render(<LoginForm />);

    fireEvent.submit(getByText("Login"));

    await waitFor(() => {
      expect(getByText("Please fill in all fields")).toBeInTheDocument();
    });
  });

  it("should display error message when login fails", async () => {
    (signIn as jest.Mock).mockRejectedValue({ error: "Invalid credentials" });

    const { getByText, getByLabelText } = render(<LoginForm />);

    const emailInput = getByLabelText("Email");
    const passwordInput = getByLabelText("Password");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.submit(getByText("Login"));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith("credentials", {
        redirect: true,
        callbackUrl: "/",
        email: "test@example.com",
        password: "password",
      });
      expect(
        getByText("Invalid username or password. Please try again")
      ).toBeInTheDocument();
    });
  });

  it("should not display error message when login succeeds", async () => {
    (signIn as jest.Mock).mockResolvedValue({ error: null });

    const { getByText, getByLabelText, queryByText } = render(<LoginForm />);

    const emailInput = getByLabelText("Email");
    const passwordInput = getByLabelText("Password");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.submit(getByText("Login"));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith("credentials", {
        redirect: true,
        callbackUrl: "/",
        email: "test@example.com",
        password: "password",
      });
      expect(
        queryByText("Invalid username or password. Please try again")
      ).toBeNull();
    });
  });
});
