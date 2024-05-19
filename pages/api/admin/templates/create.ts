import { NextApiRequest, NextApiResponse } from "next";
import PrismaClient from "../../../../connector/Prisma/prismaClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any | { error: string }>
) {
  let { method, body } = req;
  const reqBody = body;

  if (method !== "POST") {
    res.status(404).json({ error: "Method Invalid" });
    return;
  }

  const mongoPrismaClient = PrismaClient;

  if (!mongoPrismaClient) {
    res.status(500).json({ error: "connection error" });
    return;
  }

  try {
    const results = await mongoPrismaClient.adminLesson.create(reqBody);
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
