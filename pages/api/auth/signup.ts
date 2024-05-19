import { NextApiRequest, NextApiResponse } from "next";
import { hashPassword } from "../../../helpers/loginHelper";
import prismaClient from "../../../connector/Prisma/prismaClient";
import { UserType } from "../../../enum/UserType";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      res.status(400).json({ message: "Please fill in all required fields." });
      return;
    }

    const mongoPrisma = prismaClient;

    if (!mongoPrisma) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const existingUser = await mongoPrisma.user.findFirst({ where: email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "A user with this email already exists." });
    }
    const hashedPass = await hashPassword(password, 12);
    if (!hashedPass) {
      res.status(500).json({ message: "An error occurred. Please try again." });
    }

    const userProps = { name, email, password: hashedPass };
    const newUser = req.body?.phone
      ? { ...userProps, phone: req.body.phone }
      : userProps;

    await mongoPrisma.user.create({
      data: { ...newUser, type: UserType.CUSTOMER },
    });

    return res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    res.status(500).json({ message: "An error occurred. Please try again." });
  }
}
