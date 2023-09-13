import { Connection } from "mongoose";
import { ILesson } from "../../model/Lesson.model";
import { LESSON_TEMPLATE_MODEL_NAME } from "../../model/admin/LessonTemplate.model";

interface LessonTemplateResponse {
  data: ILesson;
}

export const getLessonTemplate = async (
  connection: Connection,
  adminId: string
): Promise<LessonTemplateResponse> => {
  if (!connection) {
    throw new Error("Connection Invalid");
  }

  try {
    const results = await connection
      .model(LESSON_TEMPLATE_MODEL_NAME)
      .findOne({ _id: adminId });

    return {
      data: results,
    };
  } catch (err) {
    const error = err as Error;
    throw new Error(error.message);
  }
};

export const createTemplate = (instructorId: string, lesson: ILesson) => {};

export const updateTemplate = (instructorId: string, lesson: ILesson) => {};
