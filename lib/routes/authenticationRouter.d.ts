/// <reference types="express" />
import express = require("express");
import { AuthenticationController } from "../controllers/authenticationController";
export declare class AuthenticationRouter {
    protected ctrlInstance: AuthenticationController;
    protected router: express.Router;
    constructor(ctrlInstance: AuthenticationController);
    getRouter(): express.Router;
    protected initRouter(): void;
    connectionPassword(req: express.Request, res: express.Response): void;
    disconnect(req: express.Request, res: express.Response): void;
    retrieveCurrentSession(req: express.Request, res: express.Response): void;
}
