import { NextApiRequest, NextApiResponse } from "next";

import createMongoConnection from "../../../../connector/createMongoConnection";
import {
  getInstructors,
  InstructorsResponse,
} from "../../../../helpers/admin/instructors";
import { IUserReadOnly } from "../../../../model/User.model";
import { UserType } from "../../../../enum/UserType";
import { getUserById } from "../../../../helpers/admin/getUserById";
import { useUser } from "@auth0/nextjs-auth0/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IUserReadOnly[] | { error: string }>
) {
  const { method } = req;

  if (method !== "GET") {
    res.status(404).json({ error: "Method Invalid" });
    return;
  }

  const { user: userProfile, error } = await useUser();

  if (!userProfile || error) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  const mongoConnector = createMongoConnection();

  const connection = await mongoConnector.connect();

  if (!connection) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  const user: IUserReadOnly | undefined = await getUserById(
    userProfile?.user_id as string,
    connection
  );

  if (!user) {
    res.status(404).json({ error: `Not Found` });
  }

  if (user && user.type !== UserType.ADMIN) {
    res.status(403).json({ error: `Not Admin` });
  }

  let instructors: InstructorsResponse | undefined;

  try {
    instructors = await getInstructors(connection);
    const users: IUserReadOnly[] = instructors.data.map(
      (item) =>
        ({
          name: item.name,
          type: item.type,
          id: item._id,
        } as IUserReadOnly)
    );

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: (err as unknown as Error).message });
  } finally {
    await mongoConnector.disconnect();
  }
}
