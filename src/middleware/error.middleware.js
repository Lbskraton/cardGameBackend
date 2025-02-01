"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMiddleware = void 0;
var ErrorMiddleware = function (error, req, res, next) {
    try {
        var status_1 = error.status || 500;
        var message = error.message || 'Something wrong happened';
        res.status(status_1).json({ message: message });
    }
    catch (error) {
        next();
    }
};
exports.ErrorMiddleware = ErrorMiddleware;
