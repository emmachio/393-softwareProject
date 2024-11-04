import Jasmine from 'jasmine';
const jasmine = new Jasmine();
import { Recipe, findRecipesByIngredient } from '/Users/janintowe/Documents/GitHub/JHEMCookbook/testWebScrape.js';

// Mock data for testing
const mockRecipes = [
    new Recipe('Walnut Delight', 'https://link-to-image1.jpg'),
    new Recipe('Apple Pie', 'https://link-to-image2.jpg'),
    new Recipe('Spicy Walnut Sauce', 'https://link-to-image3.jpg')
];

describe('findRecipesByIngredient', () => {
    it('should return recipes containing the specified ingredient in the name', () => {
        const ingredient = 'walnut';
        const result = findRecipesByIngredient(ingredient, mockRecipes);

        expect(result.length).toBe(2);
        expect(result).toEqual([
            { name: 'Walnut Delight', image: 'https://link-to-image1.jpg' },
            { name: 'Spicy Walnut Sauce', image: 'https://link-to-image3.jpg' }
        ]);
    });

    it('should return an empty array if no recipes contain the specified ingredient', () => {
        const ingredient = 'banana';
        const result = findRecipesByIngredient(ingredient, mockRecipes);

        expect(result.length).toBe(0);
        expect(result).toEqual([]);
    });

    it('should return an empty array if the recipe list is empty', () => {
        const ingredient = 'walnut';
        const result = findRecipesByIngredient(ingredient, []);

        expect(result.length).toBe(0);
        expect(result).toEqual([]);
    });

    it('should be case insensitive when searching for recipes', () => {
        const ingredient = 'WALNUT';
        const result = findRecipesByIngredient(ingredient, mockRecipes);

        expect(result.length).toBe(2);
        expect(result).toEqual([
            { name: 'Walnut Delight', image: 'https://link-to-image1.jpg' },
            { name: 'Spicy Walnut Sauce', image: 'https://link-to-image3.jpg' }
        ]);
    });
});