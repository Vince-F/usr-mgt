"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require("nodemailer");
class MailerController {
    constructor(host, user, pass) {
        this.smtpHost = host;
        this.smtpUser = user;
        this.smtpPassword = pass;
        this.mailTransporter = nodemailer.createTransport({
            host: this.smtpHost,
            auth: {
                user: this.smtpUser,
                pass: this.smtpPassword
            }
        });
    }
    generateEmailMetadata(recipients, subject, content) {
        let mailMetadata = {
            from: "sender@test.com",
            to: recipients,
            subject: subject
        };
        if (content.indexOf("<html>") === 0) {
            mailMetadata.html = content;
        }
        else {
            mailMetadata.text = content;
        }
        return mailMetadata;
    }
    sendEmail(recipients, subject, content) {
        return new Promise((resolve, reject) => {
            this.mailTransporter.sendMail(this.generateEmailMetadata(recipients, subject, content), (error, info) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(info);
                }
            });
        });
    }
}
exports.MailerController = MailerController;
