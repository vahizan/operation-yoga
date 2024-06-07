import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createLessonTemplate, getInstructors } from "../../../hooks/api";
import { UserType } from "../../../enum/UserType";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import CreateLessonTemplate from "../create-lesson-template";

jest.mock(
  "../../../ui/Layout",
  () =>
    ({ children }: { children: React.ReactNode }) =>
      <div>{children}</div>
);

jest.mock("../../../hooks/api", () => ({
  ...jest.requireActual("../../../hooks/api"),
  getInstructors: jest.fn(),
  createLessonTemplate: jest.fn().mockResolvedValue({ data: {} }),
}));

jest.mock("next-auth/react", () => ({
  ...jest.requireActual("next-auth/react"),
  useSession: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useRouter: jest.fn(),
}));

describe("Create Lesson Template", () => {
  beforeEach(() => {
    (getInstructors as jest.Mock).mockResolvedValue(undefined);
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
  });

  afterEach(jest.resetAllMocks);

  it("should submit on successful validation", async () => {
    (getInstructors as jest.Mock).mockResolvedValue({
      data: [
        {
          name: "bob",
          email: "bob@bob.com",
          type: UserType.ADMIN,
          id: "someID",
        },
      ],
    });

    (useSession as jest.Mock).mockReturnValue({
      status: "authenticated",
      data: { user: { name: "ME", email: "me@me.com" }, expires: "" },
    });

    render(<CreateLessonTemplate />);

    const select = screen.getAllByRole("combobox");
    await waitFor(() => {
      //start time
      userEvent.selectOptions(select[0], "0.5");
      //end time
      userEvent.selectOptions(select[1], "1");
      //day of the week
      userEvent.selectOptions(select[2], "1");
      //currency
      userEvent.selectOptions(select[3], "GBP");
    });

    //select instructor
    act(() => {
      userEvent.selectOptions(select[4], "someID");
    });

    const description = screen.getByRole("textbox", { name: "Description" });
    const price = screen.getByRole("spinbutton", { name: "Price" });
    const lesson = screen.getByRole("textbox", { name: "Lesson Name" });
    const room = screen.getByRole("textbox", { name: "Room/Location" });

    await userEvent.type(lesson, "Lesson");
    await userEvent.type(price, "PRICE");
    await userEvent.type(description, "DESCRIPTION");
    await userEvent.type(price, "123");
    await userEvent.type(lesson, "LESSON");
    await userEvent.type(room, "ROOM");

    await userEvent.click(
      screen.getByRole("button", { name: "Create Lesson Template" })
    );
    await waitFor(() => {
      expect(createLessonTemplate).toHaveBeenCalledWith({
        availability: 30,
        createdBy: {
          _id: undefined,
          email: "me@me.com",
          name: "ME",
        },
        currency: "GBP",
        dayOfWeek: "1",
        endTime: "1",
        instructor: {
          id: "someID",
          email: "bob@bob.com",
          name: "bob",
          type: UserType.ADMIN,
        },
        location: "ROOM",
        name: "LessonLESSON",
        price: "123",
        startTime: "0.5",
      });
    });
  });
});
