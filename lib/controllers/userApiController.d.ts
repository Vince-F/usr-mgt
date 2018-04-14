import { User } from "../models/user";
export declare class UserApiController {
    create(login: string, password: string, email: string): Promise<User>;
    retrieveOne(login: string): Promise<User>;
    retrieveAll(): Promise<Array<User>>;
    update(login: string, userData: User): Promise<User>;
    delete(login: string): Promise<{}>;
    changePassword(login: string, oldPassword: string, newPassword: string): Promise<User>;
}
