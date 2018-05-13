import {DatabaseController} from "./controllers/databaseController";
import {AuthenticationController} from "./controllers/authenticationController";
import {UserApiController} from "./controllers/userApiController";

import {AuthenticationRouter} from "./routes/authenticationRouter";
import {UserApiRouter} from "./routes/userApiRouter";

import express = require("express");
import { MailerController } from "./utilities/mailerController";


export class UserManagementApi {
    static instantiateApiAndGetRouters(dbUrl:string)
        :Promise<{authenticationRouter:express.Router,userApiRouter:express.Router}> {
        let dbCtrl = new DatabaseController(dbUrl);
        let mailer = new MailerController("smtp.ethereal.email","e6tmngiprgh2vrtf@ethereal.email","mXm64rurdPtKfE19tq");

        return dbCtrl.connect()
            .then(() => {
                let authCtrl = new AuthenticationController();
                let userApiCtrl = new UserApiController(mailer);

                return {
                    authenticationRouter: (new AuthenticationRouter(authCtrl)).getRouter(),
                    userApiRouter: (new UserApiRouter(userApiCtrl)).getRouter()
                }
            });
    }
}