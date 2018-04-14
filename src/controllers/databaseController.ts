import mongoose = require("mongoose");

export class DatabaseController {
    private db:mongoose.Connection;
    private host:string;

    constructor(dbUrl:string) {
        this.host = dbUrl;
    }

    connect():Promise<boolean> {
        return new Promise((resolve,reject) => {
            mongoose.connect(this.host);
            this.db = mongoose.connection;
            this.db.on('error',(error) => {
                reject(error);
            });
            this.db.once('open',() => {
                resolve(true);
            });
        });
    }
}