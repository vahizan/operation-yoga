import { authorizeLogin, hasSession } from "../loginValidator";
import MongoDatabaseConnection from "../../connector/MongoDatabaseConnection";
import { getServerSession } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { comparePassword } from "../loginHelper";

jest.mock("bcrypt");
jest.mock("mongoose");
jest.mock("../loginHelper");
jest.mock("../../connector/MongoDatabaseConnection");

describe("loginValidator", () => {
  beforeEach(() => {
    process.env.MONGODB_URI = "your-mock-mongodb-uri";
    process.env.MONGO_DB_NAME = "your-mock-db-name";
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

      (MongoDatabaseConnection as jest.Mock).mockReturnValue(mockConnector);

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

      (MongoDatabaseConnection as jest.Mock).mockReturnValue(mockConnector);

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

      (MongoDatabaseConnection as jest.Mock).mockReturnValue(mockConnector);

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

  describe("hasSession", () => {
    it("should return true if session exists", async () => {
      const mockGetServerSession = jest.fn(() => ({ sessionId: "123" }));
      (getServerSession as jest.Mock).mockImplementationOnce(
        mockGetServerSession
      );

      const req = {} as NextApiRequest;
      const res = {} as NextApiResponse;

      const result = await hasSession(req, res);
      expect(result).toBe(true);
      expect(mockGetServerSession).toHaveBeenCalledWith(req, res, authOptions);
    });

    it("should return false if session does not exist", async () => {
      const mockGetServerSession = jest.fn(() => null);
      (getServerSession as jest.Mock).mockImplementationOnce(
        mockGetServerSession
      );

      const req = {} as NextApiRequest;
      const res = {} as NextApiResponse;

      const result = await hasSession(req, res);
      expect(result).toBe(false);
      expect(mockGetServerSession).toHaveBeenCalledWith(req, res, authOptions);
    });
  });
});
