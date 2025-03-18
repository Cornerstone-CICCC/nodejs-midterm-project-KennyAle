"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const recipe_model_1 = __importDefault(require("../models/recipe.model"));
const getRecipes = (req, res) => {
    const recipes = recipe_model_1.default.browseRecipes();
    if (!recipes) {
        res.status(404).json({ message: 'No recipes founded' });
    }
    res.status(200).json(recipes);
};
const getRecipeById = (req, res) => {
    const { id } = req.params;
    const recipe = recipe_model_1.default.readRecipe(id);
    if (!recipe) {
        res.status(404).json({ message: 'Recipe not found test' });
        return;
    }
    res.status(200).json(recipe);
};
const searchRecipe = (req, res) => {
    const { name } = req.query;
    const recipe = recipe_model_1.default.searchRecipe(name);
    if (!recipe) {
        res.status(404).json({ message: 'No recipes found' });
        return;
    }
    res.status(200).json(recipe);
};
const editRecipe = (req, res) => {
    const { id } = req.params;
    const { name, thumbnail, ingredients, instructions, category, area } = req.body;
    const recipe = recipe_model_1.default.editRecipe(id, { name, thumbnail, ingredients, instructions, category, area });
    if (!recipe) {
        res.status(404).json({ message: 'Recipe not found' });
        return;
    }
    res.status(200).json(recipe);
};
const addRecipe = (req, res) => {
    const { name, thumbnail, ingredients, instructions, category, area } = req.body;
    if (!name || !thumbnail || !ingredients || !instructions || !category || !area) {
        res.status(500).json({ message: 'Missing information' });
        return;
    }
    const recipe = recipe_model_1.default.addRecipe({ name, thumbnail, ingredients, instructions, category, area });
    if (!recipe) {
        res.status(409).json({ message: 'Recipe already exists' });
        return;
    }
    res.status(200).json(recipe);
};
const deleteRecipe = (req, res) => {
    const { id } = req.params;
    recipe_model_1.default.deleteRecipe(id);
    res.status(200).json({ message: 'Recipe deleted succesfully' });
};
exports.default = {
    getRecipes,
    getRecipeById,
    searchRecipe,
    editRecipe,
    addRecipe,
    deleteRecipe
};
