import { NextApiRequest, NextApiResponse } from "next";
import handler from "../update";
import MongoDatabaseConnection from "../../../../../../connector/MongoDatabaseConnection";

jest.mock("../../../../../../connector/MongoDatabaseConnection");

describe("API Update Template Handler Tests", () => {
  const jsonMock = jest.fn();
  const statusMock = jest.fn();

  const mockRequest = (method?: string): NextApiRequest =>
    <NextApiRequest>{
      method: method ? method : "PUT",
      body: {
        _id: "1sdasdas",
        availability: 0,
        createdBy: "ID",
        currency: "USD",
        dayOfWeek: 0,
        endTime: 0,
        instructorId: "instructorId",
        price: 0,
        startTime: 0,
        name: "some name",
      },
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

  it("should return 404 if method is incorrect", async () => {
    const req = mockRequest("GET");
    const res = mockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(jsonMock).toHaveBeenCalledWith({
      error: "Method Invalid",
    });
  });

  it("should return 403 if unable to connect to MongoDB", async () => {
    const req = mockRequest();
    const res = mockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(jsonMock).toHaveBeenCalledWith({ error: "Unauthorized" });
  });

  it("should return 200 and create a new user successfully", async () => {
    const req = mockRequest();
    const res = mockResponse();

    // Mock the Mongoose create method to return a successful response
    const mockUsers = {
      findOneAndUpdate: jest.fn().mockResolvedValue(req.body),
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
    expect(jsonMock).toHaveBeenCalledWith(req.body);
  });

  it("should return 500 if an error occurs during template update creation", async () => {
    const req = mockRequest();
    const res = mockResponse();

    // Mock the Mongoose create method to throw an error
    const mockUsers = {
      findOneAndUpdate: jest
        .fn()
        .mockRejectedValue(() => new Error("template update error")),
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
    expect(jsonMock).toHaveBeenCalledWith({
      error: "Unable to update template. Try again later. Server error",
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

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      error: "DB connection error",
    });
  });
});
