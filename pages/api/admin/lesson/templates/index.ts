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

  if (!q.userId) {
    res.status(403).json({ error: "Unauthorized" });
    return;
  }

  if (!q.page || !q.limit) {
    res.status(400);
    return;
  }

  const mongoConnector = createMongoConnection();

  let connection = undefined;

  try {
    connection = await mongoConnector.connect();
  } catch (error) {
    res.status(500).json({ error: "DB connection error" });
    await mongoConnector.disconnect();
    return;
  }

  if (!connection) {
    res.status(403).json({ error: "Unauthorized" });
    return;
  }
  const page = q.page || 1;
  const limit = q.limit || 10;

  try {
    const lessonTemplates = await getLessonTemplatesByCreatedUserId(
      connection,
      page,
      limit,
      q.userId
    );
    res.status(200).json(lessonTemplates);
  } catch (err) {
    const error = err as Error;
    console.error(error.message);
    res.status(500).json({ error: "An error occurred. Please try again." });
  } finally {
    await mongoConnector.disconnect();
  }
}
