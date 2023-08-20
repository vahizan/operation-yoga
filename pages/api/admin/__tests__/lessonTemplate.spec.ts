import { NextApiRequest, NextApiResponse } from "next";
import handler from "../index";
import MongoDatabaseConnection from "../../../../connector/MongoDatabaseConnection";

jest.mock("../../../../connector/MongoDatabaseConnection");

const mockRequest = (): NextApiRequest =>
  <NextApiRequest>{
    body: {
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      phone: "1234567890",
    },
  };

const mockResponse = (): NextApiResponse => {
  const res: Partial<NextApiResponse> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as NextApiResponse;
};

describe("API Lesson Handler Tests", () => {
  beforeEach(() => {
    // Mock environment variables if necessary
    process.env.MONGODB_URI = "your-mock-mongodb-uri";
    process.env.MONGO_DB_NAME = "your-mock-db-name";
  });

  afterEach(() => {
    // Clear mocked environment variables
    delete process.env.MONGODB_URI;
    delete process.env.MONGO_DB_NAME;
  });

  it("should return 400 if required fields are missing", async () => {
    const req = mockRequest();
    req.body.name = ""; // Set a required field to an empty string
    const res = mockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please fill in all required fields.",
    });
  });

  it("should return 403 if unable to connect to MongoDB", async () => {
    const req = mockRequest();
    const res = mockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Unauthorized" });
  });

  it("should return 400 if a user with the same email already exists", async () => {
    const req = mockRequest();
    const res = mockResponse();

    // Mock the Mongoose findOne method to return an existing user
    const mockUsers = {
      findOne: jest.fn().mockResolvedValue({ email: req.body.email }),
    };
    const mockConnection = {
      model: jest.fn().mockReturnValue(mockUsers),
    };
    const mockConnector = {
      connect: jest.fn().mockResolvedValue(mockConnection),
      disconnect: jest.fn(),
    };

    (MongoDatabaseConnection as jest.Mock).mockReturnValue(mockConnector);

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "A user with this email already exists.",
    });
  });

  it("should return 200 and create a new user successfully", async () => {
    const req = mockRequest();
    const res = mockResponse();

    // Mock the Mongoose create method to return a successful response
    const mockUsers = {
      findOne: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockResolvedValue("User created"),
    };
    const mockConnection = {
      model: jest.fn().mockReturnValue(mockUsers),
    };
    const mockConnector = {
      connect: jest.fn().mockResolvedValue(mockConnection),
      disconnect: jest.fn(),
    };

    (MongoDatabaseConnection as jest.Mock).mockReturnValue(mockConnector);

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "User created successfully.",
    });
  });

  it("should return 500 if an error occurs during user creation", async () => {
    const req = mockRequest();
    const res = mockResponse();

    // Mock the Mongoose create method to throw an error
    const mockUsers = {
      findOne: jest.fn().mockResolvedValue(null),
      create: jest
        .fn()
        .mockRejectedValue(() => new Error("User creation error")),
    };
    const mockConnection = {
      model: jest.fn().mockReturnValue(mockUsers),
    };
    const mockConnector = {
      connect: jest.fn().mockResolvedValue(mockConnection),
      disconnect: jest.fn(),
    };

    (MongoDatabaseConnection as jest.Mock).mockReturnValue(mockConnector);

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "An error occurred. Please try again.",
    });
  });

  it("should return 500 if an error occurs during database connection", async () => {
    const req = mockRequest();
    const res = mockResponse();

    (MongoDatabaseConnection as jest.Mock).mockReturnValue({
      connect: () => {
        throw new Error("Database connection error");
      },
      disconnect: jest.fn(),
    });

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "An error occurred. Please try again.",
    });
  });
});
