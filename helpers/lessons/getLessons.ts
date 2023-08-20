import { Connection } from "mongoose";
import { ILesson, LESSON_MODEL_NAME } from "../../model/Lesson.model";

interface LessonResponse {
  data: ILesson[];
  page: number;
  limit: number;
}

export const getLessons = async (
  connection: Connection,
  page: number,
  limit: number
): Promise<LessonResponse> => {
  const offset = (page - 1) * limit;

  if (!connection) {
    throw new Error("Connection Invalid");
  }

  try {
    const results = await connection
      .model(LESSON_MODEL_NAME)
      .find({})
      .skip(offset)
      .limit(limit);

    return {
      page,
      limit,
      data: results,
    };
  } catch (err) {
    const error = err as Error;
    throw new Error(error.message);
  }
};
