import { NextApiRequest, NextApiResponse } from "next";
import createMongoConnection from "../../../../../../connector/createMongoConnection";

import { LessonAggregate } from "../../../../../../model/Lesson.aggregate";
import { LESSON_MODEL_NAME } from "../../../../../../model/Lesson.model";
import { ILessonTemplate } from "../../../../../../model/admin/LessonTemplate.model";
import { getAdminLessons } from "../../../../../../helpers/admin/lessons";
import {
  getLessonTemplate,
  updateTemplate,
} from "../../../../../../helpers/admin/templates";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ILessonTemplate[] | { error: string }>
) {
  let { method, query } = req;
  const q = query as unknown as { userId: string };

  if (method === "POST") {
    res.status(404).json({ error: "Method Invalid" });
    return;
  }
  const mongoConnector = createMongoConnection();
  const connection = await mongoConnector.connect();
  if (!connection) {
    console.warn("Unauthorized");

    return res.status(403).json({ error: "Unauthorized" });
  }

  if (method === "GET") {
    await getLessonTemplate(connection, q.userId);
  }

  if (method === "PUT") {
    await updateTemplate(connection, q.lesson as ILesson);
  }
  //add functionality for PUT

  if (!connection) {
    console.warn("Unauthorized");

    res.status(403).json({ error: "Unauthorized" });
  } else {
    const lessonTemplates = connection.model(LESSON_MODEL_NAME);
    lessonTemplates
      .aggregate(LessonAggregate(q.userId))
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
