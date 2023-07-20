import { NextApiRequest, NextApiResponse } from "next";
import { ILessonQuery, IPackage } from "../interfaces";
import MongooseDatabaseConnection from "../../../connector/MongoDatabaseConnection";
import { SESSIONS } from "../../../model/Session.model";
import { lessonSession } from "../../../model/LessonSession.aggregate";
import createMongoConnection from "../../../connector/createMongoConnection";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IPackage[] | { error: string }>
) {
  const { query, method } = req;
  const q = query as unknown as ILessonQuery;

  if (method !== "GET") {
    res.status(404).json({ error: "Method Invalid" });
    return;
  }

  const mongoConnector = createMongoConnection();

  const connection = await mongoConnector.connect();

  if (!connection) {
    res.status(403).json({ error: "Unauthorized" });
  } else {
    const sessions = connection.model(SESSIONS);
    sessions
      .aggregate(lessonSession(q.dayOfTheWeek))
      .then((results) => {
        res.status(200).json(results);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
      })
      .finally(() => {
        mongoConnector.disconnect();
      });
  }
}
