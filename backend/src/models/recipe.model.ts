import { v4 as uuidv4 } from 'uuid'
import { Recipe } from '../types/recipe'

class RecipeModel {
    private recipes: Recipe[] = []

    searchRecipe(query: string) {
        
    }

    browseRecipes() {
        return this.recipes
    }

    readRecipe(name: string) {

    }

    editRecipe(id: string) {

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