import Resend from "@auth/core/providers/resend";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import axios from "axios";
import { authorizeLogin } from "@/helpers/authenticationHelper";

async function login(credentials: any) {
  try {
    return await axios.post("/api/auth/login", credentials).then((res: any) => {
      const { user } = res;
      return {
        name: user.name,
        email: user.email,
        image: user.profile_photo,
        accessToken: res.access_token,
      };
    });
  } catch (e) {
    throw new Error("Something went wrong.");
  }
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
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user = token.user;
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
} as NextAuthConfig;
