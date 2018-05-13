export declare class MailerController {
    private smtpHost;
    private smtpUser;
    private smtpPassword;
    private mailTransporter;
    constructor(host: string, user: string, pass: string);
    private generateEmailMetadata(recipients, subject, content);
    sendEmail(recipients: string, subject: string, content: string): Promise<void>;
}
