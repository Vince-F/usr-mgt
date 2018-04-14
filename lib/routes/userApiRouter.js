"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
class UserApiRouter {
    constructor(ctrlInstance) {
        this.ctrlInstance = ctrlInstance;
        this.router = express.Router();
        this.initRouter();
    }
    getRouter() {
        return this.router;
    }
    initRouter() {
        this.router.post("/", (req, res) => { this.create(req, res); });
        this.router.get("/", (req, res) => {
            this.retrieveAll(req, res);
        });
        this.router.get("/:id", (req, res) => { this.retrieveOne(req, res); });
        this.router.put("/:id", (req, res) => { this.update(req, res); });
        this.router.delete("/:id", (req, res) => { this.delete(req, res); });
        this.router.put("/:id/changePassword", (req, res) => { this.changePassword(req, res); });
    }
    create(req, res) {
        let { login, password, email } = req.body.data;
        this.ctrlInstance.create(login, password, email)
            .then((result) => {
            res.status(200).send({ result, success: true });
        }).catch((error) => {
            res.status(200).send({ success: false, error });
        });
    }
    retrieveAll(req, res) {
        this.ctrlInstance.retrieveAll()
            .then((users) => {
            res.status(200).send({ result: users, success: true });
        }).catch((error) => {
            res.status(200).send({ success: false, error });
        });
    }
    retrieveOne(req, res) {
        let id = req.params.id;
        this.ctrlInstance.retrieveOne(id)
            .then((user) => {
            res.status(200).send({ result: user, success: true });
        }).catch((error) => {
            res.status(200).send({ success: false, error });
        });
    }
    update(req, res) {
        let id = req.params.id;
        let data = req.body.data;
        this.ctrlInstance.update(id, data)
            .then((user) => {
            res.status(200).send({ result: user, success: true });
        }).catch((error) => {
            res.status(200).send({ success: false, error });
        });
    }
    delete(req, res) {
        let id = req.params.id;
        this.ctrlInstance.delete(id)
            .then((user) => {
            res.status(200).send({ success: true, result: user });
        }).catch((error) => {
            res.status(200).send({ success: false, error });
        });
    }
    changePassword(req, res) {
        let id = req.params.id;
        let { newPassword, oldPassword } = req.body.data;
        this.ctrlInstance.changePassword(id, oldPassword, newPassword)
            .then((user) => {
            res.status(200).send({ success: true, result: user });
        }).catch((error) => {
            res.status(200).send({ success: false });
        });
    }
}
exports.UserApiRouter = UserApiRouter;
