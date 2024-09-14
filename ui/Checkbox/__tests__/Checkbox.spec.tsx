import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Checkbox from "../Checkbox";

const mockOnChange = jest.fn();

describe("Checkbox", () => {
  afterEach(jest.resetAllMocks);

  it("should render the component", () => {
    const { container } = render(
      <Checkbox
        onChange={mockOnChange}
        displayName={"checkbox"}
        id={"checkboxId"}
      />
    );
    expect(container).toMatchInlineSnapshot(`
      <div>
        <input
          id="checkboxId"
          type="checkbox"
          value="checkbox"
        />
      </div>
    `);
  });

  it("should call the onChange function when an option is clicked", async () => {
    render(
      <Checkbox
        onChange={mockOnChange}
        displayName={"checkbox"}
        label={"checkboxValue"}
        id={"checkboxId"}
      />
    );
    const checkbox = screen.getByTestId("checkboxId");

    fireEvent.click(checkbox);

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalled();
    });
  });
});
