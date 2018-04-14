"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
class User {
    constructor(login, password, email) {
        this.login = login;
        this.password = password;
        this.email = email;
        this.mongooseModelInstance = new (User.getMongooseModel())(this);
        Object.defineProperty(this, "mongooseModelInstance", {
            enumerable: false
        });
    }
    save() {
        return new Promise((resolve, reject) => {
            this.mongooseModelInstance.save((error) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve();
                }
            });
        });
    }
    static getMongooseModel() {
        if (this.mongooseSchema === undefined) {
            this.mongooseSchema = mongoose.model("AppUsers", this.getMongooseSchema());
        }
        return this.mongooseSchema;
    }
    static getMongooseSchema() {
        return new mongoose.Schema({
            login: {
                type: String,
                required: true
            },
            password: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            }
        });
    }
}
exports.User = User;
