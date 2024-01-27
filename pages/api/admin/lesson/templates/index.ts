import { NextApiRequest, NextApiResponse } from "next";
import createMongoConnection from "../../../../../connector/createMongoConnection";
import { IPaginatedQuery } from "../../../interfaces/IPaginatedQuery";
import { ILessonTemplate } from "../../../../../model/admin/LessonTemplate.model";
import { getLessonTemplatesByCreatedUserId } from "../../../../../helpers/admin/templates";

interface RequestQuery extends IPaginatedQuery {
  userId: string;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ILessonTemplate[] | { error: string }>
) {
  const { method, query } = req;
  const q = query as unknown as RequestQuery;

  if (method !== "GET") {
    res.status(404).json({ error: "Method Invalid" });
    return;
  }

  const mongoConnector = createMongoConnection();

  const connection = await mongoConnector.connect();

  if (!connection) {
    res.status(403).json({ error: "Unauthorized" });
  } else {
    const page = q.page || 1;
    const limit = q.limit || 10;

    getLessonTemplatesByCreatedUserId(connection, page, limit, q.userId)
      .then((results) => res.status(200).json(results))
      .catch((err) => {
        res.status(500).json(err);
      })
      .finally(() => {
        mongoConnector.disconnect();
      });
  }
}
