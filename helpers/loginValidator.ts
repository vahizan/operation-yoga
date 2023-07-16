import MongooseDatabaseConnection from "../connector/MongoDatabaseConnection";
import { USER_MODEL_NAME } from "../model/User.model";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { comparePassword } from "./loginHelper";

export const authorizeLogin = async (
  credentials: Record<string, string> | undefined
) => {
  {
    if (!credentials?.email || !credentials.password) {
      return null;
    }

    const mongoConnector = new MongooseDatabaseConnection(
      process.env.MONGODB_URI || "",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: process.env.MONGO_DB_NAME,
      }
    );

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

    const isValidPassword = await comparePassword(
      credentials.password,
      user.password
    );

    if (!isValidPassword) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }
};

export const hasSession = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  return !!session;
};
