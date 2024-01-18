import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

import createMongoConnection from "../../../../connector/createMongoConnection";
import { getInstructors } from "../../../../helpers/admin/instructors";
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

  const mongoConnector = createMongoConnection();

  const connection = await mongoConnector.connect();

  const session = await getServerSession(req, res, authOptions);

  if (!session || !connection) {
    res.status(403).json({ error: "Unauthorized" });
    return;
  }

  const getUserResponse: IUserReadOnly = await getUserById(
    (session.user as any)?.id,
    connection
  );

  if (getUserResponse.type !== UserType.ADMIN) {
    res.status(403).json({ error: `Not Admin` });
    return;
  }

  getInstructors(connection)
    .then((results) => {
      const data = results.data;
      data.map((item) => ({
        name: item.name,
        type: item.type,
        id: item._id,
      }));

      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    })
    .finally(() => {
      connection.close();
      res.end();
    });
}
