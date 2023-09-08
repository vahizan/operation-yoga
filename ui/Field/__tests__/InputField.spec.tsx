import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputField } from "../InputField";
import { waitFor } from "@testing-library/dom";

describe("InputField component", () => {
  const defaultProps = {
    label: "Test Label",
    value: "",
    name: "testName",
    onChange: jest.fn(),
    type: "text",
  };

  it("renders the label correctly", () => {
    render(<InputField {...defaultProps} />);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  it("renders the input field correctly", () => {
    render(<InputField {...defaultProps} />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("name", "testName");
    expect(inputElement).toHaveAttribute("type", "text");
    expect(inputElement).toHaveAttribute("value", "");
  });

  it("calls onChange when input value changes", async () => {
    render(<InputField {...defaultProps} />);
    const inputElement = screen.getByRole("textbox");
    await userEvent.type(inputElement, "New Value");
    await waitFor(() => {
      expect(defaultProps.onChange).toHaveBeenCalledWith(expect.any(Object));
    });
  });

  it("renders error message when errors prop is provided", () => {
    const errorProps = {
      ...defaultProps,
      errors: "This is an error message",
    };
    render(<InputField {...errorProps} />);
    const errorMessage = screen.getByText("This is an error message");
    expect(errorMessage).toBeInTheDocument();
  });

  it("does not render error message when errors prop is not provided", () => {
    render(<InputField {...defaultProps} />);
    const errorMessage = screen.queryByText("This is an error message");
    expect(errorMessage).toBeNull();
  });
});
