import { Router } from "express";
import recipeController from "../controllers/recipe.controller";

const recipeRouter = Router()

// Browse
recipeRouter.get('/', recipeController.getRecipes)
// Search
recipeRouter.get('/search', recipeController.searchRecipe)
// Read
recipeRouter.get('/:id', recipeController.getRecipeById)
// Edit
recipeRouter.put('/:id', recipeController.editRecipe)
// Add
recipeRouter.post('/', recipeController.addRecipe)
// Delete
recipeRouter.delete('/:id', recipeController.deleteRecipe)

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

export default recipeRouter