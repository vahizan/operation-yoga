import { ISODateString } from "next-auth/src/core/types";
import { DefaultSession } from "next-auth";

export type SessionWithId = {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id?: string | null;
  };
  expires: ISODateString;
} & DefaultSession;
