import PrismaClient from "../../connector/Prisma/prismaClient";

export interface TemplateFilters {
  instructorId?: string;
  lessonCreatorId?: string;
  id?: string;
}

export const getLessonTemplatesById = async (
  limit: number,
  page: number,
  filters: TemplateFilters
): Promise<any[]> => {
  const mongoClient = PrismaClient;
  const cleanedFilters: Record<string, any> = {};
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      cleanedFilters[key] = value;
    }
  });

  try {
    return await mongoClient.adminLesson.findMany({
      where: cleanedFilters,
      take: limit,
      skip: limit * (page - 1),
    });
  } catch (err) {
    const error = err as Error;
    throw new Error(error.message);
  }
};
