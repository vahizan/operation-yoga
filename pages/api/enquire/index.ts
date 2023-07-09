import nodemailer from "nodemailer";
import { NextApiRequest, NextApiResponse } from "next";
import { SentMessageInfo } from "nodemailer";
import EnquireTemplate from "../enquire/email-templates/EnquireTemplate";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SentMessageInfo | { error: string }>
) {
  const { method } = req;

  if (method !== "POST") {
    res.status(404).json({ error: "Method Invalid" });
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      to: process.env.EMAIL_USER,
      from: req.body.sender,
      subject: req.body.subject,
      text: req.body.text,
      html: EnquireTemplate(req.body.text, req.body.sender),
    });

    res.status(200).end(); // Email sent successfully
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).end(); // Email sending failed
  }
}
