/* eslint-disable @typescript-eslint/no-explicit-any */
import { BrevoClient } from "@getbrevo/brevo";
// import nodemailer from "nodemailer";
import path from "path";
import ejs from "ejs";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/AppError";
import { HttpStatusCodes } from "./httpStatusCodes";

const brevo = new BrevoClient({
  apiKey: envVars.EMAIL_SENDER.BREVO_API_KEY,
});

// const transporter = nodemailer.createTransport({
//   host: envVars.EMAIL_SENDER.SMTP_HOST,
//   port: Number(envVars.EMAIL_SENDER.SMTP_PORT),
//   secure: false,
//   auth: {
//     user: envVars.EMAIL_SENDER.SMTP_USER,
//     pass: envVars.EMAIL_SENDER.SMTP_PASS,
//   },
// });

interface IEmail {
  to: string;
  subject: string;
  templateName: string;
  templateData?: Record<string, any>;
  attachments?: {
    fileName: string;
    content: Buffer | string;
    contentType: string;
  }[];
}

export const sendEmail = async ({
  to,
  subject,
  templateName,
  templateData,
  attachments,
}: IEmail) => {
  try {
    const templatePath = path.join(__dirname, `templates/${templateName}.ejs`);
    const html = await ejs.renderFile(templatePath, templateData);

    // const info = await transporter.sendMail({
    //   from: envVars.EMAIL_SENDER.SMTP_FROM,
    //   to: to,
    //   subject: subject,
    //   html: html,
    //   attachments: attachments?.map((attachment) => ({
    //     filename: attachment.fileName,
    //     content: attachment.content,
    //     contentType: attachment.contentType,
    //   })),
    // });

    await brevo.transactionalEmails.sendTransacEmail({
      subject,
      htmlContent: html,
      sender: {
        name: "Finvia",
        email: envVars.EMAIL_SENDER.SMTP_FROM,
      },
      to: [{ email: to }],
      ...(attachments?.length && {
        attachment: attachments.map((a) => ({
          name: a.fileName,
          content:
            typeof a.content === "string"
              ? a.content
              : a.content.toString("base64"),
        })),
      }),
    });

    // console.log(`✉️ Email sent to ${to}:${info.messageId}`);
    console.log(`✉️ Email sent to ${to}`);
  } catch (error: any) {
    console.error("email sending error", error.message);
    throw new AppError(HttpStatusCodes.UNAUTHORIZED, "Email error");
  }
};
