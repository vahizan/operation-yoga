import { ManagementClient } from "auth0";
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { auth } from "../../../auth";

interface UserMetadata {
  role: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any | { error: string }>
) {
  const { method } = req;

  if (method !== "GET") {
    res.status(404).json({ error: "Method Invalid" });
    return;
  }
  try {
    const session = await auth();
    const management = new ManagementClient({
      domain: `${process.env.AUTH0_MANAGEMENT_HOST}`,
      clientId: `${process.env.AUTH0_CLIENT_ID}`,
      clientSecret: `${process.env.AUTH0_CLIENT_SECRET}`,
    });
    if (!session) {
      res.status(401).json("user required to sign in");
    }
    const role = await management.users.get({ id: session?.user?.id || "" });
    res.status(200).json(role);
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).end();
  }
}
