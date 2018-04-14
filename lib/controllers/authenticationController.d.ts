/// <reference types="express" />
import express = require("express");
export declare class AuthenticationController {
    connectWithPassword(login: string, password: string, req: express.Request): Promise<any>;
    disconnect(req: express.Request): Promise<{}>;
    retrieveCurrentSession(req: express.Request): Promise<{}>;
}
