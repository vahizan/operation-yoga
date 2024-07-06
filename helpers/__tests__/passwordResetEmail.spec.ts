import { sendPasswordResetEmail } from "../passwordResetEmail";
import createMongoConnection from "../../connector/createMongoConnection";
import { sendEmail } from "../sendEmail";

jest.mock("../../connector/createMongoConnection");

jest.mock("../../model/User.model", () => {
  return {
    USER_MODEL_NAME: "User",
  };
});

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
    expect(result).toBe(3); // AuthenticationStatusCode.INVALID_CREDENTIALS
  });

  it("should return CONNECTION_FAILED when database connection fails", async () => {
    (createMongoConnection as jest.Mock).mockReturnValue({
      connect: () => undefined,
    });

    const result = await sendPasswordResetEmail(emailInfo);
    expect(result).toBe(1); // AuthenticationStatusCode.CONNECTION_FAILED
  });

  it("should return USER_NOT_EXIST when user does not exist", async () => {
    (createMongoConnection as jest.Mock).mockReturnValue({
      connect: () => {
        return { model: jest.fn().mockReturnValue({ findOne: () => null }) };
      },
    });

    const result = await sendPasswordResetEmail(emailInfo);
    expect(result).toBe(0); // AuthenticationStatusCode.USER_NOT_EXIST
  });

  it("should return SUCCESS when email is sent successfully", async () => {
    (createMongoConnection as jest.Mock).mockReturnValue({
      connect: () => {
        return {
          model: jest.fn().mockReturnValue({
            findOne: () => Promise.resolve(true),
          }),
        };
      },
      disconnect: jest.fn(),
    });
    const result = await sendPasswordResetEmail(emailInfo);
    expect(result).toBe(4); // AuthenticationStatusCode.SUCCESS
  });

  it("should return EMAIL_FAILED when email sending fails", async () => {
    (createMongoConnection as jest.Mock).mockReturnValue({
      connect: () => {
        return {
          model: jest.fn().mockReturnValue({
            findOne: () => Promise.resolve(true),
          }),
        };
      },
      disconnect: jest.fn(),
    });

    (sendEmail as jest.Mock).mockReturnValue(Promise.reject("ERROR"));

    const result = await sendPasswordResetEmail(emailInfo);
    expect(result).toBe(5); // AuthenticationStatusCode.EMAIL_FAILED
  });
});
