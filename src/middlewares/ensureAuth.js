const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const authConfig = require('../config/auth');

function ensureAuth(req, _res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
        throw new AppError('Token is missing');
    }
    const token = authorization.split(' ')[1];
    try {
        const { id } = jwt.verify(token, authConfig.secret);
        req.user_id = id;
        next();
    } catch (_error) {
        throw new AppError('Invalid token', 401);
    }
}

module.exports = ensureAuth;
