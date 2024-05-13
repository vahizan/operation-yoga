import NextAuth, { NextAuthOptions } from "next-auth";
import GitHub from "next-auth/providers/github";
import Facebook from "next-auth/providers/facebook";
import Google from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import Email from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "../../../connector/clientPromise";
import { authorizeLogin } from "../../../helpers/authenticationHelper";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
    signOut: "/signOut",
    verifyRequest: "/verify-request",
    newUser: "/new-user",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "Sign In",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        return await authorizeLogin(credentials);
      },
    }),
    Email({
      name: "forgot-password",
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
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
};

export default NextAuth(authOptions);
