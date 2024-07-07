import { NextApiRequest, NextApiResponse } from "next";
import { authorizeLogin } from "@/helpers/authenticationHelper";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  if (req.method !== "POST") {
    return res.status(404).json({ message: "Method Invalid" });
  }

  try {
    const credentials = req.body;
    return await authorizeLogin(credentials);
  } catch (error) {
    const err = error as Error;
    console.error(err.message);
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
}
