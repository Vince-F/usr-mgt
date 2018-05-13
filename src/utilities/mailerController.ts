import nodemailer = require("nodemailer");

export class MailerController {
    private smtpHost:string;
    private smtpUser:string;
    private smtpPassword:string;
    private mailTransporter:nodemailer.Transporter;

    constructor(host:string,user:string,pass:string) {
        this.smtpHost = host;
        this.smtpUser = user;
        this.smtpPassword = pass;

        this.mailTransporter = nodemailer.createTransport({
            host:this.smtpHost,
            auth: {
                user:this.smtpUser,
                pass:this.smtpPassword
            }
        })
    }

    private generateEmailMetadata(recipients:string,subject:string,content:string) {
        let mailMetadata = {
            from:"sender@test.com",
            to:recipients,
            subject:subject
        } as nodemailer.SendMailOptions;
        if(content.indexOf("<html>") === 0) {
            mailMetadata.html = content;
        } else {
            mailMetadata.text = content;
        }
        return mailMetadata;
    }

    sendEmail(recipients:string,subject:string,content:string):Promise<void> {
        return new Promise((resolve,reject) => {
            this.mailTransporter.sendMail(this.generateEmailMetadata(recipients,subject,content),(error,info) => {
                if(error) {
                    reject(error);
                } else {
                    resolve(info);
                }
            });
        });
    }
}