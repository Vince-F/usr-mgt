

export class MailerController {
    private smtpHost:string;
    private smtpUser:string;
    private smtpPassword:string;

    constructor(host:string,user:string,pass:string) {
        this.smtpHost = host;
        this.smtpUser = user;
        this.smtpPassword = pass;
    }

    sendEmail(recipients:string,subject:string,content:string):Promise<void> {
        return Promise.reject("Not implemented");
    }
}