import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SelectDropdown, { SelectOption } from "./SelectDropdown";

const options: SelectOption[] = [
  { name: "Option 1", value: "1" },
  { name: "Option 2", value: "2" },
  { name: "Option 3", value: "3" },
];

const mockOnChange = jest.fn();

const renderComponent = (props = {}) => {
  const defaultProps = {
    options,
    onChange: mockOnChange,
  };

  return render(<SelectDropdown {...defaultProps} {...props} />);
};
describe("SelectDropdown", () => {
  test("renders select dropdown with options", () => {
    const { getByText } = renderComponent();

    options.forEach((option) => {
      const optionElement = getByText(option.name);
      expect(optionElement).toBeInTheDocument();
    });
  });

  test("calls onChange with selected value", () => {
    const { getByRole } = renderComponent();

    const selectElement = getByRole("combobox");
    fireEvent.change(selectElement, { target: { value: "2" } });

    expect(mockOnChange).toHaveBeenCalledWith("2");
  });

  test("updates selected option", () => {
    const { getByRole } = renderComponent();

    const selectElement = getByRole("combobox");
    fireEvent.change(selectElement, { target: { value: "3" } });

    expect(selectElement).toHaveValue("3");
  });
});
