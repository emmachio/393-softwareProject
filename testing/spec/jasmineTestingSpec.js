import {findRecipesByIngredientsNew} from "../../TBDFile.js";
import {fileURLToPath} from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// describe('findRecipesByIngredientsNew', () => {
//     const filePath = path.resolve(__dirname, '../../AllRecipes.json');
//
//     //No ingredients match
//     it('should return an empty array if no recipes match the ingredients', async () => {
//         const ingredientsArray = ["nonexistent ingredient"];
//
//         const recipes = await findRecipesByIngredientsNew(ingredientsArray, filePath);
//
//         expect(Array.isArray(recipes)).toBe(true);
//         expect(recipes.length).toBe(0);
//     });
//
//     //Ingredients match for one recipe
//     it('should find recipes that match the given ingredients', async () => {
//         const ingredientsArray = [
//             "pasta",
//             "tomato sauce",
//             "herbs",
//             "sugar",
//             "salt",
//             "black pepper",
//             "meatballs",
//             "cheese",
//             "basil"
//         ];
//
//         const recipes = await findRecipesByIngredientsNew(ingredientsArray, filePath);
//
//         expect(Array.isArray(recipes)).toBe(true);
//         expect(recipes.length).toBeGreaterThan(0);
//
//         const recipeNames = recipes.map(recipe => recipe.name);
//         expect(recipeNames).toContain("Homemade Spaghetti-O's");
//     });
//
//     //Ingredients match for multiple recipes
//     it('should return multiple recipes that match the given ingredients', async () => {
//         const ingredientsArray = [
//             "pasta",
//             "butter",
//             "cream",
//             "pepper",
//             "salt",
//             "cheese",
//             "olive oil",
//             "onion",
//             "pesto"
//         ];
//
//         const recipes = await findRecipesByIngredientsNew(ingredientsArray, filePath);
//
//         expect(Array.isArray(recipes)).toBe(true);
//         expect(recipes.length).toBeGreaterThan(0);
//
//         const recipeNames = recipes.map(recipe => recipe.name);
//         expect(recipeNames).toContain("To Die For Fettuccine Alfredo");
//         expect(recipeNames).toContain("Pesto Pasta");
//     });
// });

describe('findRecipesByIngredientsNew', () => {
    const filePath = path.resolve(__dirname, '../../AllRecipes.json');

    // Test: No ingredients match
    it('should return an empty array if no recipes match any ingredients', async () => {
        const ingredientsArray = ["nonexistent ingredient"];
        const recipes = await findRecipesByIngredientsNew(ingredientsArray, filePath);

        expect(Array.isArray(recipes)).toBe(true);
        expect(recipes.length).toBe(0);
    });

    // Test: Exact match for one recipe
    it('should find recipes that match all given ingredients exactly', async () => {
        const ingredientsArray = [
            "pasta",
            "tomato sauce",
            "meatballs",
            "cheese",
            "basil",
            "herbs",
            "sugar",
            "salt",
            "pepper",
            "basil"
        ];

        const recipes = await findRecipesByIngredientsNew(ingredientsArray, filePath);

        expect(Array.isArray(recipes)).toBe(true);
        expect(recipes.length).toBeGreaterThan(0);

        const recipeNames = recipes.map(recipe => recipe.name);
        expect(recipeNames).toContain("Homemade Spaghetti-O's");
    });

    // Test: Partial matches are excluded
    it('should not include recipes that only partially match the ingredients list', async () => {
        const ingredientsArray = ["pasta", "tomato sauce", "cheese"];
        const recipes = await findRecipesByIngredientsNew(ingredientsArray, filePath);

        expect(Array.isArray(recipes)).toBe(true);
        expect(recipes.length).toBe(0); // Assuming no exact matches
    });

    // Test: Case insensitivity
    it('should match ingredients regardless of case sensitivity', async () => {
        const ingredientsArray = ["PASTA", "Tomato SAUCE", "MeAtBalls", "CheESE", "BaSiL"];
        const recipes = await findRecipesByIngredientsNew(ingredientsArray, filePath);

        expect(Array.isArray(recipes)).toBe(true);
        expect(recipes.length).toBeGreaterThan(0);

        const recipeNames = recipes.map(recipe => recipe.name);
        expect(recipeNames).toContain("Homemade Spaghetti-O's");
    });

    // Test: Empty ingredient list
    it('should return an empty array if the ingredients list is empty', async () => {
        const recipes = await findRecipesByIngredientsNew([], filePath);

        expect(Array.isArray(recipes)).toBe(true);
        expect(recipes.length).toBe(0);
    });

    // Test: Large ingredient list (stress test)
    it('should handle a large list of ingredients efficiently', async () => {
        const ingredientsArray = Array(500).fill("pasta").concat(["tomato sauce", "cheese"]);

        const recipes = await findRecipesByIngredientsNew(ingredientsArray, filePath);

        expect(Array.isArray(recipes)).toBe(true);
        expect(recipes.length).toBeGreaterThan(0);
    });

    // Test: Multiple exact matches
    it('should return multiple recipes if more than one matches the exact ingredients', async () => {
        const ingredientsArray = [
            "pasta",
            "tomato sauce",
            "meatballs",
            "cheese",
            "basil"
        ];

        const recipes = await findRecipesByIngredientsNew(ingredientsArray, filePath);

        expect(Array.isArray(recipes)).toBe(true);
        expect(recipes.length).toBeGreaterThan(1); // Assuming there are multiple matches
    });

    // Test: Missing file
    it('should throw an error if the file path is invalid', async () => {
        await expect(findRecipesByIngredientsNew(["pasta"], "invalidPath.json")).rejects.toThrow();
    });

    // Test: File with invalid format
    it('should throw an error if the file does not contain valid JSON', async () => {
        const invalidFilePath = path.resolve(__dirname, '../../InvalidRecipes.json');
        await expect(findRecipesByIngredientsNew(["pasta"], invalidFilePath)).rejects.toThrow();
    });

    // Test: Ingredients in different order
    it('should match recipes even if ingredients are in a different order', async () => {
        const ingredientsArray = [
            "basil",
            "meatballs",
            "cheese",
            "tomato sauce",
            "pasta"
        ];

        const recipes = await findRecipesByIngredientsNew(ingredientsArray, filePath);

        expect(Array.isArray(recipes)).toBe(true);
        expect(recipes.length).toBeGreaterThan(0);

        const recipeNames = recipes.map(recipe => recipe.name);
        expect(recipeNames).toContain("Homemade Spaghetti-O's");
    });

    // Test: Invalid ingredients array
    it('should handle invalid or non-array input gracefully', async () => {
        await expect(findRecipesByIngredientsNew(null, filePath)).rejects.toThrow();
        await expect(findRecipesByIngredientsNew(undefined, filePath)).rejects.toThrow();
        await expect(findRecipesByIngredientsNew("not an array", filePath)).rejects.toThrow();
    });

    // Test: Valid recipe structure
    it('should return recipes with the expected structure', async () => {
        const ingredientsArray = [
            "pasta",
            "tomato sauce",
            "meatballs",
            "cheese",
            "basil"
        ];

        const recipes = await findRecipesByIngredientsNew(ingredientsArray, filePath);

        recipes.forEach(recipe => {
            expect(recipe).toHaveProperty('name');
            expect(recipe).toHaveProperty('ingredients');
            expect(recipe).toHaveProperty('image');
            expect(recipe).toHaveProperty('link');
        });
    });

    // Test: No duplicate recipes
    it('should not return duplicate recipes', async () => {
        const ingredientsArray = [
            "pasta",
            "tomato sauce",
            "meatballs",
            "cheese",
            "basil"
        ];

        const recipes = await findRecipesByIngredientsNew(ingredientsArray, filePath);

        const recipeNames = recipes.map(recipe => recipe.name);
        const uniqueNames = new Set(recipeNames);

        expect(recipeNames.length).toBe(uniqueNames.size);
    });

    // Test: Special characters in ingredients
    it('should handle ingredients with special characters correctly', async () => {
        const ingredientsArray = ["pasta", "tomato-sauce", "cheese"];
        const recipes = await findRecipesByIngredientsNew(ingredientsArray, filePath);

        expect(Array.isArray(recipes)).toBe(true);
    });

    // Test: Trimming whitespace in ingredients
    it('should handle ingredients with leading/trailing whitespace', async () => {
        const ingredientsArray = [" pasta ", " tomato sauce "];
        const recipes = await findRecipesByIngredientsNew(ingredientsArray, filePath);

        expect(Array.isArray(recipes)).toBe(true);
    });

    // Test: Performance (timeout test)
    it('should return results within a reasonable time frame for large files', async () => {
        const startTime = Date.now();

        const ingredientsArray = ["pasta", "cheese", "tomato sauce"];
        await findRecipesByIngredientsNew(ingredientsArray, filePath);

        const endTime = Date.now();
        const duration = endTime - startTime;

        expect(duration).toBeLessThan(2000); // Example threshold: 2 seconds
    });
});



