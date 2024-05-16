import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { createLessonTemplate } from "../../../hooks/api";
import CreateLessonTemplate from "../../../pages/admin/create-lesson-template";
import { SessionProvider } from "next-auth/react";

jest.mock("public/account-icon.svg", () => () => <div>Account Logo</div>);
jest.mock("public/ogo-only.svg", () => () => <div> Logo Only</div>);

jest.mock("../../../ui/YogshalaFancyLogo", () => () => <div>Fancy Logo</div>);

jest.mock("../../../hooks/api", () => ({
  createLessonTemplate: jest.fn(),
  getInstructors: jest.fn().mockResolvedValue({}),
}));

jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useRouter: jest.fn(),
}));

describe("CreateLessonTemplate", () => {
  test("renders Unauthorized when user is not logged in", async () => {
    render(
      <SessionProvider
        session={{ user: { name: undefined, email: undefined }, expires: "" }}
      >
        <CreateLessonTemplate />
      </SessionProvider>
    );
    expect(await screen.findByText("Unauthorized")).toBeInTheDocument();
  });

  test("renders form when user is logged in", async () => {
    render(
      <SessionProvider
        session={{
          user: {
            name: "Test User",
            email: "undefined@undefined",
          },
          expires: "",
        }}
      >
        <CreateLessonTemplate />
      </SessionProvider>
    );
    await waitFor(() => {
      expect(screen.findByText("Create Lesson Test User")).toBeInTheDocument();
      expect(screen.getByText("Create Lesson Template")).toBeInTheDocument();
    });
  });

  test("submits lesson template data on button click", async () => {
    (createLessonTemplate as jest.Mock).mockResolvedValue({});
    const lessonTemplateData = {
      name: "lesson template",
    };
    render(
      <SessionProvider
        session={{
          expires: "",
          user: {
            name: "Test User",
            email: "undefined@undefined",
          },
        }}
      >
        <CreateLessonTemplate />
      </SessionProvider>
    );
    fireEvent.click(screen.getByText("Create Lesson Template"));

    await waitFor(() => {
      expect(createLessonTemplate).toHaveBeenCalledWith(lessonTemplateData);
    });
  });

  test("displays error message when createLessonTemplate fails", async () => {
    const errorMessage = "Error creating lesson template";

    (createLessonTemplate as jest.Mock).mockRejectedValue(
      new Error(errorMessage)
    );

    render(
      <SessionProvider
        session={{ user: { name: "Test User", email: undefined }, expires: "" }}
      >
        <CreateLessonTemplate />
      </SessionProvider>
    );
    fireEvent.click(screen.getByText("Create Lesson Template"));

    expect(await screen.findByText(errorMessage)).toBeInTheDocument();
  });
});
