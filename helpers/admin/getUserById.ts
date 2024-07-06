import PrismaClient from "../../connector/Prisma/prismaClient";

export const getUserById = async (id: string): Promise<any | undefined> => {
  const mongoPrisma = PrismaClient;
  if (!mongoPrisma) {
    throw new Error("Connection Invalid");
  }

  try {
    return mongoPrisma.user.findUnique({ where: { id } });
  } catch (err) {
    return undefined;
  }
};
