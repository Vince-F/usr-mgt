"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
class DatabaseController {
    constructor(dbUrl) {
        this.host = dbUrl;
    }
    connect() {
        return new Promise((resolve, reject) => {
            mongoose.connect(this.host);
            this.db = mongoose.connection;
            this.db.on('error', (error) => {
                reject(error);
            });
            this.db.once('open', () => {
                resolve(true);
            });
        });
    }
}
exports.DatabaseController = DatabaseController;
