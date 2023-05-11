import React from "react";
import { fireEvent, render } from "@testing-library/react";
import BookButton from "../BookButton";

describe("BookButton component", () => {
  it("renders the button with the correct text", () => {
    const { getByText } = render(<BookButton onClick={() => {}} />);
    expect(getByText("Book Now")).toBeInTheDocument();
  });

  it("calls the onClick function when clicked", () => {
    const onClick = jest.fn();
    const { getByText } = render(<BookButton onClick={onClick} />);
    const button = getByText("Book Now");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
