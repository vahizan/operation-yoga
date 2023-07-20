import { USER_MODEL_NAME } from "../model/User.model";
import AuthenticationStatusCode from "./AuthenticationStatusCode";
import { sendEmail } from "./sendEmail";
import createMongoConnection from "../connector/createMongoConnection";

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

    const mongoConnector = createMongoConnection();
    const connection = await mongoConnector.connect();

    if (!connection) {
      return AuthenticationStatusCode.CONNECTION_FAILED;
    }
    const user = await connection.model(USER_MODEL_NAME).findOne({
      email: emailInfo.email,
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
      console.log(err);
      return AuthenticationStatusCode.EMAIL_FAILED;
    } finally {
      mongoConnector?.disconnect();
    }

    return AuthenticationStatusCode.SUCCESS;
  }
};
