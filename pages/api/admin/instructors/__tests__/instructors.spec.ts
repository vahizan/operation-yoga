import { NextApiRequest, NextApiResponse } from "next";
import handler from "../index";
import { prismaMock } from "../../../../../prismaMockSingleton";
import { auth } from "../../../../../auth";

jest.mock("../../../../../auth", () => ({
  auth: jest.fn().mockResolvedValue({
    user: { id: "123" },
  }),
}));

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

describe("Instructors", () => {
  beforeEach(() => {
    // Mock environment variables if necessary
    process.env.MONGODB_URI = "your-mock-mongodb-uri";
    process.env.MONGO_DB_NAME = "your-mock-db-name";
    jest.resetAllMocks();
  });

  afterEach(() => {
    // Clear mocked environment variables
    delete process.env.MONGODB_URI;
    delete process.env.MONGO_DB_NAME;
  });

  it("should return 404 if method is not GET", async () => {
    const req = mockRequest();
    req.method = "POST";
    const res = mockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Method Invalid" });
  });

  it("should return 403 if auth is undefined", async () => {
    const req = mockRequest();
    req.method = "GET";
    const res = mockResponse();

    (auth as jest.Mock).mockResolvedValue(undefined);
    (prismaMock.user.findUnique as jest.Mock).mockResolvedValue(null);

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: "Unauthorized" });
  });

  it("should return 404 if user is not found", async () => {
    const req = mockRequest();
    req.method = "GET";
    const res = mockResponse();

    (auth as jest.Mock).mockResolvedValue({ id: "123" });

    (prismaMock.user.findUnique as jest.Mock).mockResolvedValue(null);

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Not Found" });
  });

  it("should return 200 and get instructors", async () => {
    const req = mockRequest();
    req.method = "GET";
    const res = mockResponse();

    (auth as jest.Mock).mockResolvedValue({ id: "123" });
    (prismaMock.user.findUnique as jest.Mock).mockResolvedValue({
      type: "ADMIN",
    });
    (prismaMock.user.findMany as jest.Mock).mockResolvedValue([
      {
        name: "John Doe",
        type: "ADMIN",
        _id: "123",
      },
    ]);

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      {
        name: "John Doe",
        type: "ADMIN",
        id: "123",
      },
    ]);
  });

  it("should return 500 if an error occurs when fetching instructors", async () => {
    const req = mockRequest();
    req.method = "GET";
    const res = mockResponse();

    (auth as jest.Mock).mockResolvedValue({ id: "123" });
    (prismaMock.user.findUnique as jest.Mock).mockResolvedValue({
      type: "ADMIN",
    });
    (prismaMock.user.findMany as jest.Mock).mockRejectedValue(
      new Error("error")
    );

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "error" });
  });
});
