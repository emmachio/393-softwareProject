import puppeteer from 'puppeteer';

export class Recipe {
    constructor(name, image) {
        this.name = name;
        this.image = image;
    }
    printRecipe() {
        console.log(`Recipe: ${this.name}, Image URL: ${this.image}`);
    }
    // Method to add an ingredient to the array
    addIngredient(ingredient) {
        this.ingredientsArray.push(ingredient);
    }
}


let recipeLink;
let recipe = new Recipe();
let ingredient;

//makes it open
// const browser = await puppeteer.launch({headless: false});
const browser = await puppeteer.launch();
const page = await browser.newPage();
//What page to go to
await page.goto('https://www.allrecipes.com/recipes/455/everyday-cooking/more-meal-ideas/30-minute-meals/');
//Set page size
await page.setViewport({width: 1080, height: 1024})
//get title and log it
const title = await page.title();
console.log('PAGE TITLE: '+title);
//get and log array of recipe names
const recipeNames = await page.evaluate(() => {

    const elements = document.querySelectorAll('div.card__content > span > span');
    console.log("elements");
    console.log(elements);
    return Array.from(elements).map(el => {
        // const recipeNameElement = el.querySelector('#mntl-card-list-items_5-0 > div.card__content > span > span');
        const recipeName = el.textContent.trim();
        // const imgElement = el.querySelector('div.loc.card__top > div.card__media.mntl-universal-image.card__media.universal-image__container > div > img');  // Select the <img> tag inside the .image div
        // const imageUrl = imgElement ? imgElement.src : null;  // Extract the image URL
        console.log(recipeName);
        return { recipeName };
    });
});

export function findRecipesByIngredient(ingredient, recipeObjects) {
    const matches = recipeObjects.filter(recipe =>
        recipe.name.toLowerCase().includes(ingredient.toLowerCase())
    );

    if (matches.length > 0) {
        matches.forEach(match => console.log(`Found Recipe: ${match.name}, Image URL: ${match.image}`));
        return matches.map(match => ({ name: match.name, image: match.image }));
    } else {
        console.log(`No recipes found with ingredient: ${ingredient}`);
        return [];
    }
}
// Map over the extracted data to create instances of the Recipe class
console.log(recipeNames);

// const recipeObjects = recipeNames.map(({ recipeName, imageUrl }) => new Recipe(recipeName, imageUrl));
// recipeObjects.forEach(recipe => recipe.printRecipe());


// Pause for 10 seconds, to see what's going on.
//await new Pro mise(r => setTimeout(r, 10000));



//    Recipe: Test Recipe, Image URL: https://example.com/image.jpg



