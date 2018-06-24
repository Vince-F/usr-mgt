import { User } from "../models/user";
import { MailerController } from "../utilities/mailerController";
export declare class UserApiController {
    private mailSender;
    constructor(mailer: MailerController);
    create(login: string, password: string, email: string): Promise<User>;
    retrieveOne(login: string): Promise<User>;
    retrieveAll(): Promise<Array<User>>;
    update(login: string, userData: User): Promise<User>;
    delete(login: string): Promise<{}>;
    changePassword(login: string, oldPassword: string, newPassword: string): Promise<User>;
    encryptPassword(password: string): Promise<string>;
    requestPasswordReset(login: string, email: string): Promise<{
        token: string;
    }>;
    resetPassword(login: string, token: string, newPassword: string): Promise<boolean>;
}
