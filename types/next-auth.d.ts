import { DefaultSession } from "types/next-auth";
import { UserType } from "../enum/UserType";

declare module "types/next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  // Extend session to hold the access_token
  interface Session {
    user: {
      userType: UserType;
      scope?: string;
      id: string;
    } & DefaultSession["user"];
  }

  // Extend token to hold the access_token before it gets put into session
  interface JWT {
    userType: UserType;
    scope: string;
    id: string;
  }
}
