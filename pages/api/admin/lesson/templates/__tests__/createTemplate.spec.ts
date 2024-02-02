import { NextApiRequest, NextApiResponse } from "next";
import handler from "../create";
import MongoDatabaseConnection from "../../../../../../connector/MongoDatabaseConnection";
import { AxiosError } from "axios";

jest.mock("../../../../../../connector/MongoDatabaseConnection");

describe("API Create Template Handler Tests", () => {
  const jsonMock = jest.fn();
  const statusMock = jest.fn();
  const mockRequest = (requestMethod?: string): NextApiRequest =>
    <NextApiRequest>{
      body: {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        phone: "1234567890",
      },
      method: requestMethod || "POST",
    };

  const mockResponse = (): NextApiResponse => {
    const res: Partial<NextApiResponse> = {};
    res.status = statusMock.mockReturnValue({ json: jsonMock });

    res.json = jest.fn();
    return res as NextApiResponse;
  };

  beforeEach(() => {
    // Mock environment variables if necessary
    process.env.MONGODB_URI = "your-mock-mongodb-uri";
    process.env.MONGO_DB_NAME = "your-mock-db-name";
  });

  afterEach(() => {
    // Clear mocked environment variables
    delete process.env.MONGODB_URI;
    delete process.env.MONGO_DB_NAME;
    jest.clearAllMocks();
  });

  it("should return 404 if request method is incorrect", async () => {
    const req = mockRequest("GET");

    const res = mockResponse();

    await handler(req, res);

    await expect(res.status).toHaveBeenCalledWith(404);
    await expect(jsonMock).toHaveBeenCalledWith({ error: "Method Invalid" });
  });

  it("should return 403 if unable to connect to MongoDB", async () => {
    const req = mockRequest();
    const res = mockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    await expect(jsonMock).toHaveBeenCalledWith({ error: "Unauthorized" });
  });

  it("should return 500 if create fails", async () => {
    const req = mockRequest();

    const res = mockResponse();

    const mockCreate = {
      create: jest.fn().mockRejectedValue(new Error()),
    };
    const mockConnection = {
      model: jest.fn().mockReturnValue(mockCreate),
    };
    const mockConnector = {
      connect: jest.fn().mockResolvedValue(mockConnection),
      disconnect: jest.fn(),
    };

    (MongoDatabaseConnection as jest.Mock).mockReturnValue(mockConnector);

    await handler(req, res);

    await expect(res.status).toHaveBeenCalledWith(500);
  });

  it("should return 200 and create a new template successfully", async () => {
    const req = mockRequest();
    const res = mockResponse();

    // Mock the Mongoose create method to return a successful response
    const mockUsers = {
      create: jest.fn().mockResolvedValue("Template created"),
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

    expect(res.status).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith("Template created");
  });

  it("should return 500 if an error occurs during database connection", async () => {
    const req = mockRequest();
    const res = mockResponse();

    (MongoDatabaseConnection as jest.Mock).mockReturnValue({
      connect: jest.fn().mockRejectedValue(() => {
        throw new Error("Database connection error");
      }),
      disconnect: jest.fn(),
    });

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      error: "DB connection error",
    });
  });
});
