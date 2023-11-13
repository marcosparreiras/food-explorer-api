const jwt = require('jsonwebtoken');
const { compare } = require('bcrypt');
const knex = require('../database/knex');
const validateRequestBody = require('../utils/validateRequestBody');
const AppError = require('../utils/AppError');
const authConfig = require('../config/auth');

class SessionsController {
    async create(req, res) {
        validateRequestBody(['email', 'password'], req.body);
        const { email, password } = req.body;
        const user = await knex('users').where({ email }).first();
        if (!user) {
            throw new AppError('Invalid user or password');
        }
        const passwordIsValid = await compare(password, user.password);
        if (!passwordIsValid) {
            throw new AppError('Invalid user or password');
        }
        const { secret, expiresIn } = authConfig;
        const token = jwt.sign({ id: user.id }, secret, { expiresIn });
        delete user.password;
        res.status(200).json({ token, user });
    }
}

module.exports = SessionsController;
