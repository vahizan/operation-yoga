import { Connection } from "mongoose";
import { IUser, IUserReadOnly, USER_MODEL_NAME } from "../../model/User.model";

export const getUser = async (
  id: string,
  connection: Connection
): Promise<IUser | undefined> => {
  if (!connection) {
    throw new Error("Connection Invalid");
  }

  try {
    return (await connection.model(USER_MODEL_NAME).findById(id)) as IUser;
  } catch (err) {
    return undefined;
  }
};
