/// <reference types="mongoose" />
import mongoose = require("mongoose");
export declare class ResetPasswordToken {
    userId: string;
    token: string;
    expirationDate: Date;
    private mongooseModelInstance;
    private static mongooseSchema;
    constructor(userId: string, token: string);
    save(): Promise<void>;
    static getMongooseModel(): mongoose.Model<mongoose.Document>;
    static getMongooseSchema(): mongoose.Schema;
}
