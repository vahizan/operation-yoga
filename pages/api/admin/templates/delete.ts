import { NextApiRequest, NextApiResponse } from "next";
import {
  getLessonTemplatesById,
  removeLessonTemplates,
} from "../../../../helpers/admin/templatesHelper";
import AdminLessonTemplateQuery from "../../interfaces/AdminLessonTemplateQuery";
import PrismaClient from "../../../../connector/Prisma/prismaClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | { error: string }>
) {
  const { method, query } = req;
  const q = query as unknown as AdminLessonTemplateQuery;

  if (method !== "GET") {
    res.status(404).json({ error: "Method Invalid" });
    return;
  }

  if (!q?.ids) {
    res.status(400).json({ error: "Template ids are required" });
    return;
  }

  const connection = PrismaClient;

  if (!connection) {
    res.status(403).json({ error: "Unauthorized" });
    return;
  }

  try {
    await removeLessonTemplates(!Array.isArray(q.ids) ? [q.ids] : q?.ids);
    res.status(200).json(`${q.ids.length} templates removed`);
  } catch (err) {
    const error = err as Error;
    console.error(error.message);
    res.status(500).json({ error: "An error occurred. Please try again." });
  }
}
