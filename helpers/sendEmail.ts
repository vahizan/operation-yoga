import sgMail from "@sendgrid/mail";

export const sendEmail = async (
  email: string,
  subject: string,
  body: string,
  html: string
) => {
  sgMail.setApiKey(process.env.SMTP_PASSWORD || "");

  const msg = {
    to: email,
    from: process.env.EMAIL_FROM || "",
    subject: subject,
    text: body,
    html,
  };

  await sgMail.send(msg);
};
