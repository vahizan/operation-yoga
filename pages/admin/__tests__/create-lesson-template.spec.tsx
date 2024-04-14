import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { createLessonTemplate } from "../../../hooks/api";
import CreateLessonTemplate from "../create-lesson-template";
import { UserProvider } from "@auth0/nextjs-auth0/client";

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
      <UserProvider user={{ name: undefined, email: undefined }}>
        <CreateLessonTemplate />
      </UserProvider>
    );
    expect(await screen.findByText("Unauthorized")).toBeInTheDocument();
  });

  test("renders form when user is logged in", async () => {
    render(
      <UserProvider
        user={{
          name: "Test User",
          email: "undefined@undefined",
          user_id: "ID",
          email_verified: true,
        }}
      >
        <CreateLessonTemplate />
      </UserProvider>
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
      <UserProvider
        user={{
          name: "Test User",
          email: "undefined@undefined",
          user_id: "ID",
          email_verified: true,
        }}
      >
        <CreateLessonTemplate />
      </UserProvider>
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
      <UserProvider user={{ name: "Test User", email: undefined }}>
        <CreateLessonTemplate />
      </UserProvider>
    );
    fireEvent.click(screen.getByText("Create Lesson Template"));

    expect(await screen.findByText(errorMessage)).toBeInTheDocument();
  });
});
