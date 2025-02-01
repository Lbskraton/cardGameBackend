"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_service_1 = require("../service/auth.service");
var auth_middleware_1 = require("../../middleware/auth.middleware");
var router = (0, express_1.Router)();
router.post('/login', auth_middleware_1.isAuthenticate, auth_service_1.default.login);
router.post('/register', auth_middleware_1.isAuthenticate, auth_service_1.default.register);
exports.default = router;
