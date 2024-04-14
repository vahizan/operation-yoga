import { NextApiRequest, NextApiResponse } from "next";
import createMongoConnection from "../../../../connector/createMongoConnection";
import { IPaginatedQuery } from "../../interfaces/IPaginatedQuery";
import { getInstructorLessons } from "../../../../helpers/admin/lessonsHelper";
import { ILesson } from "../../../../model/Lesson.model";
import { useUser } from "@auth0/nextjs-auth0/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    { page: number; limit: number; data: ILesson[] } | { error: string }
  >
) {
  const { method, query } = req;
  const q = query as unknown as IPaginatedQuery;

  if (method !== "GET") {
    res.status(404).json({ error: "Method Invalid" });
    return;
  }
  const { user } = useUser();

  const mongoConnector = createMongoConnection();

  const connection = await mongoConnector.connect();

  if (!connection) {
    res.status(403).json({ error: "Unauthorized" });
  } else {
    const page = q.page || 1;
    const limit = q.limit || 10;

    getInstructorLessons(connection, page, limit, user?.id as string)
      .then((results) => res.status(200).json(results))
      .catch((err) => {
        res.status(500).json(err);
      })
      .finally(() => {
        mongoConnector.disconnect();
      });
  }
}
