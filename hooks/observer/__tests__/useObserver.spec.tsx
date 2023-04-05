import React from "react";
import { renderHook } from "@testing-library/react";
import useObserver from "../useObserver";
import restoreAllMocks = jest.restoreAllMocks;

const intersectionObserverMock = () => ({
  observe: jest.fn(),
});

describe("useObserver", () => {
  afterEach(restoreAllMocks);

  const props = {
    observerCallback: jest.fn(),
    options: { root: null, rootMargin: "20px", thresholds: [] },
  };

  window.IntersectionObserver = jest
    .fn()
    .mockImplementation(intersectionObserverMock);

  it("should render hook and return a reference to a container", () => {
    const { result } = renderHook(() => useObserver(props));

    expect(result.current.containerRef).toEqual({ current: undefined });
  });
});
