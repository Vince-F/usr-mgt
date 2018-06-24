/// <reference types="mongoose" />
import mongoose = require("mongoose");
export declare class User {
    login: string;
    password: string;
    email: string;
    _id?: string;
    private mongooseModelInstance;
    private static mongooseSchema;
    constructor(login: string, password: string, email: string);
    save(): Promise<void>;
    static getMongooseModel(): mongoose.Model<mongoose.Document>;
    static getMongooseSchema(): mongoose.Schema;
}
