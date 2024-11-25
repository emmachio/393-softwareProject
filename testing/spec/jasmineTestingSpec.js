/*
describe("testing the search", () => {
    it("check the search is right", () => {
        // where search is the algorithm and inside of toBe is the expected value
        expect(2).toBe(2);
    });
    // it("check the search is right", () => {
    //     // where search is the algorithm and inside of toBe is the expected value
    //     expect(2).toBe(3);
    // });
    it("check the search is right", () => {
        // where search is the algorithm and inside of toBe is the expected value
        expect(2).toBe(2);
    });
});*/

// Import the function and necessary modules
import {findRecipesByIngredientsNew} from "../../TBDFile.js";
import {fileURLToPath} from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the path to your real JSON file
const jsonFilePath = path.resolve(__dirname, '../../AllRecipes.json');

describe('findRecipesByIngredientsNew', () => {

    beforeAll(() => {
        console.log(`Resolved JSON file path: ${jsonFilePath}`);
        if (!fs.existsSync(jsonFilePath)) {
            throw new Error(`JSON file not found at path ${jsonFilePath}`);
        }
    });

    it('should return matching recipes when ingredients are found in real data', async () => {
        const ingredients = ["Tomato Sauce", "Ground Beef"];

        const result = await findRecipesByIngredientsNew(ingredients);

        // Ensure at least one recipe matches
        expect(result.length).toBeGreaterThan(0);
        expect(result[0].name).toBeDefined(); // Check if the recipe has a name
        expect(result[0].ingredientsArray).toContain("Tomato Sauce");
    });

    it('should return an empty array when no recipes match the ingredients', async () => {
        const ingredients = ["Unicorn Meat", "Dragon Fruit"]; // Unlikely to exist in real data

        const result = await findRecipesByIngredientsNew(ingredients);

        expect(result.length).toBe(0);
    });

    it('should handle partial ingredient matches correctly', async () => {
        const ingredients = ["curry"]; // Partial match for "Curry Powder"

        const result = await findRecipesByIngredientsNew(ingredients);

        // Validate partial match detection
        expect(result.length).toBeGreaterThan(0);
        expect(result.some(recipe => recipe.name.includes("Curry"))).toBeTrue();
    });

    it('should throw an error if the JSON file is missing or unreadable', async () => {
        // Temporarily modify the function's file path to a non-existent one for this test
        spyOn(fs, 'readFile').and.callFake(() => {
            return Promise.reject(new Error('File not found'));
        });

        await expectAsync(findRecipesByIngredientsNew(["Chicken"])).toBeRejectedWithError('File not found');
    });
});

