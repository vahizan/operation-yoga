import { NextApiRequest, NextApiResponse } from "next";
import {
  ILessonTemplate,
  LESSON_TEMPLATE_MODEL_NAME,
} from "../../../../../model/admin/LessonTemplate.model";
import createMongoConnection from "../../../../../connector/createMongoConnection";

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

  const connection = await mongoConnector.connect();

  if (!connection) {
    console.warn("Unauthorized");

    res.status(403).json({ error: "Unauthorized" });
  } else {
    const lessonTemplates = connection.model(LESSON_TEMPLATE_MODEL_NAME);

    //create lesson template
    lessonTemplates
      .create(reqBody)
      .then((results) => {
        res.status(200).json(results);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      })
      .finally(() => {
        mongoConnector.disconnect();
      });
  }
}
