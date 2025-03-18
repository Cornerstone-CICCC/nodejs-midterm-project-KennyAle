export interface Recipe {
    id: string,
    name: string,
    thumbnail: string,
    ingredients: Ingredient[],
    instructions: string,
    category: string,
    area: string
}

interface Ingredient {
    name: string,
    quantity: string
}