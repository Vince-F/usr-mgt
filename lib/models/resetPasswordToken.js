"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
class ResetPasswordToken {
    constructor(userId, token) {
        this.userId = userId;
        this.token = token;
        this.expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
        this.mongooseModelInstance = new (ResetPasswordToken.getMongooseModel())(this);
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
            this.mongooseSchema = mongoose.model("ResetPasswordTokens", this.getMongooseSchema());
        }
        return this.mongooseSchema;
    }
    static getMongooseSchema() {
        return new mongoose.Schema({
            userId: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true
            },
            expirationDate: {
                type: Date,
                required: true
            }
        });
    }
}
exports.ResetPasswordToken = ResetPasswordToken;
