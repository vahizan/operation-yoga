import { NextApiRequest, NextApiResponse } from "next";
import handler from "../forgot-password";
import { sendPasswordResetEmail } from "../../../../helpers/passwordResetEmail";
import AuthenticationStatusCode from "../../../../helpers/AuthenticationStatusCode";
import { prismaMock } from "../../../../prismaMockSingleton";
import { UserType } from "../../../../enum/UserType";

const mockReq: Partial<NextApiRequest> = {
  body: {
    email: "test@example.com",
  },
  headers: {
    "x-forwarded-proto": "http",
    "x-forwarded-host": "example.com",
  },
} as Partial<NextApiRequest>;

jest.mock("@prisma/client");

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(() => "mocked_token"),
}));

jest.mock("../../../../helpers/passwordResetEmail", () => ({
  sendPasswordResetEmail: jest.fn(() =>
    Promise.resolve(AuthenticationStatusCode.SUCCESS)
  ),
}));

jest.mock(
  "../../enquire/email-templates/EnquireTemplate",
  () => (html: string, email: string) => {
    return `<p>${html}</p><p>Email: ${email}</p>`;
  }
);

describe("forgot-password handler", () => {
  const mockJson = jest.fn();
  const mockStatus = jest.fn().mockReturnValue({ json: mockJson });
  let mockRes = { status: mockStatus } as Partial<NextApiResponse>;

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should send password reset email and return success", async () => {
    process.env.PROVIDER_EMAIL_VERIFICATION_SECRET = "your-email-secret";

    prismaMock.user.findFirst.mockResolvedValue({
      id: "user-id",
      email: "test@example.com",
      type: UserType.CUSTOMER,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any);

    prismaMock.verificationToken.create.mockResolvedValue({} as any);

    await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith({
      message: "Password reset email has been sent.",
      code: AuthenticationStatusCode.SUCCESS,
    });

    expect(sendPasswordResetEmail).toHaveBeenCalledWith({
      email: "test@example.com",
      subject: "You've requested to reset your password",
      body: "Click on the link to reset password",
      html: "<p>Please click on this link to reset your password: http://example.com/reset-password/mocked_token</p><p>Email: test@example.com</p>",
    });
  });

  it("should handle database connection error", async () => {
    await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

    expect(mockStatus).toHaveBeenCalledWith(500);
    expect(mockJson).toHaveBeenCalledWith({
      message: "connection error",
      code: AuthenticationStatusCode.CONNECTION_FAILED,
    });
  });

  it("should handle user not found", async () => {
    prismaMock.user.findFirst.mockResolvedValue(null);

    await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

    expect(mockStatus).toHaveBeenCalledWith(404);
    expect(mockJson).toHaveBeenCalledWith({
      message: "User doesn't exist",
      code: AuthenticationStatusCode.USER_NOT_EXIST,
    });
  });

  it("should handle internal server error on unexpected exceptions", async () => {
    prismaMock.user.findFirst.mockRejectedValue(new Error("Unexpected error"));
    await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

    expect(mockStatus).toHaveBeenCalledWith(500);
    expect(mockJson).toHaveBeenCalledWith({
      message: "Internal server error.",
      code: AuthenticationStatusCode.INTERNAL_SERVER_ERROR,
    });
  });

  it("should handle email sending failure", async () => {
    process.env.PROVIDER_EMAIL_VERIFICATION_SECRET = "your-email-secret";

    prismaMock.user.findFirst.mockResolvedValue({
      id: "user-id",
      email: "test@example.com",
    } as any);

    prismaMock.verificationToken.create.mockResolvedValue({} as any);

    (sendPasswordResetEmail as jest.Mock).mockRejectedValue(
      AuthenticationStatusCode.EMAIL_FAILED
    );

    await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

    expect(mockStatus).toHaveBeenCalledWith(500);
    expect(mockJson).toHaveBeenCalledWith({
      message: "Internal server error.",
      code: AuthenticationStatusCode.EMAIL_FAILED,
    });
  });
});
