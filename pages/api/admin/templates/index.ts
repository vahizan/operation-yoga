import { NextApiRequest, NextApiResponse } from "next";
import { getLessonTemplatesById } from "../../../../helpers/admin/templatesHelper";
import GetTemplatesQuery from "../../interfaces/GetTemplatesQuery";
import PrismaClient from "../../../../connector/Prisma/prismaClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any[] | { error: string }>
) {
  const { method, query } = req;
  console.log("query", query);
  const q = query as unknown as GetTemplatesQuery;

  if (method !== "GET") {
    res.status(404).json({ error: "Method Invalid" });
    return;
  }

  if (!q?.userId && !q?.templateId && !q?.createdById) {
    res.status(400);
    return;
  }

  if (!q.page || !q.limit) {
    res.status(400);
    return;
  }

  const connection = PrismaClient;

  if (!connection) {
    res.status(403).json({ error: "Unauthorized" });
    return;
  }
  const page = q?.page || 1;
  const limit = q?.limit || 10;
  try {
    const lessonTemplates = await getLessonTemplatesById(page, limit, {
      createdBy: q?.userId,
      _id: q?.templateId,
      instructorId: q?.templateId,
    });
    res.status(200).json(lessonTemplates);
  } catch (err) {
    const error = err as Error;
    console.error(error.message);
    res.status(500).json({ error: "An error occurred. Please try again." });
  }
}
