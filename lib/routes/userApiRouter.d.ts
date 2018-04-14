/// <reference types="express" />
import express = require("express");
import { UserApiController } from "../controllers/userApiController";
export declare class UserApiRouter {
    protected ctrlInstance: UserApiController;
    protected router: express.Router;
    constructor(ctrlInstance: UserApiController);
    getRouter(): express.Router;
    protected initRouter(): void;
    create(req: express.Request, res: express.Response): void;
    retrieveAll(req: express.Request, res: express.Response): void;
    retrieveOne(req: express.Request, res: express.Response): void;
    update(req: express.Request, res: express.Response): void;
    delete(req: express.Request, res: express.Response): void;
    changePassword(req: express.Request, res: express.Response): void;
}
