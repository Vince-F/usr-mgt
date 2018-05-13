import { User } from "../models/user";
import { ResetPasswordToken } from "../models/resetPasswordToken";
import { MailerController } from "../utilities/mailerController";

export class UserApiController {
    private mailSender : MailerController;

    constructor(mailer:MailerController) {
        this.mailSender = mailer;
    }

    create(login: string, password: string, email: string): Promise<User> {
        // check that login doesn't exist
        return this.retrieveOne(login)
            .then(() => {
                return Promise.reject("Login is already taken");
            }).catch((error) => {
                if (error === "User doesn't exist") {
                    let user = new User(login, password, email);
                    return user.save()
                        .then(() => {
                            return user;
                        });
                } else if (error === "Login is already taken") {
                    return Promise.reject(error);
                } else {
                    return Promise.reject("Fail to check login uniqueness");
                }
            });
    }

    retrieveOne(login: string): Promise<User> {
        return new Promise((resolve, reject) => {
            User.getMongooseModel().findOne({ login }, (error: any, user: User) => {
                if (error) {
                    reject(error);
                } else if (!user) {
                    reject("User doesn't exist");
                } else {
                    resolve(user);
                }
            });
        });
    }

    retrieveAll(): Promise<Array<User>> {
        return new Promise((resolve, reject) => {
            User.getMongooseModel().find((error: any, users: Array<User>) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(users);
                }
            });
        });
    }

    update(login: string, userData: User): Promise<User> {
        return new Promise((resolve, reject) => {
            User.getMongooseModel().findOne({ login }, (error: any, user: User) => {
                if (error) {
                    reject(error);
                } else if (user === undefined) {
                    reject("User doesn't exist");
                } else {
                    userData.login = user.login;
                    userData.password = user.password;
                    User.getMongooseModel().updateOne({ login }, userData, (error: any) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(userData);
                        }
                    });
                }
            });
        });
    }

    delete(login: string) {
        return new Promise((resolve, reject) => {
            User.getMongooseModel().deleteOne({ login: login }, (error: any) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }

    changePassword(login: string, oldPassword: string, newPassword: string): Promise<User> {
        return new Promise((resolve, reject) => {
            User.getMongooseModel().findOne({ login }, (error: any, user: User) => {
                if (error) {
                    reject(error);
                } else {
                    if (user.password === oldPassword) {
                        user.password = newPassword;
                        User.getMongooseModel().updateOne({ login }, user, (error: any) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(user);
                            }
                        });
                    } else {
                        reject("Your current password is wrong.")
                    }
                }
            });
        });
    }

    requestPasswordReset(login: string, email: string): Promise<{token:string}> {
        var token = Math.floor(Math.random() * 1000000000).toString(36);
        return this.retrieveOne(login)
            .then((user) => {
                if (user.email === email) {
                    let resetPasswordReq = new ResetPasswordToken(user._id, token);
                    return resetPasswordReq.save()
                        .then(() => {
                            let link = "http://mySite.com/resetPassword?t=" + token;
                            let emailBody = "<html><p>You have request to reset your password.</p>" +
                                "<p>Please click on this <a href='" + link +"'>link</a> to change your password.</p></html>"
                            return this.mailSender.sendEmail(email,"Password reset request",emailBody)
                                .then(() => {
                                    return {token:token};
                                });
                        });
                }
            });
    }

    resetPassword(login: string, token: string, newPassword: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            ResetPasswordToken.getMongooseModel().findOne({ token: token }, (error: any, resetPassReq: ResetPasswordToken) => {
                if (error) {
                    reject(error);
                } else {
                    var userId = resetPassReq.userId;
                    User.getMongooseModel().findById(userId, (error: any, user: User) => {
                        if (error) {
                            reject(error);
                        } else {
                            if((new Date(resetPassReq.expirationDate)).getTime() < Date.now()) {
                                reject("Token has expired");
                            } else if (user && user.login === login) {
                                user.password = newPassword;
                                user.save()
                                    .then(() => {
                                        resolve(true);
                                    });
                            } else {
                                reject("Invalid token");
                            }
                            ResetPasswordToken.getMongooseModel().deleteOne({token:token});
                        }
                    });
                }
            });
        });
    }
}