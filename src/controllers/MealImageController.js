const DiskStorage = require('../providers/DiskStorage');
const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class MealImageController {
    async update(req, res) {
        const { filename } = req.file;
        const { id: meal_id } = req.params;
        const diskStorage = new DiskStorage();
        const meal = await knex('meals').where({ id: meal_id }).first();
        if (!meal) {
            throw new AppError('Meal not found');
        }
        if (meal.image) {
            await diskStorage.deleteFile(meal.image);
        }
        const mealImageName = await diskStorage.saveFile(filename);
        meal.image = mealImageName;
        await knex('meals').where({ id: meal_id }).update(meal);
        res.status(200).json({ image: mealImageName });
    }
}

module.exports = MealImageController;
