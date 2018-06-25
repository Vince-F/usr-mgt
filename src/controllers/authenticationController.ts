import { User } from "../models/user";
import express = require("express");
import bcrypt = require("bcryptjs");

export class AuthenticationController {
    connectWithPassword(login: string, password: string, req: express.Request): Promise<any> {
        return new Promise((resolve, reject) => {
            let query = User.getMongooseModel().findOne({ login }, (error: string, result: User) => {
                if (error) {
                    reject(error);
                } else {
                    if(!result) {
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
                            } else {
                                reject("Wrong credentials");
                            }
                        }).catch((err) => {
                            reject("Error while comparing passwords");
                        });
                }
            });
        });
    }

    disconnect(req: express.Request) {
        return new Promise((resolve, reject) => {
            delete req.session.userData;
            req.session.connected = false;
            req.session.destroy((error: any) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });

        })
    }

    retrieveCurrentSession(req: express.Request) {
        return new Promise((resolve, reject) => {
            if (req.session.connected) {
                resolve(req.session.userData)
            } else {
                reject("Not connected.");
            }
        });
    }
}