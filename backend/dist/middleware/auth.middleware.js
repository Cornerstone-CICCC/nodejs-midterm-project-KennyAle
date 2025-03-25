"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkLoggedIn = void 0;
const checkLoggedIn = (req, res, next) => {
    if (req.session && req.session.isLoggedIn) {
        next();
        return;
    }
    res.status(403).json({ message: "You need to be logged in!" });
};
exports.checkLoggedIn = checkLoggedIn;
