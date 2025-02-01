"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var compression_1 = require("compression");
var cookie_parser_1 = require("cookie-parser");
var express_1 = require("express");
var express_rate_limit_1 = require("express-rate-limit");
var cors_1 = require("cors");
var helmet_1 = require("helmet");
var auth_router_1 = require("./auth/router/auth.router");
var user_router_1 = require("./user/router/user.router");
var error_middleware_1 = require("./middleware/error.middleware");
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
var limiter = (0, express_rate_limit_1.default)({
    max: 10000,
    windowMs: 1000 * 15 * 60
});
app.use(limiter);
app.use(error_middleware_1.ErrorMiddleware);
app.use('/api/auth/', auth_router_1.default);
app.use('/api/users/', user_router_1.default);
exports.default = app;
