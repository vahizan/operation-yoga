import { NextApiRequest, NextApiResponse } from "next";
import { getInstructors } from "../../../../helpers/admin/instructors";
import { UserType } from "../../../../enum/UserType";
import { getUserById } from "../../../../helpers/admin/getUserById";
import PrismaClient from "../../../../connector/Prisma/prismaClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any | { error: string }>
) {
  const { method, query } = req;

  if (method !== "GET") {
    res.status(404).json({ error: "Method Invalid" });
    return;
  }

  if (!query?.user_id) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  const mongoClient = PrismaClient;

  if (!mongoClient) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  const user = await getUserById(query?.user_id as string);

  if (!user) {
    res.status(404).json({ error: `Not Found` });
  }

  if (user && user.type !== UserType.ADMIN) {
    res.status(403).json({ error: `Not Admin` });
  }

  let instructors: any | undefined;

  try {
    instructors = await getInstructors();
    const users = instructors.data.map(
      (item: { name: any; type: any; _id: any }) => ({
        name: item.name,
        type: item.type,
        id: item._id,
      })
    );

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: (err as unknown as Error).message });
  }
}
