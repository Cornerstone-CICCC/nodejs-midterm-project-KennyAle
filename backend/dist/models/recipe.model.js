"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class RecipeModel {
    constructor() {
        this.recipes = [];
    }
    searchRecipe(query) {
        const foundRecipes = this.recipes.filter(r => r.name.toLowerCase().includes(query.toLowerCase()));
        if (foundRecipes.length === 0)
            return false;
        return foundRecipes;
    }
    browseRecipes() {
        return this.recipes;
    }
    readRecipe(id) {
        const foundRecipe = this.recipes.find(r => r.id === id);
        if (!foundRecipe)
            return false;
        return foundRecipe;
    }
    editRecipe(id, update) {
        var _a, _b, _c, _d, _e, _f;
        const foundRecipe = this.recipes.findIndex(r => r.id === id);
        if (foundRecipe === -1)
            return false;
        const updatedRecipe = Object.assign(Object.assign({}, this.recipes[foundRecipe]), { name: (_a = update.name) !== null && _a !== void 0 ? _a : this.recipes[foundRecipe].name, thumbnail: (_b = update.thumbnail) !== null && _b !== void 0 ? _b : this.recipes[foundRecipe].thumbnail, ingredients: (_c = update.ingredients) !== null && _c !== void 0 ? _c : this.recipes[foundRecipe].ingredients, instructions: (_d = update.instructions) !== null && _d !== void 0 ? _d : this.recipes[foundRecipe].instructions, category: (_e = update.category) !== null && _e !== void 0 ? _e : this.recipes[foundRecipe].category, area: (_f = update.area) !== null && _f !== void 0 ? _f : this.recipes[foundRecipe].area });
        this.recipes[foundRecipe] = updatedRecipe;
        return updatedRecipe;
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
