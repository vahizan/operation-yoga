import { Connection } from "mongoose";
import {
  ILessonTemplate,
  ILessonTemplateWithId,
  LESSON_TEMPLATE_MODEL_NAME,
} from "../../model/admin/LessonTemplate.model";

interface LessonTemplateResponse {
  data: ILessonTemplateWithId[];
  page: number;
  limit: number;
}

export const getLessonTemplatesByCreatedUserId = async (
  connection: Connection,
  limit: number,
  page: number,
  userId: string
): Promise<ILessonTemplateWithId[]> => {
  if (!connection) {
    throw new Error("Connection Invalid");
  }

  try {
    return (await connection
      .model(LESSON_TEMPLATE_MODEL_NAME)
      .find({ createdBy: userId })
      .limit(limit)
      .skip((page - 1) * limit)) as ILessonTemplateWithId[];
  } catch (err) {
    const error = err as Error;
    throw new Error(error.message);
  }
};

export const getLessonTemplatesByInstructorId = async (
  connection: Connection,
  userId: string
): Promise<ILessonTemplateWithId[]> => {
  if (!connection) {
    throw new Error("Connection Invalid");
  }

  try {
    return (await connection
      .model(LESSON_TEMPLATE_MODEL_NAME)
      .find({ createdBy: userId })) as ILessonTemplateWithId[];
  } catch (err) {
    const error = err as Error;
    throw new Error(error.message);
  }
};

export const getLessonTemplateById = async (
  connection: Connection,
  templateId: string
): Promise<ILessonTemplateWithId> => {
  if (!connection) {
    throw new Error("Connection Invalid");
  }

  try {
    return (await connection
      .model(LESSON_TEMPLATE_MODEL_NAME)
      .findOne({ _id: templateId })) as ILessonTemplateWithId;
  } catch (err) {
    const error = err as Error;
    throw new Error(error.message);
  }
};

export const updateTemplate = async (
  connection: Connection,
  userId: string,
  templateId: string,
  updatedTemplate: ILessonTemplate
) => {
  if (!connection) {
    throw new Error("Connection Invalid");
  }

  try {
    return (await connection.model(LESSON_TEMPLATE_MODEL_NAME).findOneAndUpdate(
      {
        _id: templateId,
        createdBy: userId,
      },
      updatedTemplate
    )) as ILessonTemplateWithId;
  } catch (err) {
    const error = err as Error;
    throw new Error(error.message);
  }
};
