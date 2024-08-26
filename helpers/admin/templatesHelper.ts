import PrismaClient from "../../connector/Prisma/prismaClient";

export interface TemplateFilters {
  instructorId?: string;
  lessonCreatorId?: string;
  ids?: string | string[];
}

const cleanedFilters = (filters: TemplateFilters): Record<string, any> => {
  const cleanedFilters: Record<string, any> = {};
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      cleanedFilters[key] = value;
    }
  });
  return cleanedFilters;
};

export const getLessonTemplatesById = async (
  limit: number,
  page: number,
  filters: TemplateFilters
): Promise<any[]> => {
  const mongoClient = PrismaClient;

  try {
    return await mongoClient.adminLessonTemplate.findMany({
      where: cleanedFilters(filters),
      take: limit,
      skip: limit * (page - 1),
    });
  } catch (err) {
    const error = err as Error;
    throw new Error(error.message);
  }
};

export const removeLessonTemplates = async (
  templateIds: string[]
): Promise<any[] | void> => {
  const mongoClient = PrismaClient;
  try {
    await mongoClient.adminLessonTemplate.deleteMany({
      where: {
        id: {
          in: templateIds,
        },
      },
    });
  } catch (err) {
    const error = err as Error;
    throw new Error(error.message);
  }
};
