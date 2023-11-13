const knex = require('../database/knex');
const AppError = require('../utils/AppError');
const validateRequestBody = require('../utils/validateRequestBody');

class MealController {
    async index(req, res) {
        const { search } = req.query;
        let meals = [];
        if (search) {
            const result = await knex
                .from('ingredients')
                .join('meals', 'meals.id', 'ingredients.meal_id')
                .select('*')
                .whereLike('ingredients.name', `%${search}%`)
                .orWhereLike('meals.name', `%${search}%`);
            result.forEach((res) => {
                const filterMeal = meals.filter((meal) => meal.id === res.id);
                if (filterMeal.length > 0) {
                    return;
                }
                meals.push(res);
            });
        } else {
            meals = await knex('meals');
        }
        const mealsWihtIngredients = await Promise.all(
            meals.map(async (meal) => {
                const ingredinetsResult = await knex('ingredients').where({
                    meal_id: meal.id,
                });
                const ingredients = ingredinetsResult.map((res) => res.name);
                return { ...meal, ingredients };
            })
        );
        res.status(200).json(mealsWihtIngredients);
    }

    async show(req, res) {
        const { id: meal_id } = req.params;
        const meal = await knex('meals').where({ id: meal_id }).first();
        if (!meal) {
            throw new AppError('Meal not found');
        }
        const ingredinetsResult = await knex('ingredients').where({ meal_id });
        const ingredients = ingredinetsResult.map((res) => res.name);
        res.status(200).json({ ...meal, ingredients });
    }

    async create(req, res) {
        validateRequestBody(
            ['name', 'description', 'price', 'category', 'ingredients'],
            req.body
        );
        const { name, description, price, category, ingredients } = req.body;
        const mealAlreadyExists = await knex('meals').where({ name }).first();
        if (mealAlreadyExists) {
            throw new AppError('This meal name is not available');
        }
        const [meal_id] = await knex('meals').insert({
            name,
            description,
            price,
            category,
            user_id: req.user_id,
        });
        await Promise.all(
            ingredients.map(async (ingredient) => {
                await knex('ingredients').insert({ name: ingredient, meal_id });
            })
        );
        res.status(201).json({ success: true, id: meal_id });
    }

    async update(req, res) {
        const { id: meal_id } = req.params;
        const meal = await knex('meals').where({ id: meal_id }).first();
        if (!meal) {
            throw new AppError('Meal not found');
        }
        validateRequestBody(
            ['name', 'description', 'price', 'category', 'ingredients'],
            req.body
        );
        const { name, description, price, category, ingredients } = req.body;
        await knex('meals').where({ id: meal_id }).update({
            name,
            description,
            price,
            category,
            updated_at: knex.fn.now(),
        });
        await knex('ingredients').delete().where({ meal_id });
        await Promise.all(
            ingredients.map(async (ingredient) => {
                await knex('ingredients').insert({ name: ingredient, meal_id });
            })
        );
        res.status(202).json();
    }

    async delete(req, res) {
        const { id: meal_id } = req.params;
        await knex('meals').delete().where({ id: meal_id });
        res.status(204).json();
    }
}

module.exports = MealController;
