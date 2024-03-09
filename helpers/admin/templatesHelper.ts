import { Connection } from "mongoose";
import {
  ILessonTemplate,
  ILessonTemplateWithId,
  LESSON_TEMPLATE_MODEL_NAME,
} from "../../model/admin/LessonTemplate.model";

export interface TemplateFilters {
  instructorId?: string;
  createdBy?: string;
  _id?: string;
}

export const getLessonTemplatesById = async (
  connection: Connection,
  limit: number,
  page: number,
  filters: TemplateFilters
): Promise<ILessonTemplateWithId[]> => {
  validateConnection(connection);

  const cleanedFilters: Record<string, any> = {};
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      cleanedFilters[key] = value;
    }
  });

  try {
    return (await connection
      .model(LESSON_TEMPLATE_MODEL_NAME)
      .find(cleanedFilters)
      .limit(limit)
      .skip(limit * (page - 1))) as ILessonTemplateWithId[];
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
): Promise<ILessonTemplateWithId> => {
  validateConnection(connection);

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

export const deleteTemplate = async (
  connection: Connection,
  userId: string,
  templateId: string
) => {
  validateConnection(connection);

  try {
    return await connection.model(LESSON_TEMPLATE_MODEL_NAME).deleteOne({
      _id: templateId,
      createdBy: userId,
    });
  } catch (err) {
    const error = err as Error;
    throw new Error(error.message);
  }
};

export const validateConnection = (connection: Connection) => {
  if (!connection) {
    throw new Error("Connection Invalid");
  }
};
