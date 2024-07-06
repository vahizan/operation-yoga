import { NextApiRequest, NextApiResponse } from "next";
import handler from "../forgot-password";
import { sendPasswordResetEmail } from "../../../../helpers/passwordResetEmail";
import createMongoConnection from "../../../../connector/createMongoConnection";
import AuthenticationStatusCode from "../../../../helpers/AuthenticationStatusCode";

const mockReq: Partial<NextApiRequest> = {
  body: {
    email: "test@example.com",
  },
  headers: {
    "x-forwarded-proto": "http",
    "x-forwarded-host": "example.com",
  },
} as Partial<NextApiRequest>;

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(() => "mocked_token"),
}));

jest.mock("../../../../connector/createMongoConnection");

jest.mock("../../../../helpers/passwordResetEmail", () => ({
  sendPasswordResetEmail: jest.fn(() =>
    Promise.resolve(AuthenticationStatusCode.SUCCESS)
  ),
}));

jest.mock("../../../../connector/MongoDatabaseConnection");

jest.mock(
  "../../enquire/email-templates/EnquireTemplate",
  () => (html: string, email: string) => {
    return `<p>${html}</p><p>Email: ${email}</p>`;
  }
);

describe("handler", () => {
  const mockJson = jest.fn();
  const mockStatus = jest.fn().mockReturnValue({ json: mockJson });
  let mockRes = { status: mockStatus } as Partial<NextApiResponse>;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should send password reset email and return success", async () => {
    process.env.PROVIDER_EMAIL_VERIFICATION_SECRET = "your-email-secret";

    const mockUsers = {
      findOne: jest.fn().mockResolvedValue("jo"),
      updateOne: jest.fn().mockResolvedValue(true),
    };
    const mockConnection = {
      model: jest.fn().mockReturnValue(mockUsers),
    };
    const mockConnector = {
      connect: jest.fn().mockResolvedValue(mockConnection),
      disconnect: jest.fn(),
    };

    (createMongoConnection as jest.Mock).mockReturnValue(mockConnector);
    await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

    expect(createMongoConnection).toHaveBeenCalledTimes(1);
    expect(mockJson).toHaveBeenCalledWith({
      message: "Password reset email has been sent.",
    });
    expect(mockStatus).toHaveBeenCalledWith(200);

    expect(sendPasswordResetEmail).toHaveBeenCalledWith({
      email: "test@example.com",
      subject: "You've requested to reset your password",
      body: "Click on the link to reset password",
      html: "<p>Please click on this link to reset your password: http://example.com?verifyToken=mocked_token</p><p>Email: test@example.com</p>",
    });
  });

  it("should handle database connection error", async () => {
    const mockConnector = {
      connect: jest.fn().mockReturnValue(undefined),
      disconnect: jest.fn(),
    };

    (createMongoConnection as jest.Mock).mockReturnValue(mockConnector);

    await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

    expect(createMongoConnection).toHaveBeenCalledTimes(1);
    expect(mockStatus).toHaveBeenCalledWith(500);
    expect(mockJson).toHaveBeenCalledWith({ message: "connection error" });
  });

  it("should handle user error", async () => {
    const mockUsers = {
      findOne: jest.fn().mockReturnValue(undefined),
    };
    const mockConnection = {
      model: jest.fn().mockReturnValue(mockUsers),
    };
    const mockConnector = {
      connect: jest.fn().mockResolvedValue(mockConnection),
      disconnect: jest.fn(),
    };

    (createMongoConnection as jest.Mock).mockReturnValue(mockConnector);

    await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

    expect(createMongoConnection).toHaveBeenCalledTimes(1);
    expect(mockStatus).toHaveBeenCalledWith(500);
    expect(mockJson).toHaveBeenCalledWith({ message: "user doesn't exist" });
  });
});
