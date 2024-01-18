import { Connection } from "mongoose";
import { IUserReadOnly, USER_MODEL_NAME } from "../../model/User.model";
import { UserType } from "../../enum/UserType";

export const getUserById = async (
  id: string,
  connection: Connection
): Promise<IUserReadOnly> => {
  if (!connection) {
    throw new Error("Connection Invalid");
  }

  try {
    return (await connection
      .model(USER_MODEL_NAME)
      .findById(id)
      .select([
        "name",
        "email",
        "_id",
        "type",
        "phone",
        "createdAt",
        "isVerified",
      ])) as IUserReadOnly;
  } catch (err) {
    const error = err as Error;
    throw new Error(error.message);
  }
};
