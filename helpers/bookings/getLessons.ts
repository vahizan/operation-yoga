import { Connection } from "mongoose";
import { ILesson, LESSON_MODEL_NAME } from "../../model/Lesson.model";

interface LessonResponse {
  data: ILesson[];
  page: number;
  limit: number;
}

export const getBookings = async (
  connection: Connection,
  page: number,
  limit: number,
  userId: number
): Promise<LessonResponse> => {
  const offset = (page - 1) * limit;

  if (!connection) {
    throw new Error("Connection Invalid");
  }

  try {
    const results = await connection
      .model(LESSON_MODEL_NAME)
      .find({ _id: userId })
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
