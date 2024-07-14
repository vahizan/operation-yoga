import Resend from "@auth/core/providers/resend";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import axios from "axios";
import { authorizeLogin } from "@/helpers/authenticationHelper";
import { UserType } from "./enum/UserType";
import { JWT } from "@auth/core/jwt";

interface User {
  scope: string;
  userType: UserType;
  name: string;
  id: string;
  email: string;
}

export default {
  providers: [
    Credentials({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          return authorizeLogin(credentials);
        } catch (err) {
          return {};
        }
      },
    }),
    Resend({
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
  session: {
    strategy: "jwt",
    maxAge: 432000, // 5 days
  },
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          userType: token.userType,
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
          userType: u?.userType,
        };
      }
      return token;
    },
  },
  debug: process.env.NODE_ENV === "development",
} as NextAuthConfig;
