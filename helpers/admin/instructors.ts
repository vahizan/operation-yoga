import { Connection } from "mongoose";
import { IUserReadOnly, USER_MODEL_NAME } from "../../model/User.model";
import { UserType } from "../../enum/UserType";

export interface InstructorsResponse {
  data: IUserReadOnly[];
}

export const getInstructors = async (
  connection: Connection
): Promise<InstructorsResponse> => {
  if (!connection) {
    throw new Error("Connection Invalid");
  }

  try {
    const results = await connection
      .model(USER_MODEL_NAME)
      .find({ type: UserType.ADMIN })
      .select(["name", "email", "_id"]);

    return {
      data: results,
    };
  } catch (err) {
    const error = err as Error;
    throw new Error(error.message);
  }
};
