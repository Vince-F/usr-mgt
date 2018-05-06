import {DatabaseController} from "./controllers/databaseController";
import {AuthenticationController} from "./controllers/authenticationController";
import {UserApiController} from "./controllers/userApiController";

import {AuthenticationRouter} from "./routes/authenticationRouter";
import {UserApiRouter} from "./routes/userApiRouter";

import express = require("express");
import { Options } from "./models/options";
import { optionsManagerInstance } from "./controllers/optionsManagerInstance";

export class UserManagementApi {
    static instantiateApiAndGetRouters(options:Options)
        :Promise<{authenticationRouter:express.Router,userApiRouter:express.Router}> {

        optionsManagerInstance.setCurrentOptions(options);
        let dbCtrl = new DatabaseController(optionsManagerInstance.getCurrentOptions().database.url);

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