import NextAuth, { DefaultSession } from "next-auth";
import { UserType } from "../enum/UserType";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      userType: UserType;
      id: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    userType: UserType;
    id: string;
  }
}
