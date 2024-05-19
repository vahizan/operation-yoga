import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import AuthenticationStatusCode from "../../../helpers/AuthenticationStatusCode";
import { sendPasswordResetEmail } from "../../../helpers/passwordResetEmail";
import EnquireTemplate from "../enquire/email-templates/EnquireTemplate";
import PrismaClient from "../../../connector/Prisma/prismaClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  const { email } = req.body;
  try {
    const mongoPrismaClient = PrismaClient;

    if (!mongoPrismaClient) {
      return res.status(500).json({ message: "connection error" });
    }

    const user = await mongoPrismaClient.user.findUnique({ where: email });

    if (!user) {
      return res.status(404).json({ message: "user doesn't exist" });
    }

    const secret = process.env.PROVIDER_EMAIL_VERIFICATION_SECRET;
    if (!secret) {
      return res.status(500).json({ message: "Unable to get secret" });
    }

    const token = jwt.sign({ id: user?.id }, secret, {
      expiresIn: "1d",
    });

    const currentDate = new Date();
    const oneDayAhead = new Date(currentDate);
    oneDayAhead.setDate(currentDate.getDate() + 1);

    mongoPrismaClient.verificationToken
      .create({
        data: {
          userId: user?.id,
          token,
          expires: oneDayAhead,
        },
      })

      .catch(() => {
        return res.status(500).json({ message: "unable to update user" });
      });

    const protocol = req.headers["x-forwarded-proto"] || "http";

    // Get the host (domain and port) from the request object
    const host = req.headers["x-forwarded-host"] || req.headers.host;

    // Construct the site URL using the protocol and host
    const siteUrl = `${protocol}://${host}/reset-password/${token}`;

    const result = await sendPasswordResetEmail({
      email: email,
      subject: "You've requested to reset your password",
      body: "Click on the link to reset password",
      html: EnquireTemplate(
        `Please click on this link to reset your password: ${siteUrl}`,
        email
      ),
    });

    if (result !== AuthenticationStatusCode.SUCCESS) {
      return res.status(500).json({ message: "Internal server error." });
    }
    return res
      .status(200)
      .json({ message: "Password reset email has been sent." });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
}
