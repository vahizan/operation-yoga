import { USER_MODEL_NAME } from "../model/User.model";
import { NextApiRequest, NextApiResponse } from "next";
import { comparePassword } from "./loginHelper";
import createMongoConnection from "../connector/createMongoConnection";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authorizeLogin = async (
  credentials: Partial<Record<"email" | "password", unknown>>
) => {
  {
    if (!credentials?.email || !credentials.password) {
      return null;
    }

    const mongoConnector = createMongoConnection();

    const connection = await mongoConnector.connect();
    if (!connection) {
      return null;
    }
    const user = await connection.model(USER_MODEL_NAME).findOne({
      email: credentials.email,
    });

    if (!user) {
      return null;
    }

    // const isValidPassword = await comparePassword(
    //   credentials.password,
    //   user.password
    // );

    // if (!isValidPassword) {
    //   return null;
    // }

    return {
      id: user._id,
      email: user.email,
      name: user.name,
      userType: user.type,
    };
  }
};

export const getTokenPayload = (
  verificationToken: string,
  secret?: string
): JwtPayload | string | undefined => {
  if (!secret) {
    return undefined;
  }
  return jwt.verify(verificationToken, secret);
};
