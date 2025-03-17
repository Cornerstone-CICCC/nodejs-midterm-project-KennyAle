import { Router } from "express";
import recipeController from "../controllers/recipe.controller";

const recipeRouter = Router()

// Browse
recipeRouter.get('recipes', recipeController.getRecipes)
// Read
recipeRouter.get('recipes/id', recipeController.getRecipeById)
// Search
recipeRouter.get('recipes/search?q=keyword', recipeController.searchRecipe)
// Edit
recipeRouter.put('recipes/id', recipeController.editRecipe)
// Add
recipeRouter.post('recipes', recipeController.addRecipe)
// Delete
recipeRouter.delete('recipes/id', recipeController.deleteRecipe) 

export default recipeRouter