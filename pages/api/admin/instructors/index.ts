import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

import createMongoConnection from "../../../../connector/createMongoConnection";
import {
  getInstructors,
  InstructorsResponse,
} from "../../../../helpers/admin/instructors";
import { IUser, IUserReadOnly } from "../../../../model/User.model";
import { authOptions } from "../../auth/[...nextauth]";
import { UserType } from "../../../../enum/UserType";
import { getUserById } from "../../../../helpers/admin/getUserById";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IUserReadOnly[] | { error: string }>
) {
  const { method } = req;

  if (method !== "GET") {
    res.status(404).json({ error: "Method Invalid" });
    return;
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  const mongoConnector = createMongoConnection();

  const connection = await mongoConnector.connect();

  if (!connection) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  const user: IUserReadOnly | undefined = await getUserById(
    (session.user as any)?.id,
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
