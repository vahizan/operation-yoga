import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import MultiSelectCheckbox, {
  MultiSelectCheckboxOption,
} from "./MultiSelectCheckbox";
import userEvent from "@testing-library/user-event";

const options: MultiSelectCheckboxOption[] = [
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

  return render(
    <MultiSelectCheckbox
      labelValue={"Multi Select Example"}
      {...defaultProps}
      {...props}
    />
  );
};

describe("MultiSelectCheckbox", () => {
  beforeEach(jest.resetAllMocks);

  it("should render the component", () => {
    const { getByText } = renderComponent();
    expect(getByText("Multi Select Example")).toBeInTheDocument();
  });

  it("should render the options", () => {
    const { getByText } = renderComponent();
    options.forEach((option) => {
      expect(getByText(option.name)).toBeInTheDocument();
    });
  });

  it("should call the onChange function when an option is clicked", async () => {
    const { getByText } = renderComponent();
    const option = getByText("Option 1");

    await userEvent.click(option);

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalled();
    });
  });
});
