import { Request, Response } from "express";
import { Recipe } from "../types/recipe";
import recipeModel from "../models/recipe.model";
import multer, { StorageEngine } from "multer";
import { v4 as uuidv4 } from 'uuid'

const storage: StorageEngine = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
        cb(null, "uploads/");
    },
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
        cb(null, uuidv4() + "-" + file.originalname); 
    }
});

const upload = multer({ storage });


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
    const { id } = req.params;
    const { name, ingredients, instructions, category, area } = req.body;

    const existingRecipe = recipeModel.readRecipe(id);
    if (!existingRecipe) {
        return res.status(404).json({ message: "Recipe not found" });
    }

    let thumbnail = existingRecipe.thumbnail;
    if (req.file) {
        const fs = require("fs");
        const path = require("path");

        if (existingRecipe.thumbnail) {
            const oldImagePath = path.join(__dirname, "..", existingRecipe.thumbnail);
            fs.unlink(oldImagePath, (err: any) => {
                if (err && err.code !== "ENOENT") {
                    console.error("Error deleting old image:", err);
                }
            });
        }
        thumbnail = `/uploads/${req.file.filename}`;
    }

    const updatedRecipe = recipeModel.editRecipe(id, {
        name,
        thumbnail,
        ingredients,
        instructions,
        category,
        area,
    });

    if (!updatedRecipe) {
        return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json(updatedRecipe);
};

const addRecipe = (req: Request<{}, {}, Omit<Recipe, 'id'>>, res: Response) => {
    const { name, ingredients, instructions, category, area } = req.body
    const thumbnail = req.file ? `/uploads/${req.file.filename}` : null;
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
    editRecipe: [upload.single("thumbnail"), editRecipe],
    addRecipe: [upload.single("thumbnail"), addRecipe],
    deleteRecipe
}