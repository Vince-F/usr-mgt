"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const databaseController_1 = require("./controllers/databaseController");
const authenticationController_1 = require("./controllers/authenticationController");
const userApiController_1 = require("./controllers/userApiController");
const authenticationRouter_1 = require("./routes/authenticationRouter");
const userApiRouter_1 = require("./routes/userApiRouter");
class UserManagementApi {
    static instantiateApiAndGetRouters(dbUrl) {
        let dbCtrl = new databaseController_1.DatabaseController(dbUrl);
        return dbCtrl.connect()
            .then(() => {
            let authCtrl = new authenticationController_1.AuthenticationController();
            let userApiCtrl = new userApiController_1.UserApiController();
            return {
                authenticationRouter: (new authenticationRouter_1.AuthenticationRouter(authCtrl)).getRouter(),
                userApiRouter: (new userApiRouter_1.UserApiRouter(userApiCtrl)).getRouter()
            };
        });
    }
}
exports.UserManagementApi = UserManagementApi;
