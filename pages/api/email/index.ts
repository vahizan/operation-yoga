import sgMail from "@sendgrid/mail";
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

  sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

  const msg = {
    to: process.env.TO_EMAIL,
    from: req.body.sender,
    subject: req.body.subject,
    text: req.body.text,
    html: EnquireTemplate(req.body.text, req.body.sender),
  };

  sgMail
    .send(msg)
    .then((success) => {
      res.status(200).json(success);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
}
