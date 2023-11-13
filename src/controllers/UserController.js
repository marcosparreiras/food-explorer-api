const { hash } = require('bcrypt');
const AppError = require('../utils/AppError');
const validateRequestBody = require('../utils/validateRequestBody');
const knex = require('../database/knex');

class UserController {
    async create(req, res) {
        validateRequestBody(['name', 'email', 'password'], req.body);
        const { name, email, password } = req.body;
        const userAlreadyExists = await knex('users').where({ email }).first();
        if (userAlreadyExists) {
            throw new AppError('Email is already in use');
        }
        const encryptedPassword = await hash(password, 8);
        await knex('users').insert({
            name,
            email,
            password: encryptedPassword,
        });
        res.status(201).json({ success: true });
    }
}

module.exports = UserController;
