import puppeteer from 'puppeteer';
import { Recipe, findRecipesByIngredient } from './path-to-your-file';

describe('Recipe Class', () => {
    it('should initialize with name and image properties', () => {
        const recipe = new Recipe('Test Recipe', 'https://example.com/image.jpg');
        expect(recipe.name).toBe('Test Recipe');
        expect(recipe.image).toBe('https://example.com/image.jpg');
    });

    it('should print recipe details', () => {
        const recipe = new Recipe('Test Recipe', 'https://example.com/image.jpg');
        console.log = jest.fn();  // Mock console.log
        recipe.printRecipe();
        expect(console.log).toHaveBeenCalledWith('Recipe: Test Recipe, Image URL: https://example.com/image.jpg');
    });

    it('should add ingredients to the ingredientsArray', () => {
        const recipe = new Recipe('Test Recipe', 'https://example.com/image.jpg');
        recipe.ingredientsArray = [];
        recipe.addIngredient('salt');
        expect(recipe.ingredientsArray).toContain('salt');
    });
});

describe('findRecipesByIngredient Function', () => {
    const mockRecipes = [
        new Recipe('Walnut Delight', 'https://link-to-image1.jpg'),
        new Recipe('Apple Pie', 'https://link-to-image2.jpg'),
        new Recipe('Spicy Walnut Sauce', 'https://link-to-image3.jpg')
    ];

    it('should return recipes containing the specified ingredient', () => {
        const result = findRecipesByIngredient('walnut', mockRecipes);
        expect(result.length).toBe(2);
        expect(result).toEqual([
            { name: 'Walnut Delight', image: 'https://link-to-image1.jpg' },
            { name: 'Spicy Walnut Sauce', image: 'https://link-to-image3.jpg' }
        ]);
    });

    it('should return an empty array if no recipes contain the specified ingredient', () => {
        const result = findRecipesByIngredient('banana', mockRecipes);
        expect(result).toEqual([]);
    });

    it('should be case insensitive', () => {
        const result = findRecipesByIngredient('WALNUT', mockRecipes);
        expect(result.length).toBe(2);
    });
});

describe('Puppeteer Scraping', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
    });

    afterAll(async () => {
        await browser.close();
    });

    it('should navigate to the page and retrieve the title', async () => {
        await page.goto('https://www.allrecipes.com/recipes/455/everyday-cooking/more-meal-ideas/30-minute-meals/');
        const title = await page.title();
        expect(title).toContain('30-Minute Meals'); // Adjust based on actual title
    });

    it('should retrieve recipe names from the page', async () => {
        await page.goto('https://www.allrecipes.com/recipes/455/everyday-cooking/more-meal-ideas/30-minute-meals/');

        const recipeNames = await page.evaluate(() => {
            const elements = document.querySelectorAll('div.card__content > span > span');
            return Array.from(elements).map(el => el.textContent.trim());
        });

        expect(recipeNames.length).toBeGreaterThan(0); // Ensure recipes are retrieved
        recipeNames.forEach(name => {
            expect(typeof name).toBe('string');
            expect(name.length).toBeGreaterThan(0);
        });
    });
});
