import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LessonTemplateForm from "../LessonTemplateForm";
import { getInstructors } from "../../../hooks/api";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

jest.mock("../../../hooks/api", () => ({
  ...jest.requireActual("../../../hooks/api"),
  getInstructors: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
  ...jest.requireActual("next-auth/react"),
  useSession: jest.fn(),
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

  it("renders form fields", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { name: "ME", email: "" }, expires: "" },
    });
    const { container } = render(
      <LessonTemplateForm
        onSubmit={mockOnSubmit}
        setSubmit={setSubmit}
        isSubmit={true}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it("show error when start time is greater than end time on submission", async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { name: undefined, email: "me@me.com" }, expires: "" },
    });
    const { rerender } = render(
      <LessonTemplateForm
        onSubmit={mockOnSubmit}
        setSubmit={setSubmit}
        isSubmit={false}
      />
    );

    const timeSelect = screen.getAllByRole("combobox");
    await userEvent.selectOptions(timeSelect[0], "1");
    await userEvent.selectOptions(timeSelect[1], "0");

    rerender(
      <LessonTemplateForm
        onSubmit={mockOnSubmit}
        setSubmit={setSubmit}
        isSubmit={true}
      />
    );

    (useSession as jest.Mock).mockReturnValue({
      data: { user: { name: undefined, email: "me@me.com" }, expires: "" },
    });

    await waitFor(() => {
      expect(
        screen.getByText(
          "Invalid duration, start time cannot be greater than end time"
        )
      ).toBeInTheDocument();
    });
  });

  it("show error values aren't filled before submission", async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { name: undefined, email: "me@me.com" }, expires: "" },
    });

    render(
      <LessonTemplateForm
        onSubmit={mockOnSubmit}
        setSubmit={setSubmit}
        isSubmit={true}
      />
    );

    expect(
      screen.getByText("Start time is required and should not be in the past")
    ).toBeInTheDocument();
    expect(screen.getByText("End time is required")).toBeInTheDocument();
    expect(screen.getByText("Description is required")).toBeInTheDocument();
    expect(screen.getByText("Currency is required")).toBeInTheDocument();
    expect(screen.getByText("Lesson name is required")).toBeInTheDocument();
  });
});
