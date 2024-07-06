import { UserType } from "../../enum/UserType";
import PrismaClient from "../../connector/Prisma/prismaClient";

export const getInstructors = async (): Promise<any | undefined> => {
  const mongoPrismaClient = PrismaClient;
  if (!mongoPrismaClient) {
    throw new Error("Connection Invalid");
  }

  try {
    const results = await mongoPrismaClient.user.findMany({
      where: { type: UserType.ADMIN },
    });

    return {
      data: results,
    };
  } catch (err) {
    const error = err as Error;
    throw new Error(error.message);
  }
};
