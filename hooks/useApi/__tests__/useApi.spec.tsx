import mockLessonResponses from "../__mocks__/mockLessonResponses";
import useApi from "../useApi";
import { act, renderHook } from "@testing-library/react";
import { getSchedule } from "../../api";

jest.mock("../../api", () => {
  return {
    ...jest.requireActual("../../api"),
    getLessons: jest.fn(),
  };
});

describe("useApi", () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  it("When hook is called Then should call getKnownPropertyAttributes endpoint with all the required params", async () => {
    const setErrorStatusCodeMock = jest.fn();
    (getSchedule as jest.Mock).mockResolvedValue(mockLessonResponses);

    renderHook(() =>
      useApi(getSchedule, [], {
        dayOfWeek: "0",
        startTime: "date",
        endTime: "date",
      })
    );

    act(() => {
      expect(getSchedule as jest.Mock).toHaveBeenCalledWith({
        dayOfWeek: "0",
        startTime: "date",
        endTime: "date",
      });
      expect(setErrorStatusCodeMock).not.toHaveBeenCalled();
    });
  });

  it("should not set data when Error", async () => {
    const setErrorStatusCodeMock = jest.fn();
    (getSchedule as jest.Mock).mockRejectedValue({
      response: { data: { message: "Some Error" }, status: 401 },
    });

    const { result } = renderHook(() => useApi(getSchedule, []));

    act(() => {
      expect(result.current.data).toBe(undefined);
    });
  });

  //TODO: skip this for now
  it.skip("should set timeout error message when Error is timeout related", async () => {
    const setErrorStatusCodeMock = jest.fn();
    (getSchedule as jest.Mock).mockRejectedValue({
      response: { data: { message: "timeout exceeded" }, status: 401 },
    });

    const { result, rerender } = renderHook(() => useApi(getSchedule, []));

    rerender();

    act(() => {
      expect(result.current.apiCallErrorMessage).toEqual(
        "Something went wrong. Please refresh and try again."
      );
    });
  });
});
