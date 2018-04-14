"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
class UserApiController {
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
}
exports.UserApiController = UserApiController;
