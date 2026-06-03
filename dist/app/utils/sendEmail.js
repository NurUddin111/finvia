"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const brevo_1 = require("@getbrevo/brevo");
// import nodemailer from "nodemailer";
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const env_1 = require("../config/env");
const AppError_1 = __importDefault(require("../errorHelpers/AppError"));
const httpStatusCodes_1 = require("./httpStatusCodes");
const brevo = new brevo_1.BrevoClient({
    apiKey: env_1.envVars.EMAIL_SENDER.BREVO_API_KEY,
});
const sendEmail = async ({ to, subject, templateName, templateData, attachments, }) => {
    try {
        const templatePath = path_1.default.join(__dirname, `templates/${templateName}.ejs`);
        const html = await ejs_1.default.renderFile(templatePath, templateData);
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
                email: env_1.envVars.EMAIL_SENDER.SMTP_FROM,
            },
            to: [{ email: to }],
            ...(attachments?.length && {
                attachment: attachments.map((a) => ({
                    name: a.fileName,
                    content: typeof a.content === "string"
                        ? a.content
                        : a.content.toString("base64"),
                })),
            }),
        });
        // console.log(`✉️ Email sent to ${to}:${info.messageId}`);
        console.log(`✉️ Email sent to ${to}`);
    }
    catch (error) {
        console.error("email sending error", error.message);
        throw new AppError_1.default(httpStatusCodes_1.HttpStatusCodes.UNAUTHORIZED, "Email error");
    }
};
exports.sendEmail = sendEmail;
