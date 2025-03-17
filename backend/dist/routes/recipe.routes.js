"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recipe_controller_1 = __importDefault(require("../controllers/recipe.controller"));
const recipeRouter = (0, express_1.Router)();
// Browse
recipeRouter.get('recipes', recipe_controller_1.default.getRecipes);
// Read
recipeRouter.get('recipes/id', recipe_controller_1.default.getRecipeById);
// Search
recipeRouter.get('recipes/search?q=keyword', recipe_controller_1.default.searchRecipe);
// Edit
recipeRouter.put('recipes/id', recipe_controller_1.default.editRecipe);
// Add
recipeRouter.post('recipes', recipe_controller_1.default.addRecipe);
// Delete
recipeRouter.delete('recipes/id', recipe_controller_1.default.deleteRecipe);
exports.default = recipeRouter;
