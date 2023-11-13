const { Router } = require('express');
const sessionsRoutes = require('./sessions.routes');
const usersRoutes = require('./users.routes');
const mealsRoutes = require('./meals.routes');

const routes = Router();

routes.use('/sessions', sessionsRoutes);
routes.use('/users', usersRoutes);
routes.use('/meals', mealsRoutes);

module.exports = routes;
