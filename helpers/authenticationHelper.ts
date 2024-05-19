import { comparePassword } from "./loginHelper";
import jwt, { JwtPayload } from "jsonwebtoken";
import PrismaClient from "../connector/Prisma/prismaClient";

export const authorizeLogin = async (
  credentials: Partial<Record<"email" | "password", unknown>>
) => {
  return {};
  // {
  //   if (!credentials?.email || !credentials.password) {
  //     return null;
  //   }
  //
  //   const mongoConnector = PrismaClient;
  //
  //   if (!mongoConnector) {
  //     return null;
  //   }
  //   const user = await mongoConnector.user.findUnique({
  //     where: {
  //       email: credentials?.email,
  //     },
  //   });
  //
  //   if (!user) {
  //     return null;
  //   }
  //
  //   const isValidPassword = await comparePassword(
  //     credentials?.password as string,
  //     user?.password
  //   );
  //
  //   if (!isValidPassword) {
  //     return null;
  //   }
  //
  //   return {
  //     id: user._id,
  //     email: user.email,
  //     name: user.name,
  //     userType: user.type,
  //   };
  // }
};

export const getTokenPayload = (
  verificationToken: string,
  secret?: string
): JwtPayload | string | undefined => {
  if (!secret) {
    return undefined;
  }
  return jwt.verify(verificationToken, secret);
};
