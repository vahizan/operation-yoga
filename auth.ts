import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import PrismaClient from "./connector/Prisma/prismaClient";

const prisma = PrismaClient;

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          email: user.email,
        };
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/signOut",
    verifyRequest: "/verify-request",
    newUser: "/new-user",
  },
});
