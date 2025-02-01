"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticate = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var TOKEN_PASSWORD = process.env.TOKEN_PASSWORD || 'pass';
var isAuthenticate = function (req, res, next) {
    var token = req.cookies.token;
    //const token=req.headers.authorization?.split(" ")[1]
    if (!token)
        return res.status(401).json({ error: 'Access denied' });
    try {
        var tokenDecoded = jsonwebtoken_1.default.verify(token, TOKEN_PASSWORD);
        //req.headers.user=tokenDecoded
        req.body.user = tokenDecoded;
        //pasar el testigo al siguiente middleware
        next();
    }
    catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};
exports.isAuthenticate = isAuthenticate;
