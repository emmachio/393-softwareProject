// Import the function and necessary modules
import {findRecipesByIngredientsNew} from "../../TBDFile.js";
import {fileURLToPath} from 'url';
import path from 'path';
import fs from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('findRecipesByIngredientsNew', () => {
    const filePath = path.resolve(__dirname, '../../AllRecipes.json');

    it('should find recipes that match the given ingredients', async () => {
        const ingredientsArray = [
            "2 cups chicken broth",
            "3 ounces angel hair pasta",
        ];

        const recipes = await findRecipesByIngredientsNew(ingredientsArray, filePath);

        expect(Array.isArray(recipes)).toBe(true);
        expect(recipes.length).toBeGreaterThan(0);

        const recipeNames = recipes.map(recipe => recipe.name);
        expect(recipeNames).toContain('Homemade Pasta Roni');
    });

    it('should return multiple recipes that match the given ingredients', async () => {
        const ingredientsArray = [
            "3 ounces angel hair pasta",
            "2 cups chicken broth",
            "1 clove garlic",
            "1/2 cup freshly shaved Parmesan cheese",
            "30 ounces tomato sauce",
            "fresh basil"
        ];

        const recipes = await findRecipesByIngredientsNew(ingredientsArray, filePath);

        expect(Array.isArray(recipes)).toBe(true);
        expect(recipes.length).toBeGreaterThan(0);

        // Check that specific recipe names are in the output
        const recipeNames = recipes.map(recipe => recipe.name);
        expect(recipeNames).toContain("Homemade Spaghetti-O's");
        expect(recipeNames).toContain("Homemade Pasta Roni");
    });

    it('should return an empty array if no recipes match the ingredients', async () => {
        const ingredientsArray = ["nonexistent ingredient"];

        const recipes = await findRecipesByIngredientsNew(ingredientsArray, filePath);

        expect(Array.isArray(recipes)).toBe(true);
        expect(recipes.length).toBe(0);
    });
});



