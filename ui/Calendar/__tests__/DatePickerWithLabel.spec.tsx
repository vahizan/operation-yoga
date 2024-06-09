import React from "react";
import { render, fireEvent } from "@testing-library/react";
import DatepickerWithLabel from "../DatepickerWithLabel";

describe("DatepickerWithLabelAndError", () => {
  it("renders without crashing", () => {
    render(
      <DatepickerWithLabel
        id={"picker"}
        label="Select a date:"
        selectedDate={null}
        onChange={() => {}}
      />
    );
  });

  it("displays error message when provided", () => {
    const { getByText } = render(
      <DatepickerWithLabel
        id={"picker"}
        label="Select a date:"
        selectedDate={null}
        onChange={() => {}}
        errorMessage="Please select a valid date"
      />
    );

    expect(getByText("Please select a valid date")).toBeInTheDocument();
  });

  it("calls onChange when a date is selected", () => {
    const onChangeMock = jest.fn();
    const { getByLabelText } = render(
      <DatepickerWithLabel
        id={"picker"}
        label="Select a date:"
        selectedDate={null}
        onChange={onChangeMock}
      />
    );

    const input = getByLabelText("Select a date:") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "2022-03-18" } });

    expect(onChangeMock).toHaveBeenCalled();
  });
});
