import express = require("express");
import { UserApiController } from "../controllers/userApiController";
import { User } from "../models/user";

export class UserApiRouter {
    protected ctrlInstance: UserApiController;
    protected router: express.Router;

    constructor(ctrlInstance: UserApiController) {
        this.ctrlInstance = ctrlInstance;
        this.router = express.Router();
        this.initRouter();
    }

    getRouter() {
        return this.router;
    }

    protected initRouter() {
        this.router.post("/", (req, res) => { this.create(req, res) });
        this.router.get("/", (req, res) => {
            this.retrieveAll(req, res);
        });
        this.router.get("/:id", (req, res) => { this.retrieveOne(req, res) });
        this.router.put("/:id", (req, res) => { this.update(req, res) });
        this.router.delete("/:id", (req, res) => { this.delete(req, res) });
        this.router.put("/:id/changePassword", (req, res) => { this.changePassword(req, res) });
        /*this.router.put("/:id/requestPasswordReset", (req, res) => { this.requestPasswordReset(req, res) });
        this.router.put("/:id/resetPassword", (req, res) => { this.resetPassword(req, res); });*/
    }

    create(req: express.Request, res: express.Response) {
        let { login, password, email } = req.body.data;

        this.ctrlInstance.create(login, password, email)
            .then((result) => {
                res.status(200).send({ result, success: true });
            }).catch((error) => {
                res.status(200).send({ success: false, error });
            });
    }

    retrieveAll(req: express.Request, res: express.Response) {
        this.ctrlInstance.retrieveAll()
            .then((users) => {
                res.status(200).send({ result: users, success: true });
            }).catch((error) => {
                res.status(200).send({ success: false, error });
            });
    }

    retrieveOne(req: express.Request, res: express.Response) {
        let id = req.params.id;

        this.ctrlInstance.retrieveOne(id)
            .then((user) => {
                res.status(200).send({ result: user, success: true });
            }).catch((error) => {
                res.status(200).send({ success: false, error });
            });
    }

    update(req: express.Request, res: express.Response) {
        let id = req.params.id;
        let data = req.body.data;

        this.ctrlInstance.update(id, data)
            .then((user) => {
                res.status(200).send({ result: user, success: true });
            }).catch((error) => {
                res.status(200).send({ success: false, error });
            });
    }

    delete(req: express.Request, res: express.Response) {
        let id = req.params.id;

        this.ctrlInstance.delete(id)
            .then((user) => {
                res.status(200).send({ success: true, result: user });
            }).catch((error) => {
                res.status(200).send({ success: false, error });
            });
    }

    changePassword(req: express.Request, res: express.Response) {
        let id = req.params.id;
        let { newPassword, oldPassword } = req.body.data;

        this.ctrlInstance.changePassword(id, oldPassword, newPassword)
            .then((user) => {
                res.status(200).send({ success: true, result: user });
            }).catch((error) => {
                res.status(200).send({ success: false })
            });
    }

    /*requestPasswordReset(req: express.Request, res: express.Response) {
        let id = req.params.id;
        let { email } = req.body.data;

        this.ctrlInstance.requestPasswordReset(id, email)
            .then((result) => {
                res.status(200).send({ success: true, result });
            }).catch((error) => {
                res.status(200).send({ success: false, error });
            });
    }*/

    /*resetPassword(req: express.Request, res: express.Response) {
        let id = req.params.id;
        let { token, newPassword } = req.body.data;

        this.ctrlInstance.resetPassword(id, token, newPassword)
            .then((result) => {
                res.status(200).send({ success: true, result });
            }).catch((error) => {
                res.status(200).send({ success: false, error });
            })
    }*/
}