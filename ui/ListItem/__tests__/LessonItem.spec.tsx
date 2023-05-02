import React from "react";
import { render } from "@testing-library/react";
import PackageItem from "../PackageItem";

describe("PackageItem", () => {
  const props = {
    price: 10,
    name: "Test Event",
    description: "A test event for unit testing",
  };

  it("renders the title and description", () => {
    const { getByText } = render(<PackageItem {...props} />);
    const titleElement = getByText(props.name);
    const descriptionElement = getByText(props.description);
    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });

  it("renders the cost", () => {
    const { getByText } = render(<PackageItem {...props} />);
    const costElement = getByText(`Cost: $${props.price}`);
    expect(costElement).toBeInTheDocument();
  });
});
