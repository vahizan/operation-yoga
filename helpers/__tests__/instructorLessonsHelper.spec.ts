import { getInstructorLessons } from "../admin/instructorLessonsHelper";
import { prismaMock } from "../../prismaMockSingleton";

describe("getInstructorLessons", () => {
  it("should return an object with page, limit, and data properties", async () => {
    const data = [
      { id: "1", instructorId: "1234" } as any,
      { id: "2", instructorId: "1234" } as any,
    ];
    prismaMock.lesson.findMany.mockResolvedValue(data);

    const page = 1;
    const limit = 10;
    const instructorId = "1234";
    const expected = {
      page,
      limit,
      data,
    };
    const actual = await getInstructorLessons(page, limit, instructorId);
    expect(actual).toEqual(expected);
  });

  it("should throw an error if the connection is invalid", async () => {
    prismaMock.lesson.findMany.mockRejectedValue(
      new Error("Connection Invalid")
    );
    const page = 1;
    const limit = 10;
    const instructorId = "1234";
    try {
      await getInstructorLessons(page, limit, instructorId);
    } catch (error) {
      expect(error).toEqual(new Error("Connection Invalid"));
    }
  });
});
