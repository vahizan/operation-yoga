import Resend from "@auth/core/providers/resend";
import Credentials from "next-auth/providers/credentials";
import { authorizeLogin } from "./helpers/authenticationHelper";
import type { NextAuthConfig } from "next-auth";

export default {
  providers: [
    Credentials({
      name: "UserAndPassword",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        return await authorizeLogin(credentials);
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
} as NextAuthConfig;
