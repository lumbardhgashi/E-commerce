"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const not_authorized_error_1 = require("../errors/not-authorized-error");
const requireAuth = (role) => {
    return (req, res, next) => {
        const user = req.currentUser;
        if (!user || !user.role.includes(role)) {
            throw new not_authorized_error_1.NotAuthorizedError();
        }
        next();
    };
};
exports.requireAuth = requireAuth;
