import { NextApiRequest, NextApiResponse } from "next";
import handler from "../index";
import MongoDatabaseConnection from "../../../../../connector/MongoDatabaseConnection";

jest.mock("../../../../../../connector/MongoDatabaseConnection");

describe("API Get Template By UserId Handler Tests", () => {
  const jsonMock = jest.fn();
  const statusMock = jest.fn();

  const mockRequest = (method?: string): NextApiRequest =>
    <NextApiRequest>{
      method: method ? method : "GET",
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
    jest.restoreAllMocks();
  });

  it("should return 404 if request method is incorrect", async () => {
    const req = mockRequest("POST");

    const res = mockResponse();

    await handler(req, res);

    await expect(res.status).toHaveBeenCalledWith(404);
    await expect(jsonMock).toHaveBeenCalledWith({ error: "Method Invalid" });
  });

  it("should return 403 if unable to connect to MongoDB", async () => {
    const req = mockRequest();
    req.query = {
      userId: "w",
      page: "!",
      limit: "a",
    };
    const res = mockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    await expect(jsonMock).toHaveBeenCalledWith({ error: "Unauthorized" });
  });

  it("should return 500 if an error occurs when getting templates", async () => {
    const req = mockRequest();
    req.query = {
      page: "2",
      limit: "10",
      userId: "@12312321",
    };
    const res = mockResponse();

    const findMock = jest.fn().mockReturnValue({
      limit: jest
        .fn()
        .mockResolvedValue({ skip: jest.fn().mockRejectedValue("") }),
    });
    const mockGetTemplates = {
      find: findMock,
    };
    const mockConnection = {
      model: jest.fn().mockReturnValue(mockGetTemplates),
    };
    const mockConnector = {
      connect: jest.fn().mockResolvedValue(mockConnection),
      disconnect: jest.fn(),
    };

    (MongoDatabaseConnection as jest.Mock).mockReturnValue(mockConnector);

    await handler(req, res);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      error: "An error occurred. Please try again.",
    });
  });

  it("should return 500 if an error occurs during database connection", async () => {
    const req = mockRequest();
    req.query = {
      userId: "543",
      page: "!",
      limit: "a",
    };
    const res = mockResponse();

    (MongoDatabaseConnection as jest.Mock).mockReturnValue({
      connect: () => {
        throw new Error("Database connection error");
      },
      disconnect: jest.fn(),
    });

    await handler(req, res);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      error: "DB connection error",
    });
  });

  it("should return 400 for missing all Ids", async () => {
    const req = mockRequest();
    req.query = {
      page: "2",
      limit: "10",
    };
    const res = mockResponse();

    await handler(req, res);

    expect(statusMock).toHaveBeenCalledWith(400);
  });

  it("should return 400 for missing page value", async () => {
    const req = mockRequest();
    req.query = {
      userId: "2",
      limit: "10",
    };
    const res = mockResponse();

    await handler(req, res);

    expect(statusMock).toHaveBeenCalledWith(400);
  });

  it("should return 400 for missing limit value", async () => {
    const req = mockRequest();
    req.query = {
      page: "2",
      userId: "10",
    };
    const res = mockResponse();

    await handler(req, res);

    expect(statusMock).toHaveBeenCalledWith(400);
  });

  it("should return 200 and create a new user successfully", async () => {
    const req = mockRequest();
    req.query = {
      page: "2",
      limit: "10",
      userId: "@12312321",
    };
    const res = mockResponse();

    // Mock the Mongoose create method to return a successful response
    const mockUsers = {
      find: jest.fn().mockReturnValue({
        limit: jest
          .fn()
          .mockReturnValue({ skip: jest.fn().mockReturnValue("results") }),
      }),
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

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith("results");
  });
});
