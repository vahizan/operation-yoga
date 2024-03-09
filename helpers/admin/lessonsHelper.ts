import { Connection } from "mongoose";
import { ILesson, LESSON_MODEL_NAME } from "../../model/Lesson.model";
import LessonAggregate from "../../model/Lesson.aggregate";

interface LessonResponse {
  data: ILesson[];
  page: number;
  limit: number;
}

export const getAdminLessons = async (
  connection: Connection,
  page: number,
  limit: number,
  adminId: string
): Promise<LessonResponse> => {
  const offset = (page - 1) * limit;

  if (!connection) {
    throw new Error("Connection Invalid");
  }

  try {
    const results = await connection
      .model(LESSON_MODEL_NAME)
      .aggregate(LessonAggregate(adminId))
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

export const createLesson = async (
  connection: Connection,
  userId: string,
  instructorId: string,
  lesson: ILesson
) => {
  if (!userId) {
    throw new Error("Invalid Admin");
  }
  try {
    return await connection.model(LESSON_MODEL_NAME).create(lesson);
  } catch (err) {
    const error = err as Error;
    throw new Error(error.message);
  }
};

export const updateLesson = (
  connection: Connection,
  instructorId: string,
  lessonId: string,
  lesson: ILesson
) => {};
