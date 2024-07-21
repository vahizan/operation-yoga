import { NextApiRequest, NextApiResponse } from "next";
import { hashPassword } from "../../../helpers/loginHelper";
import { UserType } from "../../../enum/UserType";
import { CUSTOMER_SCOPE } from "./scopes";
import { ProviderType } from "../../../enum/ProviderType";
import PrismaClient from "../../../connector/Prisma/prismaClient";
import { ProviderAccountId } from "../../../enum/ProviderAccountId";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  if (req.method !== "POST") {
    return res.status(404).json({ message: "Method Invalid" });
  }

  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      res.status(400).json({ message: "Please fill in all required fields." });
      return;
    }

    const mongoPrisma = PrismaClient;

    if (!mongoPrisma) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const existingUser = await mongoPrisma.user.findFirst({ where: { email } });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "A user with this email already exists." });
    }

    const hashedPass = await hashPassword(password);

    const userProps = { name, email };
    const newUser = req.body?.phone
      ? { ...userProps, phone: req.body.phone }
      : userProps;

    const user = await mongoPrisma.user.create({
      data: { ...newUser, type: UserType.CUSTOMER },
    });

    await mongoPrisma.account.create({
      data: {
        userId: user.id,
        type: UserType.CUSTOMER,
        provider: ProviderType.CREDENTIALS,
        providerAccountId: ProviderAccountId.CREDENTIALS,
        passwordHash: hashedPass,
        scope: CUSTOMER_SCOPE,
      },
    });

    return res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    const err = error as Error;
    console.error(err.message);
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
}
