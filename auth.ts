import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import PrismaClient from "./connector/Prisma/prismaClient";

const prisma = PrismaClient;

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/login",
    signOut: "/signOut",
    verifyRequest: "/verify-request",
    newUser: "/new-user",
  },
});
