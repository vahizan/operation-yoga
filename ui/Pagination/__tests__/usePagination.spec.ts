import { renderHook } from "@testing-library/react";
import { usePagination } from "../usePagination";
import axios from "axios";

jest.mock("axios", () => ({
  ...jest.requireActual("axios"),
  get: jest.fn(),
}));

describe("usePagination", () => {
  afterEach(jest.clearAllMocks);

  (axios.get as jest.Mock).mockResolvedValue({ data: "data" });

  it("should return undefined data", () => {
    const { result } = renderHook(() =>
      usePagination({
        fetchUrl: "https://jsonplaceholder.typicode.com/posts",
        page: 1,
        limit: 10,
      })
    );

    expect(result.current.data).toBeUndefined();
  });

  it("should return data", async () => {
    const { result } = renderHook(() =>
      usePagination({
        fetchUrl: "https://jsonplaceholder.typicode.com/posts",
        page: 1,
        limit: 10,
      })
    );

    await expect(result.current.data).toBe("data");
  });

  it("should increment currentPage", () => {
    const { result } = renderHook(() =>
      usePagination({
        fetchUrl: "https://jsonplaceholder.typicode.com/posts",
        page: 1,
        limit: 10,
      })
    );

    result.current.next();
    expect(result.current.currentPage).toBe(2);
  });

  it("should decrement currentPage", () => {
    const { result } = renderHook(() =>
      usePagination({
        fetchUrl: "https://jsonplaceholder.typicode.com/posts",
        page: 2,
        limit: 10,
      })
    );

    result.current.previous();
    expect(result.current.currentPage).toBe(1);
  });

  it("should update currentPage", () => {
    const { result } = renderHook(() =>
      usePagination({
        fetchUrl: "https://jsonplaceholder.typicode.com/posts",
        page: 2,
        limit: 10,
      })
    );

    result.current.updatePage(3);
    expect(result.current.currentPage).toBe(3);
  });
});
