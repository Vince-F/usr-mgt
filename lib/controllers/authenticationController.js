"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const bcrypt = require("bcryptjs");
class AuthenticationController {
    connectWithPassword(login, password, req) {
        return new Promise((resolve, reject) => {
            let query = user_1.User.getMongooseModel().findOne({ login }, (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    if (!result) {
                        reject("Wrong credentials");
                        return;
                    }
                    bcrypt.compare(password, result.password)
                        .then((isTheSame) => {
                        if (isTheSame) {
                            delete result.password;
                            req.session.connected = true;
                            req.session.userData = result;
                            resolve(result);
                        }
                        else {
                            reject("Wrong credentials");
                        }
                    }).catch((err) => {
                        reject("Error while comparing passwords");
                    });
                }
            });
        });
    }
    disconnect(req) {
        return new Promise((resolve, reject) => {
            delete req.session.userData;
            req.session.connected = false;
            req.session.destroy((error) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve();
                }
            });
        });
    }
    retrieveCurrentSession(req) {
        return new Promise((resolve, reject) => {
            if (req.session.connected) {
                resolve(req.session.userData);
            }
            else {
                reject("Not connected.");
            }
        });
    }
}
exports.AuthenticationController = AuthenticationController;
