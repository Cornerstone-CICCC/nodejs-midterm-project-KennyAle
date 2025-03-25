"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recipe_controller_1 = __importDefault(require("../controllers/recipe.controller"));
const recipeRouter = (0, express_1.Router)();
// Browse
recipeRouter.get('/', recipe_controller_1.default.getRecipes);
// Search
recipeRouter.get('/search', recipe_controller_1.default.searchRecipe);
// Read
recipeRouter.get('/:id', recipe_controller_1.default.getRecipeById);
// Edit
recipeRouter.put('/:id', recipe_controller_1.default.editRecipe);
// Add
recipeRouter.post('/', recipe_controller_1.default.addRecipe);
// Delete
recipeRouter.delete('/:id', recipe_controller_1.default.deleteRecipe);
// // Browse
// recipeRouter.get('/', checkLoggedIn, recipeController.getRecipes)
// // Search
// recipeRouter.get('/search', checkLoggedIn, recipeController.searchRecipe)
// // Read
// recipeRouter.get('/:id', checkLoggedIn, recipeController.getRecipeById)
// // Edit
// recipeRouter.put('/:id', checkLoggedIn, recipeController.editRecipe)
// // Add
// recipeRouter.post('/', checkLoggedIn, recipeController.addRecipe)
// // Delete
// recipeRouter.delete('/:id', checkLoggedIn, recipeController.deleteRecipe)
exports.default = recipeRouter;
