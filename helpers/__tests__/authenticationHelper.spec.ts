import { authorizeLogin, getTokenPayload } from "../authenticationHelper";
import { comparePassword } from "../loginHelper";
import { verify } from "jsonwebtoken";
import createMongoConnection from "../../connector/createMongoConnection";

jest.mock("bcrypt");
jest.mock("mongoose");
jest.mock("../loginHelper");
jest.mock("../../connector/createMongoConnection");

jest.mock("jsonwebtoken", () => ({
  ...jest.requireActual("jsonwebtoken"),
  verify: jest.fn(),
  decrypt: jest.fn(),
}));

describe("authenticationHelper", () => {
  beforeEach(() => {
    process.env.MONGODB_URI = "your-mock-mongodb-uri";
    process.env.MONGO_DB_NAME = "your-mock-db-name";

    (verify as jest.Mock).mockImplementation((token, secret) => {
      if (token === "validToken" && secret === "validSecret") {
        return { userId: 1, username: "testuser" };
      } else {
        throw new Error("Invalid token or secret");
      }
    });
  });
  afterEach(() => {
    jest.restoreAllMocks();
    delete process.env.MONGODB_URI;
    delete process.env.MONGO_DB_NAME;
  });
  describe("authorizeLogin", () => {
    it("should return null if credentials are missing", async () => {
      const result = await authorizeLogin(undefined);
      expect(result).toBeNull();
    });

    it("should return null if connection fails", async () => {
      const mockUsers = {
        findOne: jest.fn().mockResolvedValue("jo"),
      };
      const mockConnection = {
        model: jest.fn().mockReturnValue(mockUsers),
      };
      const mockConnector = {
        connect: jest.fn().mockResolvedValue(mockConnection),
        disconnect: jest.fn(),
      };

      (createMongoConnection as jest.Mock).mockReturnValue(mockConnector);

      const result = await authorizeLogin({
        email: "test@example.com",
        password: "password",
      });
      expect(result).toBeNull();
      expect(mockConnector.connect).toHaveBeenCalled();
    });

    it("should return null if user is not found or password is invalid", async () => {
      const mockComparePassword = jest.fn(() => false);
      (comparePassword as jest.Mock).mockReturnValue(mockComparePassword);

      const mockUsers = {
        findOne: jest.fn().mockResolvedValue("hi"),
      };
      const mockConnection = {
        model: jest.fn().mockReturnValue(mockUsers),
      };
      const mockConnector = {
        connect: jest.fn().mockResolvedValue(mockConnection),
        disconnect: jest.fn(),
      };

      (createMongoConnection as jest.Mock).mockReturnValue(mockConnector);

      const result = await authorizeLogin({
        email: "test@example.com",
        password: "password",
      });
      expect(result).toBeNull();
      expect(mockConnector.connect).toHaveBeenCalled();
      expect(mockComparePassword).toHaveBeenCalled();
    });

    it("should return user details if credentials are valid", async () => {
      const mockUsers = {
        findOne: jest.fn().mockResolvedValue("hi"),
      };
      const mockConnection = {
        model: jest.fn().mockReturnValue(mockUsers),
      };
      const mockConnector = {
        connect: jest.fn().mockResolvedValue(mockConnection),
        disconnect: jest.fn(),
      };

      (createMongoConnection as jest.Mock).mockReturnValue(mockConnector);

      const mockComparePassword = jest.fn(() => true);
      (comparePassword as jest.Mock).mockReturnValue(mockComparePassword);

      const result = await authorizeLogin({
        email: "test@example.com",
        password: "password",
      });
      expect(result).toEqual({
        id: 1,
        email: "test@example.com",
        name: "Test User",
      });
      expect(mockConnector.connect).toHaveBeenCalled();
    });
  });

  describe("getTokenPayload", () => {
    it("should return undefined when secret is not provided", () => {
      const verificationToken = "validToken";
      const secret = undefined;

      const result = getTokenPayload(verificationToken, secret);

      expect(result).toBe(undefined);
    });

    it("should return the decoded payload when using a valid token and secret", () => {
      const verificationToken = "validToken";
      const secret = "validSecret";

      const result = getTokenPayload(verificationToken, secret);

      expect(result).toEqual({ userId: 1, username: "testuser" });
    });

    it("should throw an error when using an invalid token or secret", () => {
      const verificationToken = "invalidToken";
      const secret = "validSecret";

      expect(() => getTokenPayload(verificationToken, secret)).toThrowError(
        "Invalid token or secret"
      );
    });
  });
});
