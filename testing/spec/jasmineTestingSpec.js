import {findRecipesByIngredientsNew} from "../../TBDFile.js";
import {fileURLToPath} from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('findRecipesByIngredientsNew', () => {
    const filePath = path.resolve(__dirname, '../../AllRecipes.json');

    //No ingredients match
    it('should return an empty array if no recipes match the ingredients', async () => {
        const ingredientsArray = ["nonexistent ingredient"];

        const recipes = await findRecipesByIngredientsNew(ingredientsArray, filePath);

        expect(Array.isArray(recipes)).toBe(true);
        expect(recipes.length).toBe(0);
    });

    //Ingredients match for one recipe
    it('should find recipes that match the given ingredients', async () => {
        const ingredientsArray = [
            "pasta",
            "tomato sauce",
            "herbs",
            "sugar",
            "salt",
            "black pepper",
            "meatballs",
            "cheese",
            "basil"
        ];
        it('should test recipe with different caps', async () => {
            const ingredientsArray = [
                "Pasta",
                "tomato sauce",
                "herbs",
                "sugar",
                "Salt",
                "black pepper",
                "meatballs",
                "cheEse",
                "Basil"
            ];

        const recipes = await findRecipesByIngredientsNew(ingredientsArray, filePath);

        expect(Array.isArray(recipes)).toBe(true);
        expect(recipes.length).toBeGreaterThan(0);

        const recipeNames = recipes.map(recipe => recipe.name);
        expect(recipeNames).toContain("Homemade Spaghetti-O's");
    });

    //Ingredients match for multiple recipes
    it('should return multiple recipes that match the given ingredients', async () => {
        const ingredientsArray = [
            "pasta",
            "butter",
            "cream",
            "pepper",
            "salt",
            "cheese",
            "olive oil",
            "onion",
            "pesto"
        ];
        it('should check recipe with multiple capitalizations', async () => {
            const ingredientsArray = [
                "pasta",
                "Butter",
                "cream",
                "pepper",
                "salt",
                "cheEse",
                "olive oil",
                "onion",
                "pesto"
            ];

        const recipes = await findRecipesByIngredientsNew(ingredientsArray, filePath);

        expect(Array.isArray(recipes)).toBe(true);
        expect(recipes.length).toBeGreaterThan(0);

        const recipeNames = recipes.map(recipe => recipe.name);
        expect(recipeNames).toContain("To Die For Fettuccine Alfredo");
        expect(recipeNames).toContain("To Die For Fettuccine Alfredo");
        expect(recipeNames).toContain("Pesto Pasta");
        expect(recipeNames).toContain("Pesto Pasta");

        });
});}