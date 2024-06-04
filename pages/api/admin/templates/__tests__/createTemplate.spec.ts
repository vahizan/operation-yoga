import { NextApiRequest, NextApiResponse } from "next";
import handler from "../create";
import { prismaMock } from "../../../../../prismaMockSingleton";

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

  it("should return 500 if create fails", async () => {
    const req = mockRequest();
    const res = mockResponse();

    prismaMock.adminLesson.create.mockRejectedValue(new Error("Create failed"));

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    await expect(jsonMock).toHaveBeenCalledWith({
      error: "Internal server error",
    });
  });

  it("should return 200 and create a new template successfully", async () => {
    const req = mockRequest();
    const res = mockResponse();

    prismaMock.adminLesson.create.mockResolvedValue({
      id: "1",
      name: "Lesson 1",
    } as any);

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    await expect(jsonMock).toHaveBeenCalledWith({
      id: "1",
      name: "Lesson 1",
    });
  });
});
