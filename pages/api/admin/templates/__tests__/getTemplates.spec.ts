import { NextApiRequest, NextApiResponse } from "next";
import handler from "../index";
import { prismaMock } from "../../../../../prismaMockSingleton";

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

    expect(res.status).toHaveBeenCalledWith(404);
    await expect(jsonMock).toHaveBeenCalledWith({ error: "Method Invalid" });
  });

  it("should return 500 if an error occurs when getting templates", async () => {
    const req = mockRequest();
    req.query = {
      userId: "543",
      page: "!",
      limit: "a",
    };
    const res = mockResponse();

    prismaMock.adminLesson.findMany.mockRejectedValue(
      new Error("Connection Invalid")
    );

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    await expect(jsonMock).toHaveBeenCalledWith({
      error: "An error occurred. Please try again.",
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
      limit: "10",
      userId: "10",
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

  it("should return 200 when admin lessons are received successfully", async () => {
    const req = mockRequest();
    req.query = {
      page: "2",
      limit: "10",
      userId: "10",
    };
    const res = mockResponse();

    prismaMock.adminLesson.findMany.mockResolvedValue([
      {
        id: "1",
        instructorId: "10",
        lessonCreatorId: "10",
      } as any,
    ]);

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    await expect(jsonMock).toHaveBeenCalledWith([
      {
        id: "1",
        instructorId: "10",
        lessonCreatorId: "10",
      },
    ]);
  });
});
