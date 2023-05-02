import { Connection } from "mongoose";

declare global {
  var mongo: Connection | undefined;
}

export {};
