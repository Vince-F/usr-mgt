"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
class DatabaseController {
    constructor(dbUrl) {
        this.host = dbUrl;
    }
    connect(options) {
        return mongoose.connect(this.host, options)
            .then(() => {
            this.db = mongoose.connection;
        });
    }
}
exports.DatabaseController = DatabaseController;
