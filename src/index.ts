import {DatabaseController} from "./controllers/databaseController";
import {AuthenticationController} from "./controllers/authenticationController";
import {UserApiController} from "./controllers/userApiController";

import {AuthenticationRouter} from "./routes/authenticationRouter";
import {UserApiRouter} from "./routes/userApiRouter";

import express = require("express");

export class UserManagementApi {
    static instantiateApiAndGetRouters(dbUrl:string)
        :Promise<{authenticationRouter:express.Router,userApiRouter:express.Router}> {
        let dbCtrl = new DatabaseController(dbUrl);

        return dbCtrl.connect()
            .then(() => {
                let authCtrl = new AuthenticationController();
                let userApiCtrl = new UserApiController();

                return {
                    authenticationRouter: (new AuthenticationRouter(authCtrl)).getRouter(),
                    userApiRouter: (new UserApiRouter(userApiCtrl)).getRouter()
                }
            });
    }
}