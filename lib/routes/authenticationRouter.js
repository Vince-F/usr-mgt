"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
class AuthenticationRouter {
    constructor(ctrlInstance) {
        this.ctrlInstance = ctrlInstance;
        this.router = express.Router();
        this.initRouter();
    }
    getRouter() {
        return this.router;
    }
    initRouter() {
        this.router.post("/connect", (req, res) => { this.connectionPassword(req, res); });
        this.router.post("/disconnect", (req, res) => {
            this.disconnect(req, res);
        });
        this.router.get("/retrieveSession", (req, res) => { this.retrieveCurrentSession(req, res); });
    }
    connectionPassword(req, res) {
        let login = req.body.login;
        let password = req.body.password;
        this.ctrlInstance.connectWithPassword(login, password, req)
            .then((userData) => {
            delete userData.password;
            res.status(200).send({ success: true, result: userData });
        }).catch((error) => {
            res.status(200).send({ success: false, error: error });
        });
    }
    disconnect(req, res) {
        this.ctrlInstance.disconnect(req)
            .then(() => {
            res.status(200).send({ success: true });
        }).catch((error) => {
            res.status(200).send({ success: false, error: error });
        });
    }
    retrieveCurrentSession(req, res) {
        this.ctrlInstance.retrieveCurrentSession(req)
            .then((userData) => {
            res.status(200).send({ success: true });
        }).catch((error) => {
            res.status(200).send({ success: false, error: error });
        });
    }
}
exports.AuthenticationRouter = AuthenticationRouter;
