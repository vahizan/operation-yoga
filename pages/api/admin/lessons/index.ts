import { NextApiRequest, NextApiResponse } from "next";
import { IPaginatedQuery } from "../../interfaces/IPaginatedQuery";
import { getInstructorLessons } from "../../../../helpers/admin/instructorLessonsHelper";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    { page: number; limit: number; data: any[] } | { error: string }
  >
) {
  const { method, query } = req;
  const q = query as unknown as IPaginatedQuery;

  if (method !== "GET") {
    res.status(404).json({ error: "Method Invalid" });
    return;
  }

  const page = q.page || 1;
  const limit = q.limit || 10;

  try {
    const result = await getInstructorLessons(page, limit, query?.id as string);
    res.status(200).json(result);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
}
