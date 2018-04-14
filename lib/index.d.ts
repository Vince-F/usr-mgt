/// <reference types="express" />
import express = require("express");
export declare class UserManagementApi {
    static instantiateApiAndGetRouters(dbUrl: string): Promise<{
        authenticationRouter: express.Router;
        userApiRouter: express.Router;
    }>;
}
