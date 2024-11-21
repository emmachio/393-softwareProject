import puppeteer from 'puppeteer';

export class Recipe {
    constructor(name) {
        this.name = name;
        //this.image = image;
        this.ingredientsArray = [];
    }
    printRecipe() {
        //console.log(`Recipe: ${this.name}, Image URL: ${this.image}`);
        console.log(`Recipe: ${this.name}`);
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
const browser = await puppeteer.launch({headless: false});
//const browser = await puppeteer.launch();
const page = await browser.newPage();
//What page to go to
await page.goto('https://www.allrecipes.com/recipes/455/everyday-cooking/more-meal-ideas/30-minute-meals/', {waitUntil: "domcontentloaded", timeout: 0});
//Set page size
await page.setViewport({width: 1080, height: 1024})
//get title and log it
const title = await page.title();
console.log('PAGE TITLE: '+title);

/*
//OLD METHOD FOR RECIPE NAMES
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
*/


//BEGIN NEW CODE

// Name can be shortened later, this is to lyk exactly what it does for now
const recipeNameAndIngredients = await page.evaluate(() => {

    const elements = document.querySelectorAll('a.mntl-card-list-items'); // Specify to <a> card list items

    return Array.from(elements).filter(el => !el.href.includes('/gallery/') && !el.classList.contains('card--square-image-left')) //filters only allow for recipes to be added
        .map(el => {
        const recipeName = el.querySelector('div.card__content > span > span.card__title-text')?.textContent.trim(); // gets title in same way as before
        const recipeLink = el.href; // grabs link from top of <a> header in html
        return {recipeName, recipeLink};
    });
});

// Loops through all elements and creates Recipe objects
for (const {recipeName, recipeLink} of recipeNameAndIngredients) {
    await page.goto(recipeLink, {waitUntil: 'networkidle2'});

    const recipe = new Recipe(recipeName);

    // Goes into ingredient list and gets ingredients
    const ingredients = await page.evaluate(() => {
        const ingredientElements = document.querySelectorAll('#mm-recipes-structured-ingredients_1-0 > ul > li');
        // individual ingredient selector: #mm-recipes-structured-ingredients_1-0 > ul > li:nth-child(1)
        return Array.from(ingredientElements).map(el => el.innerText.trim());
    });

    // Adds ingredients to Recipe object
    ingredients.forEach(ingredient => recipe.addIngredient(ingredient));

    console.log(`Recipe: ${recipe.name}`);
    console.log('Ingredients:', recipe.ingredientsArray);
}

await browser.close();

//END NEW CODE


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
//console.log(recipeNames);

// const recipeObjects = recipeNames.map(({ recipeName, imageUrl }) => new Recipe(recipeName, imageUrl));
// recipeObjects.forEach(recipe => recipe.printRecipe());


// Pause for 10 seconds, to see what's going on.
//await new Pro mise(r => setTimeout(r, 10000));



//    Recipe: Test Recipe, Image URL: https://example.com/image.jpg



