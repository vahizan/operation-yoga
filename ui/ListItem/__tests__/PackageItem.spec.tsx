import React from "react";
import { render } from "@testing-library/react";
import PackageItem from "../PackageItem";
import { useRouter } from "next/router";
import restoreAllMocks = jest.restoreAllMocks;
import { PackageType } from "../../../pages/api/interfaces";

jest.mock("next/router", () => {
  return {
    ...jest.requireActual("next/router"),
    useRouter: jest.fn(),
  };
});

describe("PackageItem", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ locale: "en-GB" });
  });
  afterEach(restoreAllMocks);
  const props = {
    price: 10,
    title: "Test Event",
    description: "A test event for unit testing",
    isIndiaExclusive: false,
    type: PackageType.YOGA,
    currency: "USD",
  };

  it("renders the title and description", () => {
    const { getByText } = render(<PackageItem {...props} />);
    const titleElement = getByText(props.title);
    const descriptionElement = getByText(props.description);
    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });

  it("renders the cost", () => {
    const { getByText } = render(<PackageItem {...props} />);
    const costElement = getByText(`Price: US$${props.price}.00`);
    expect(costElement).toBeInTheDocument();
  });
});
