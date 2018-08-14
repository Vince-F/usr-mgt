import mongoose = require("mongoose");

export class DatabaseController {
    private db:mongoose.Connection;
    private host:string;

    constructor(dbUrl:string) {
        this.host = dbUrl;
    }

    connect(options?:mongoose.ConnectionOptions):Promise<void> {
        return mongoose.connect(this.host,options)
            .then(() => {
                this.db = mongoose.connection;
            });
    }
}