import { v4 as uuidv4 } from 'uuid'
import { Recipe } from '../types/recipe'

class RecipeModel {
    private recipes: Recipe[] = []

    searchRecipe(query: string) {
        const foundRecipes = this.recipes.filter(r => r.name.toLowerCase().includes(query.toLowerCase()))
        if (foundRecipes.length === 0) return false
        return foundRecipes
    }

    browseRecipes() {
        return this.recipes
    }

    readRecipe(id: string) {
        const foundRecipe = this.recipes.find(r => r.id === id)
        if (!foundRecipe) return false
        return foundRecipe
    }

    editRecipe(id: string, update: Partial<Recipe>) {
        const foundRecipe = this.recipes.findIndex(r => r.id === id)
        if (foundRecipe === -1) return false
        const updatedRecipe = {
            ...this.recipes[foundRecipe],
            name: update.name ?? this.recipes[foundRecipe].name, 
            thumbnail: update.thumbnail ?? this.recipes[foundRecipe].thumbnail,
            ingredients: update.ingredients ?? this.recipes[foundRecipe].ingredients,
            instructions: update.instructions ?? this.recipes[foundRecipe].instructions,
            category: update.category ?? this.recipes[foundRecipe].category,
            area: update.area ?? this.recipes[foundRecipe].area
        }
        this.recipes[foundRecipe] = updatedRecipe
        return updatedRecipe
    }

    addRecipe(newRecipe: Omit<Recipe, 'id'>) {
        const { name, thumbnail, ingredients, instructions, category, area } = newRecipe
        const foundRecipe = this.recipes.find(r => r.name === name)
        if (foundRecipe) return false
        const recipe = {
            id: uuidv4(),
            name,
            thumbnail,
            ingredients,
            instructions,
            category,
            area
        }
        this.recipes.push(recipe)
        return recipe
    }

    deleteRecipe(id: string) {
        const foundRecipe = this.recipes.findIndex(r => r.id === id)
        if (foundRecipe === -1) return false
        this.recipes.splice(foundRecipe, 1)
    }

}

export default new RecipeModel