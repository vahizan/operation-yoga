import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import MultiSelectCheckbox, {
  MultiSelectCheckboxOption,
} from "./MultiSelectCheckbox";

const options: MultiSelectCheckboxOption[] = [
  { name: "Option 1", value: "1" },
  { name: "Option 2", value: "2" },
  { name: "Option 3", value: "3" },
];

const mockOnChange = jest.fn();

describe("MultiSelectCheckbox", () => {
  beforeEach(jest.resetAllMocks);

  it("should render the component", () => {
    const { getByText } = render(
      <MultiSelectCheckbox
        labelValue={"Multi Select Example"}
        onChange={mockOnChange}
        options={options}
      />
    );
    expect(getByText("Multi Select Example")).toBeInTheDocument();
  });

  it("should render the options", () => {
    const { getByText } = render(
      <MultiSelectCheckbox
        labelValue={"Multi Select Example"}
        onChange={mockOnChange}
        options={options}
      />
    );
    options.forEach((option) => {
      expect(getByText(option.name)).toBeInTheDocument();
    });
  });

  it("should call the onChange function when an option is clicked", async () => {
    render(
      <MultiSelectCheckbox
        labelValue={"Multi Select Example"}
        onChange={mockOnChange}
        options={options}
      />
    );
    const option = screen.getByTestId("Option 1-0");

    fireEvent.click(option);

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalled();
    });
  });
});
