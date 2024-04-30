import { getAccessToken } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

interface UserMetadata {
  role: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserMetadata | { error: string }>
) {
  const { method, query } = req;

  if (method !== "GET") {
    res.status(404).json({ error: "Method Invalid" });
    return;
  }

  try {
    const { accessToken } = await getAccessToken(req, res);
    const options = {
      method: "GET",
      url: `${process.env.AUTH0_MANAGEMENT_URL}roles/${query?.id}`,
      headers: { authorization: `Bearer ${accessToken}` },
    };

    const response = await axios(options);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).end();
  }
}
