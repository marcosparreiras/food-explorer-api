const { Router } = require('express');
const multer = require('multer');
const { multerConfig } = require('../config/upload');
const MealController = require('../controllers/MealController');
const MealImageController = require('../controllers/MealImageController');
const ensureAuth = require('../middlewares/ensureAuth');

const uploads = multer(multerConfig);
const mealsRoutes = Router();
const mealController = new MealController();
const mealImageController = new MealImageController();

mealsRoutes.use(ensureAuth);
mealsRoutes.get('/', mealController.index);
mealsRoutes.post('/', mealController.create);
mealsRoutes.get('/:id', mealController.show);
mealsRoutes.put('/:id', mealController.update);
mealsRoutes.delete('/:id', mealController.delete);
mealsRoutes.patch(
    '/:id/image',
    uploads.single('image'),
    mealImageController.update
);

module.exports = mealsRoutes;
