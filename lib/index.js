"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const databaseController_1 = require("./controllers/databaseController");
const authenticationController_1 = require("./controllers/authenticationController");
const userApiController_1 = require("./controllers/userApiController");
const authenticationRouter_1 = require("./routes/authenticationRouter");
const userApiRouter_1 = require("./routes/userApiRouter");
const optionsManagerInstance_1 = require("./controllers/optionsManagerInstance");
const mailerController_1 = require("./utilities/mailerController");
class UserManagementApi {
    static instantiateApiAndGetRouters(options) {
        optionsManagerInstance_1.optionsManagerInstance.setCurrentOptions(options);
        let dbCtrl = new databaseController_1.DatabaseController(optionsManagerInstance_1.optionsManagerInstance.getCurrentOptions().database.url);
        let mailer = new mailerController_1.MailerController("smtp.ethereal.email", "e6tmngiprgh2vrtf@ethereal.email", "mXm64rurdPtKfE19tq");
        return dbCtrl.connect()
            .then(() => {
            let authCtrl = new authenticationController_1.AuthenticationController();
            let userApiCtrl = new userApiController_1.UserApiController(mailer);
            return {
                authenticationRouter: (new authenticationRouter_1.AuthenticationRouter(authCtrl)).getRouter(),
                userApiRouter: (new userApiRouter_1.UserApiRouter(userApiCtrl)).getRouter()
            };
        });
    }
}
exports.UserManagementApi = UserManagementApi;
