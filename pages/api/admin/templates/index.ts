import { NextApiRequest, NextApiResponse } from "next";
import { getLessonTemplatesById } from "../../../../helpers/admin/templatesHelper";
import AdminLessonQuery from "../../interfaces/AdminLessonQuery";
import PrismaClient from "../../../../connector/Prisma/prismaClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any[] | { error: string }>
) {
  const { method, query } = req;
  const q = query as unknown as AdminLessonQuery;

  if (method !== "GET") {
    res.status(404).json({ error: "Method Invalid" });
    return;
  }

  if (!q?.userId) {
    res.status(400).json({ error: "User ID is required" });
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
      id: q?.id,
      instructorId: q?.userId,
    });
    res.status(200).json(lessonTemplates);
  } catch (err) {
    const error = err as Error;
    console.error(error.message);
    res.status(500).json({ error: "An error occurred. Please try again." });
  }
}
