"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const resetPasswordToken_1 = require("../models/resetPasswordToken");
class UserApiController {
    constructor(mailer) {
        this.mailSender = mailer;
    }
    create(login, password, email) {
        return this.retrieveOne(login)
            .then(() => {
            return Promise.reject("Login is already taken");
        }).catch((error) => {
            if (error === "User doesn't exist") {
                let user = new user_1.User(login, password, email);
                return user.save()
                    .then(() => {
                    return user;
                });
            }
            else if (error === "Login is already taken") {
                return Promise.reject(error);
            }
            else {
                return Promise.reject("Fail to check login uniqueness");
            }
        });
    }
    retrieveOne(login) {
        return new Promise((resolve, reject) => {
            user_1.User.getMongooseModel().findOne({ login }, (error, user) => {
                if (error) {
                    reject(error);
                }
                else if (!user) {
                    reject("User doesn't exist");
                }
                else {
                    resolve(user);
                }
            });
        });
    }
    retrieveAll() {
        return new Promise((resolve, reject) => {
            user_1.User.getMongooseModel().find((error, users) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(users);
                }
            });
        });
    }
    update(login, userData) {
        return new Promise((resolve, reject) => {
            user_1.User.getMongooseModel().findOne({ login }, (error, user) => {
                if (error) {
                    reject(error);
                }
                else if (user === undefined) {
                    reject("User doesn't exist");
                }
                else {
                    userData.login = user.login;
                    userData.password = user.password;
                    user_1.User.getMongooseModel().updateOne({ login }, userData, (error) => {
                        if (error) {
                            reject(error);
                        }
                        else {
                            resolve(userData);
                        }
                    });
                }
            });
        });
    }
    delete(login) {
        return new Promise((resolve, reject) => {
            user_1.User.getMongooseModel().deleteOne({ login: login }, (error) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve();
                }
            });
        });
    }
    changePassword(login, oldPassword, newPassword) {
        return new Promise((resolve, reject) => {
            user_1.User.getMongooseModel().findOne({ login }, (error, user) => {
                if (error) {
                    reject(error);
                }
                else {
                    if (user.password === oldPassword) {
                        user.password = newPassword;
                        user_1.User.getMongooseModel().updateOne({ login }, user, (error) => {
                            if (error) {
                                reject(error);
                            }
                            else {
                                resolve(user);
                            }
                        });
                    }
                    else {
                        reject("Your current password is wrong.");
                    }
                }
            });
        });
    }
    requestPasswordReset(login, email) {
        var token = Math.floor(Math.random() * 1000000000).toString(36);
        return this.retrieveOne(login)
            .then((user) => {
            if (user.email === email) {
                let resetPasswordReq = new resetPasswordToken_1.ResetPasswordToken(user._id, token);
                return resetPasswordReq.save()
                    .then(() => {
                    let link = "http://mySite.com/resetPassword?t=" + token;
                    let emailBody = "<html><p>You have request to reset your password.</p>" +
                        "<p>Please click on this <a href='" + link + "'>link</a> to change your password.</p></html>";
                    return this.mailSender.sendEmail(email, "Password reset request", emailBody)
                        .then(() => {
                        return { token: token };
                    });
                });
            }
        });
    }
    resetPassword(login, token, newPassword) {
        return new Promise((resolve, reject) => {
            resetPasswordToken_1.ResetPasswordToken.getMongooseModel().findOne({ token: token }, (error, resetPassReq) => {
                if (error) {
                    reject(error);
                }
                else {
                    var userId = resetPassReq.userId;
                    user_1.User.getMongooseModel().findById(userId, (error, user) => {
                        if (error) {
                            reject(error);
                        }
                        else {
                            if ((new Date(resetPassReq.expirationDate)).getTime() < Date.now()) {
                                reject("Token has expired");
                            }
                            else if (user && user.login === login) {
                                user.password = newPassword;
                                user.save()
                                    .then(() => {
                                    resolve(true);
                                });
                            }
                            else {
                                reject("Invalid token");
                            }
                            resetPasswordToken_1.ResetPasswordToken.getMongooseModel().deleteOne({ token: token });
                        }
                    });
                }
            });
        });
    }
}
exports.UserApiController = UserApiController;
