import express = require("express");
import { AuthenticationController } from "../controllers/authenticationController";
import {User} from "../models/user";

export class AuthenticationRouter {
    protected ctrlInstance: AuthenticationController;
    protected router: express.Router;

    constructor(ctrlInstance: AuthenticationController) {
        this.ctrlInstance = ctrlInstance;
        this.router = express.Router();
        this.initRouter();
    }

    getRouter() {
        return this.router;
    }

    protected initRouter() {
        this.router.post("/connect", (req, res) => { this.connectionPassword(req, res) });
        this.router.post("/disconnect", (req, res) => {
            this.disconnect(req, res);
        });
        this.router.get("/retrieveSession", (req, res) => { this.retrieveCurrentSession(req, res) });
    }

    connectionPassword(req: express.Request, res: express.Response) {
        let login = req.body.login;
        let password = req.body.password;

        this.ctrlInstance.connectWithPassword(login, password,req)
            .then((userData:User) => {
                delete userData.password; // don't send back password
                res.status(200).send({success:true,result:userData});
            }).catch((error) => {
                res.status(200).send({success:false,error:error});
            });
    }

    disconnect(req: express.Request, res: express.Response) {
        this.ctrlInstance.disconnect(req)
            .then(() => {
                res.status(200).send({success:true});
            }).catch((error) => {
                res.status(200).send({success:false,error:error});
            });
    }

    retrieveCurrentSession(req: express.Request, res: express.Response) {
        this.ctrlInstance.retrieveCurrentSession(req)
            .then((userData:User) => {
                res.status(200).send({success:true,result:userData});
            }).catch((error) => {
                res.status(200).send({success:false,error:error});
            });
    }
}