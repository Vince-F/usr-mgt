/// <reference types="mongoose" />
import mongoose = require("mongoose");
export declare class DatabaseController {
    private db;
    private host;
    constructor(dbUrl: string);
    connect(options?: mongoose.ConnectionOptions): Promise<void>;
}
