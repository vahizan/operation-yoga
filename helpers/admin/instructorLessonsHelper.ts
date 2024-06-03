import PrismaClient from "../../connector/Prisma/prismaClient";

export const getInstructorLessons = async (
  page: number,
  limit: number,
  instructorId: string
): Promise<{ page: number; limit: number; data: any }> => {
  const offset = (page - 1) * limit;
  const mongoPrismaClient = PrismaClient;

  if (!mongoPrismaClient) {
    throw new Error("Connection Invalid");
  }

  try {
    const instructorBookings = await mongoPrismaClient.lesson.findMany({
      skip: offset,
      take: limit,
      where: {
        instructorId,
      },
    });

    return {
      page,
      limit,
      data: instructorBookings,
    };
  } catch (err) {
    const error = err as Error;
    throw new Error(error.message);
  }
};
