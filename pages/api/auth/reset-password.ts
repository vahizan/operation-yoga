import { NextApiRequest, NextApiResponse } from "next";
import { JwtPayload } from "jsonwebtoken";
import { getTokenPayload } from "../../../helpers/authenticationHelper";
import { hashPassword } from "../../../helpers/loginHelper";
import PrismaClient from "../../../connector/Prisma/prismaClient";
import { ProviderType } from "../../../enum/ProviderType";
import { ProviderAccountId } from "../../../enum/ProviderAccountId";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string; data?: any }>
) {
  try {
    // Check if the request method is POST
    if (req.method !== "POST") {
      return res.status(404).json({ message: "Method Invalid" });
    }

    if (!req.body || !req.body.password || !req.body.verifyToken) {
      return res.status(404).json({ message: "Invalid Body" });
    }

    const { password, verifyToken } = req.body;

    // Create a MongoDB connection
    const connection = PrismaClient;

    // Check if the connection is successful
    if (!connection) {
      return res.status(500).json({ message: "connection error" });
    }

    // Get the token payload from the 'verifyToken' using the 'getTokenPayload' function
    const tokenPayload = getTokenPayload(
      verifyToken,
      process.env.PROVIDER_EMAIL_VERIFICATION_SECRET
    ) as JwtPayload;

    // Check if the token payload exists
    if (!tokenPayload) {
      return res
        .status(500)
        .json({ message: "This link has expired, please try again later" });
    }

    // Get the expiration date of the token
    const expirationDate = new Date((tokenPayload?.exp || 0) * 1000);

    // Check if the token has expired
    const currentDate = new Date(Date.now());
    if (expirationDate <= currentDate) {
      return res.status(403).json({ message: "This link has expired" });
    }

    // Find the user in the database using the 'USER_MODEL_NAME' and 'tokenPayload.id'
    const user = await connection.user.findUnique({
      where: {
        id: tokenPayload?.id,
      },
    });

    const verificationToken =
      await connection.verificationToken.findFirstOrThrow({
        where: {
          userId: user?.id || "",
          expires: {
            gte: currentDate,
          },
        },
        orderBy: { expires: "desc" },
      });

    if (!user) {
      return res.status(403).json({ message: "user doesn't exist" });
    }

    if (verifyToken !== verificationToken?.token) {
      return res
        .status(403)
        .json({ message: "Link expired", data: tokenPayload });
    }
    const passwordHash = await hashPassword(password);

    if (!passwordHash) {
      return res.status(403).json({ message: "Password couldn't be changed" });
    }

    await connection.account.update({
      where: {
        userId: user?.id,
        provider_providerAccountId: {
          provider: ProviderType.CREDENTIALS,
          providerAccountId: ProviderAccountId.CREDENTIALS,
        },
      },
      data: {
        passwordHash,
      },
    });

    await connection.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: ProviderType.CREDENTIALS,
          token: verificationToken?.token,
        },
        userId: user?.id || "",
      },
    });

    return res
      .status(200)
      .json({ message: "Password has been successfully reset" });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
}
