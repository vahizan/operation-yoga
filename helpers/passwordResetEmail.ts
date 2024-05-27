import AuthenticationStatusCode from "./AuthenticationStatusCode";
import { sendEmail } from "./sendEmail";
import PrismaClient from "../connector/Prisma/prismaClient";

interface EmailInfo {
  email: string;
  subject: string;
  body: string;
  html: string;
}
export const sendPasswordResetEmail = async (
  emailInfo: EmailInfo
): Promise<AuthenticationStatusCode> => {
  {
    if (!emailInfo?.email) {
      return AuthenticationStatusCode.INVALID_CREDENTIALS;
    }

    const mongoConnector = PrismaClient;

    if (!mongoConnector) {
      return AuthenticationStatusCode.CONNECTION_FAILED;
    }
    const user = await mongoConnector.user.findFirstOrThrow({
      where: {
        email: emailInfo.email,
      },
    });

    if (!user) {
      return AuthenticationStatusCode.USER_NOT_EXIST;
    }

    try {
      await sendEmail(
        emailInfo.email,
        emailInfo.subject,
        emailInfo.body,
        emailInfo.html
      );
    } catch (err) {
      return AuthenticationStatusCode.EMAIL_FAILED;
    }

    return AuthenticationStatusCode.SUCCESS;
  }
};
