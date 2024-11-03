"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authPublicRoutes = authPublicRoutes;
const authController_1 = require("../../controllers/authController");
function authPublicRoutes(app) {
    app.post("/login", authController_1.authController.login);
}
