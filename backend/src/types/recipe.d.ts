export interface Recipe {
    id: string,
    name: string,
    thumbnail: string,
    ingredients: string[],
    instructions: string[],
    category: string,
    area: string
}