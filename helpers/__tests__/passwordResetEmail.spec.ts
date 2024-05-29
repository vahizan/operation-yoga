import { sendPasswordResetEmail } from "../passwordResetEmail";
import { sendEmail } from "../sendEmail";
import { prismaMock } from "../../prismaMockSingleton";
import AuthenticationStatusCode from "../AuthenticationStatusCode";

jest.mock("../../connector/createMongoConnection");

jest.mock("@prisma/client");

jest.mock("../sendEmail", () => {
  return {
    sendEmail: jest.fn(() => Promise.resolve()),
  };
});

// Mock the EmailInfo
const emailInfo = {
  email: "test@example.com",
  subject: "Reset Password",
  body: "Please reset your password.",
  html: "<p>Please reset your password.</p>",
};

describe("sendPasswordResetEmail", () => {
  it("should return INVALID_CREDENTIALS when email is missing", async () => {
    const invalidEmailInfo = {
      email: "",
      subject: "Reset Password",
      body: "Please reset your password.",
      html: "<p>Please reset your password.</p>",
    };
    const result = await sendPasswordResetEmail(invalidEmailInfo);
    expect(result).toBe(AuthenticationStatusCode.INVALID_CREDENTIALS);
  });

  it("should return USER_NOT_EXIST when user does not exist", async () => {
    prismaMock.user.findFirst.mockResolvedValue(null);

    const result = await sendPasswordResetEmail(emailInfo);
    expect(result).toBe(AuthenticationStatusCode.USER_NOT_EXIST);
  });

  it("should return SUCCESS when email is sent successfully", async () => {
    prismaMock.user.findFirst.mockResolvedValue({
      email: "email@email.com",
      id: "id",
    } as any);

    const result = await sendPasswordResetEmail(emailInfo);
    expect(result).toBe(AuthenticationStatusCode.SUCCESS);
  });

  it("should return EMAIL_FAILED when email sending fails", async () => {
    prismaMock.user.findFirst.mockResolvedValue({
      email: "email@email.com",
      id: "id",
    } as any);

    (sendEmail as jest.Mock).mockRejectedValue("ERROR");

    const result = await sendPasswordResetEmail(emailInfo);
    expect(result).toBe(AuthenticationStatusCode.EMAIL_FAILED);
  });
});
