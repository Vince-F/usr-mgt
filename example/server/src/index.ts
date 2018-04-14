import express = require("express");
import bodyParser = require("body-parser");
import expressSession = require("express-session");
import { UserManagementApi } from "usr-mgt";

let app = express();
app.use(bodyParser.json());
app.use(expressSession({
    secret: 'someSec',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
const dbUrl = "mongodb://localhost/usrMgtTests";

UserManagementApi.instantiateApiAndGetRouters(dbUrl)
    .then((userApiRouters) => {
        app.use("/auth", userApiRouters.authenticationRouter);
        app.use("/api/user", userApiRouters.userApiRouter);
        app.listen(3000, () => {
            console.log("Server launched on port 3000");
        });
    }).catch((error) => {
        console.error("Fatal error: " + error);
        process.exit(1);
    });