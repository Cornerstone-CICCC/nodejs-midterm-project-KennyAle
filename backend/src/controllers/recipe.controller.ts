import { Request, Response } from "express";
import { Recipe } from "../types/recipe";
import recipeModel from "../models/recipe.model";

const getRecipes = (req: Request, res: Response) => {
    const recipes = recipeModel.browseRecipes()
    if (!recipes) {
        res.status(404).json({ message: 'No recipes founded' })
    }
    res.status(200).json(recipes)
}

const getRecipeById = (req: Request, res: Response) => {
    const { id } = req.params
    const recipe = recipeModel.readRecipe(id)
    if (!recipe) {
        res.status(404).json({ message: 'Recipe not found test' })
        return
    }
    res.status(200).json(recipe)
}

const searchRecipe = (req: Request<{}, {}, {}, { name: string }>, res: Response) => {
    const { name } = req.query
    const recipe = recipeModel.searchRecipe(name)
    if (!recipe) {
        res.status(404).json({ message: 'No recipes found' })
        return
    }
    res.status(200).json(recipe)
}

const editRecipe = (req: Request<{ id: string }, {}, Partial<Recipe>>, res: Response) => {
    const { id } = req.params
    const { name, thumbnail, ingredients, instructions, category, area } = req.body
    const recipe = recipeModel.editRecipe(id, { name, thumbnail, ingredients, instructions, category, area })
    if (!recipe) {
        res.status(404).json({ message: 'Recipe not found' })
        return
    }
    res.status(200).json(recipe)
}

const addRecipe = (req: Request<{}, {}, Omit<Recipe, 'id'>>, res: Response) => {
    const { name, thumbnail, ingredients, instructions, category, area } = req.body
    if (!name || !thumbnail || !ingredients || !instructions || !category || !area) {
        res.status(500).json({ message: 'Missing information' })
        return
    }
    const recipe = recipeModel.addRecipe({ name, thumbnail, ingredients, instructions, category, area })
    if (!recipe) {
        res.status(409).json({ message: 'Recipe already exists' })
        return
    }
    res.status(200).json(recipe)
}

const deleteRecipe = (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params
    recipeModel.deleteRecipe(id)
    res.status(200).json({ message: 'Recipe deleted succesfully' })
}

export default {
    getRecipes,
    getRecipeById,
    searchRecipe,
    editRecipe,
    addRecipe,
    deleteRecipe
}