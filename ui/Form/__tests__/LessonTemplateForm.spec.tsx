import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LessonTemplateForm from "../LessonTemplateForm";
import { getInstructors } from "../../../hooks/api";
import { UserType } from "../../../enum/UserType";
import { useRouter } from "next/navigation";
import { UserProvider } from "@auth0/nextjs-auth0/client";

jest.mock("../../../hooks/api", () => ({
  ...jest.requireActual("../../../hooks/api"),
  getInstructors: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useRouter: jest.fn(),
}));

describe("LessonTemplateForm", () => {
  const mockOnSubmit = jest.fn();
  const setSubmit = jest.fn();
  beforeEach(() => {
    (getInstructors as jest.Mock).mockResolvedValue(undefined);
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
  });
  afterEach(jest.resetAllMocks);
  test("renders form fields", () => {
    const { container } = render(
      <UserProvider user={{ name: undefined, email: undefined }}>
        <LessonTemplateForm
          onSubmit={mockOnSubmit}
          setSubmit={setSubmit}
          isSubmit={true}
        />
      </UserProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it("show error when start time is greater than end time on submission", async () => {
    const { rerender } = render(
      <UserProvider user={{ name: undefined, email: "me@me.com" }}>
        <LessonTemplateForm
          onSubmit={mockOnSubmit}
          setSubmit={setSubmit}
          isSubmit={false}
        />
      </UserProvider>
    );
    const timeSelect = screen.getAllByRole("combobox");
    await userEvent.selectOptions(timeSelect[0], "1");
    await userEvent.selectOptions(timeSelect[1], "0");

    rerender(
      <UserProvider user={{ name: undefined, email: "me@me.com" }}>
        <LessonTemplateForm
          onSubmit={mockOnSubmit}
          setSubmit={setSubmit}
          isSubmit={true}
        />
      </UserProvider>
    );

    await waitFor(() => {
      expect(
        screen.getByText(
          "Invalid duration, start time cannot be greater than end time"
        )
      ).toBeInTheDocument();
    });
  });

  it("show error values aren't filled before submission", async () => {
    render(
      <UserProvider user={{ name: undefined, email: "me@me.com" }}>
        <LessonTemplateForm
          onSubmit={mockOnSubmit}
          setSubmit={setSubmit}
          isSubmit={true}
        />
      </UserProvider>
    );

    expect(
      screen.getByText("Start time is required and should not be in the past")
    ).toBeInTheDocument();
    expect(screen.getByText("End time is required")).toBeInTheDocument();
    expect(screen.getByText("Description is required")).toBeInTheDocument();
    expect(screen.getByText("Currency is required")).toBeInTheDocument();
    expect(screen.getByText("Lesson name is required")).toBeInTheDocument();
  });

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

    const { rerender } = render(
      <UserProvider user={{ name: "ME", email: "me@me.com" }}>
        <LessonTemplateForm
          onSubmit={mockOnSubmit}
          setSubmit={setSubmit}
          isSubmit={false}
        />
      </UserProvider>
    );

    const select = screen.getAllByRole("combobox");
    //start time
    await userEvent.selectOptions(select[0], "0.5");
    //end time
    await userEvent.selectOptions(select[1], "1");
    //day of the week
    await userEvent.selectOptions(select[2], "1");
    //currency
    await userEvent.selectOptions(select[3], "GBP");
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

    rerender(
      <UserProvider user={{ name: "ME", email: "me@me.com" }}>
        <LessonTemplateForm
          onSubmit={mockOnSubmit}
          setSubmit={setSubmit}
          isSubmit={true}
        />
      </UserProvider>
    );
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
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
          type: "admin",
        },
        location: "ROOM",
        name: "LessonLESSON",
        price: "123",
        startTime: "0.5",
      });
    });
  });
});
