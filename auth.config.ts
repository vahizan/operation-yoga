import Resend from "@auth/core/providers/resend";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { authorizeLogin } from "@/helpers/authenticationHelper";
import { JWT } from "@auth/core/jwt";

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
    session: ({ session, token }: { session: any; token: any }) => {
      return {
        expires: session?.expires,
        user: {
          ...token,
          image: session?.image,
        },
      };
    },
    jwt: ({
      token,
      user,
    }: {
      account: any;
      profile: any;
      user: any;
      token: JWT;
    }) => {
      if (user) {
        return {
          ...token,
          ...user,
        };
      }
      return token;
    },
  },
  debug: process.env.NODE_ENV === "development",
} as NextAuthConfig;
