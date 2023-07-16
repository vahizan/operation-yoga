import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "../LoginForm";
import { signIn } from "next-auth/react";

jest.mock("next-auth/react");

describe("LoginForm", () => {
  it("should display error message when form is submitted with empty fields", async () => {
    const { getByText } = render(<LoginForm />);

    fireEvent.submit(getByText("Login"));

    await waitFor(() => {
      expect(getByText("Please fill in all fields")).toBeInTheDocument();
    });
  });

  it("should display error message when login fails", async () => {
    const signInMock = jest.fn(() => ({ error: "Invalid credentials" }));
    (signIn as jest.Mock).mockImplementationOnce(signInMock);

    const { getByText, getByLabelText } = render(<LoginForm />);

    const emailInput = getByLabelText("Email");
    const passwordInput = getByLabelText("Password");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.submit(getByText("Login"));

    await waitFor(() => {
      expect(signInMock).toHaveBeenCalledWith("credentials", {
        redirect: false,
        email: "test@example.com",
        password: "password",
      });
      expect(getByText("Invalid credentials")).toBeInTheDocument();
    });
  });

  it("should not display error message when login succeeds", async () => {
    const signInMock = jest.fn(() => ({ error: null }));
    (signIn as jest.Mock).mockImplementationOnce(signInMock);

    const { getByText, getByLabelText, queryByText } = render(<LoginForm />);

    const emailInput = getByLabelText("Email");
    const passwordInput = getByLabelText("Password");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.submit(getByText("Login"));

    await waitFor(() => {
      expect(signInMock).toHaveBeenCalledWith("credentials", {
        redirect: false,
        email: "test@example.com",
        password: "password",
      });
      expect(queryByText("Invalid credentials")).toBeNull();
    });
  });
});
