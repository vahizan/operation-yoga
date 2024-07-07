import { comparePassword } from "./loginHelper";
import jwt, { JwtPayload } from "jsonwebtoken";
import PrismaClient from "../connector/Prisma/prismaClient";
import { ProviderType } from "../enum/ProviderType";

export const authorizeLogin = async (
  credentials: Partial<Record<"email" | "password", unknown>>
) => {
  {
    if (!credentials?.email || !credentials.password) {
      return null;
    }

    const mongoConnector = PrismaClient;

    if (!mongoConnector) {
      return null;
    }
    const user = await mongoConnector.user.findUnique({
      where: {
        email: credentials?.email as string,
      },
    });

    if (!user) {
      return null;
    }

    const account = await mongoConnector.account.findFirst({
      where: {
        userId: user?.id,
        provider: ProviderType.CREDENTIALS,
      },
    });

    if (!account) {
      return { data: "ACCOUNT NO" };
    }

    const isValidPassword = await comparePassword(
      credentials?.password as string,
      account.passwordHash || ""
    );

    if (!isValidPassword) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      userType: account.type,
      scope: account?.scope,
    };
  }
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
