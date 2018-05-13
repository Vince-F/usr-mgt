/// <reference types="express" />
import express = require("express");
import { Options } from "./models/options";
export declare class UserManagementApi {
    static instantiateApiAndGetRouters(options: Options): Promise<{
        authenticationRouter: express.Router;
        userApiRouter: express.Router;
    }>;
}
