"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = isAdmin;
function isAdmin(req, res, next) {
    var role = req.body.user.role;
    //const token=req.headers.authorization?.split(" ")[1]
    try {
        if (role != 'admin')
            return res.status(401).json({ error: 'You not have permission to see this' });
        next();
    }
    catch (error) {
        res.status(401).json({ error: error });
    }
}
