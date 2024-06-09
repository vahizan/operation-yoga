import handler from "../index";
import { prismaMock } from "../../../../../prismaMockSingleton";
import { NextApiRequest, NextApiResponse } from "next";

describe("Instructor Lessons API", () => {
  it("should return 404 if method is not GET", async () => {
    const req: Partial<NextApiRequest> = {
      method: "POST",
    };
    const res: Partial<NextApiResponse> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await handler(req as NextApiRequest, res as NextApiResponse);

    expect(res.status).toBeCalledWith(404);
    expect(res.json).toBeCalledWith({ error: "Method Invalid" });
  });

  it("should return 200 with data", async () => {
    const req: Partial<NextApiRequest> = {
      method: "GET",
      query: {
        id: "1",
      },
    };
    const res: Partial<NextApiResponse> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    prismaMock.lesson.findMany.mockResolvedValue([
      {
        id: "1",
        name: "Lesson 1",
      } as any,
    ]);

    await handler(req as NextApiRequest, res as NextApiResponse);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      page: 1,
      limit: 10,
      data: [{ id: "1", name: "Lesson 1" }],
    });
  });
});
