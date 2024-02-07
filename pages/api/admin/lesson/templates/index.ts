import { NextApiRequest, NextApiResponse } from "next";
import createMongoConnection from "../../../../../connector/createMongoConnection";
import { IPaginatedQuery } from "../../../interfaces/IPaginatedQuery";
import { ILessonTemplateWithId } from "../../../../../model/admin/LessonTemplate.model";
import { getLessonTemplatesById } from "../../../../../helpers/admin/templates";
import GetTemplatesQuery from "../../../interfaces/GetTemplatesQuery";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ILessonTemplateWithId[] | { error: string }>
) {
  const { method, query } = req;
  const q = query as unknown as GetTemplatesQuery;

  if (method !== "GET") {
    res.status(404).json({ error: "Method Invalid" });
    return;
  }

  if (!q.userId && !q?.templateId && !q?.createdById) {
    res.status(400);
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
    const lessonTemplates = await getLessonTemplatesById(
      connection,
      page,
      limit,
      { createdBy: q?.userId, _id: q?.templateId, instructorId: q?.templateId }
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
