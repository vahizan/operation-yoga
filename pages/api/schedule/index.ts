import { NextApiRequest, NextApiResponse } from "next";
import { PACKAGE } from "../../../model/Package.model";
import { IPackage } from "../interfaces";
import MongooseDatabaseConnection from "../../../connector/MongoDatabaseConnection";
import createMongoConnection from "../../../connector/createMongoConnection";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IPackage[] | { error: string }>
) {
  const { query, method } = req;

  if (method !== "GET") {
    res.status(404).json({ error: "Method Invalid" });
    return;
  }

  const mongoConnector = createMongoConnection();

  const connection = await mongoConnector.connect();

  if (!connection) {
    res.status(403).json({ error: "Unauthorized" });
  } else {
    const packages = connection.model(PACKAGE);

    packages
      .find({})
      .then((results) => {
        res.status(200).json(results);
      })
      .catch((err) => {
        res.status(500).json({ error: "Internal server error" });
      })
      .finally(() => {
        mongoConnector.disconnect();
      });
  }
}
