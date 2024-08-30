import { NextApiRequest, NextApiResponse } from "next";
import { getInstructors } from "../../../../helpers/admin/getInstructors";
import { UserType } from "../../../../enum/UserType";
import PrismaClient from "../../../../connector/Prisma/prismaClient";
import { auth } from "../../../../auth";
import { Instructor } from "../../../../types/Instructor";
import { User } from "../../../../types/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any | { error: string }>
) {
  const { method } = req;
  const session = await auth(req, res);

  if (method !== "GET") {
    res.status(404).json({ error: "Method Invalid" });
    return;
  }

  if (!session) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  const mongoClient = PrismaClient;

  if (!mongoClient) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  if (!session?.user?.id) {
    res.status(404).json({ error: `Not Found` });
  }

  const user = session.user as User;
  if (user && user?.userType !== UserType.ADMIN) {
    res.status(403).json({ error: `Not Admin` });
  }

  let instructors: any | undefined;

  try {
    instructors = await getInstructors();
    const users = instructors.data.map(
      (item: { name: string; type: string; _id: string }) =>
        ({
          name: item.name,
          type: item.type,
          id: item._id,
        } as Instructor)
    );

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: (err as unknown as Error).message });
  }
  res.json({ error: "Not implemented" });
}
