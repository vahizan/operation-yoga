import { NextApiRequest, NextApiResponse } from "next";
import {
  ILessonTemplate,
  LESSON_TEMPLATE_MODEL_NAME,
} from "../../../../model/admin/LessonTemplate.model";
import createMongoConnection from "../../../../connector/createMongoConnection";
import { getUserById } from "../../../../helpers/admin/getUserById";
import { getUser } from "../../../../helpers/admin/getUser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | { error: string }>
) {
  let { method, query, body } = req;
  const reqBody: ILessonTemplate = body;
  const q = query as unknown as { userId: string };

  if (method !== "POST") {
    res.status(404).json({ error: "Method Invalid" });
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
    console.warn("Unauthorized");

    res.status(403).json({ error: "Unauthorized" });
    return;
  }

  const lessonTemplates = connection.model(LESSON_TEMPLATE_MODEL_NAME);

  try {
    const results = await lessonTemplates.create(reqBody);
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await mongoConnector.disconnect();
  }
}
