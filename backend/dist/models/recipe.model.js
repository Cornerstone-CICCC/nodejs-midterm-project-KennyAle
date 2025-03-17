"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class RecipeModel {
    constructor() {
        this.recipes = [];
    }
    searchRecipe(query) {
    }
    browseRecipes() {
        return this.recipes;
    }
    readRecipe(name) {
    }
    editRecipe(id) {
    }
    addRecipe(newRecipe) {
        const { name, thumbnail, ingredients, instructions, category, area } = newRecipe;
        const foundRecipe = this.recipes.find(r => r.name === name);
        if (foundRecipe)
            return false;
        const recipe = {
            id: (0, uuid_1.v4)(),
            name,
            thumbnail,
            ingredients,
            instructions,
            category,
            area
        };
        this.recipes.push(recipe);
        return recipe;
    }
    deleteRecipe(id) {
        const foundRecipe = this.recipes.findIndex(r => r.id === id);
        if (foundRecipe === -1)
            return false;
        this.recipes.splice(foundRecipe, 1);
    }
}
exports.default = new RecipeModel;
