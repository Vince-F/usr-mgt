"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const usr_mgt_1 = require("usr-mgt");
let app = express();
app.use(bodyParser.json());
app.use(expressSession({
    secret: 'someSec',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
const dbUrl = "mongodb://localhost/usrMgtTests";
usr_mgt_1.UserManagementApi.instantiateApiAndGetRouters(dbUrl)
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
