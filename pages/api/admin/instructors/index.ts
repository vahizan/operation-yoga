import { NextApiRequest, NextApiResponse } from "next";
import createMongoConnection from "../../../../connector/createMongoConnection";
import { getInstructors } from "../../../../helpers/admin/instructors";
import { IUserReadOnly } from "../../../../model/User.model";

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

  if (!connection) {
    res.status(403).json({ error: "Unauthorized" });
  } else {
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
}
