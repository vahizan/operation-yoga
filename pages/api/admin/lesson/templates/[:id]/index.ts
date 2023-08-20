import { NextApiRequest, NextApiResponse } from "next";
import createMongoConnection from "../../../../../../connector/createMongoConnection";

import { LessonAggregate } from "../../../../../../model/Lesson.aggregate";
import { LESSON_MODEL_NAME } from "../../../../../../model/Lesson.model";
import { ILessonTemplate } from "../../../../../../model/admin/LessonTemplate.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ILessonTemplate[] | { error: string }>
) {
  let { method, query } = req;
  const q = query as unknown as { userId: string };

  if (method !== "GET") {
    res.status(404).json({ error: "Method Invalid" });
    return;
  }

  const mongoConnector = createMongoConnection();

  const connection = await mongoConnector.connect();

  if (!connection) {
    res.status(403).json({ error: "Unauthorized" });
  } else {
    const lessonTemplates = connection.model(LESSON_MODEL_NAME);
    lessonTemplates
      .aggregate(LessonAggregate(q.userId))
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
