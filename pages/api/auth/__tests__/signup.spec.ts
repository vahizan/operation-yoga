import { NextApiRequest, NextApiResponse } from "next";
import handler from "../signup";
import { prismaMock } from "../../../../prismaMockSingleton";

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

describe("Signup Handler Test", () => {
  beforeEach(() => {
    process.env.MONGODB_URI = "your-mock-mongodb-uri";
    process.env.MONGO_DB_NAME = "your-mock-db-name";
  });

  afterEach(() => {
    delete process.env.MONGODB_URI;
    delete process.env.MONGO_DB_NAME;
  });

  it("should return 404 if method is invalid", async () => {
    const req = mockRequest();
    req.body.name = "";
    const res = mockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Method Invalid",
    });
  });

  it("should return 400 if required fields are missing", async () => {
    const req = mockRequest();
    req.method = "POST";
    req.body.name = "";
    const res = mockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please fill in all required fields.",
    });
  });

  it("should return 400 if a user with the same email already exists", async () => {
    const req = mockRequest();
    req.method = "POST";
    req.body.email = "example@email.com";
    const res = mockResponse();

    prismaMock.user.findFirst.mockResolvedValue({
      id: 1,
      name: "John Doe",
      email: "example@email.com",
    } as any);

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "A user with this email already exists.",
    });
  });

  it("should return 200 and create a new user successfully", async () => {
    const req = mockRequest();
    req.method = "POST";
    const res = mockResponse();

    prismaMock.user.findFirst.mockResolvedValue(null);
    prismaMock.user.create.mockResolvedValue({
      id: 1,
      name: "John Doe",
      email: "",
    } as any);

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "User created successfully.",
    });
  });

  it("should return 500 if an error occurs during user creation", async () => {
    const req = mockRequest();
    req.method = "POST";
    const res = mockResponse();

    prismaMock.user.findFirst.mockResolvedValue(null);

    prismaMock.user.create.mockRejectedValue(new Error("User creation error"));

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "An error occurred. Please try again.",
    });
  });

  it("should return 500 if an error occurs during database connection", async () => {
    const req = mockRequest();
    req.method = "POST";
    const res = mockResponse();

    prismaMock.user.findFirst.mockRejectedValue(new Error("Database error"));

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "An error occurred. Please try again.",
    });
  });
});
