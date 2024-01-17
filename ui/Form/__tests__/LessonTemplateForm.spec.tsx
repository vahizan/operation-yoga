import React from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LessonTemplateForm from "../LessonTemplateForm";
import { SessionProvider } from "next-auth/react";
import { getInstructors } from "../../../hooks/api";
import { UserType } from "../../../enum/UserType";

jest.mock("../../../hooks/api", () => ({
  ...jest.requireActual("../../../hooks/api"),
  getInstructors: jest.fn(),
}));

describe("LessonTemplateForm", () => {
  const mockOnSubmit = jest.fn();
  beforeEach(() => {
    (getInstructors as jest.Mock).mockResolvedValue(undefined);
  });

  test("renders form fields", () => {
    const { container } = render(
      <SessionProvider
        session={{ user: { name: undefined, email: undefined }, expires: "1" }}
      >
        <LessonTemplateForm onSubmit={mockOnSubmit} />
      </SessionProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it("show error when start time is greater than end time on submission", async () => {
    render(
      <SessionProvider
        session={{ user: { name: undefined, email: undefined }, expires: "1" }}
      >
        <LessonTemplateForm onSubmit={mockOnSubmit} />
      </SessionProvider>
    );
    const timeSelect = screen.getAllByRole("combobox");
    await userEvent.selectOptions(timeSelect[0], "0.5");
    await userEvent.selectOptions(timeSelect[1], "0");

    // Submit the form
    fireEvent.click(screen.getByText("Create Lesson"));

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
      <SessionProvider
        session={{ user: { name: undefined, email: undefined }, expires: "1" }}
      >
        <LessonTemplateForm onSubmit={mockOnSubmit} />
      </SessionProvider>
    );
    // Submit the form
    fireEvent.click(screen.getByText("Create Lesson"));

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
          _id: "someID",
        },
      ],
    });

    render(
      <SessionProvider
        session={{ user: { name: "ME", email: "me@me.com" }, expires: "1" }}
      >
        <LessonTemplateForm onSubmit={mockOnSubmit} />
      </SessionProvider>
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

    await userEvent.click(screen.getByText("Create Lesson"));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        availability: 30,
        createdBy: "me@me.com",
        currency: "GBP",
        dayOfWeek: 1,
        endTime: "1",
        instructor: {
          _id: "someID",
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
