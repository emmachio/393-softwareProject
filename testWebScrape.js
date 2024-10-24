import puppeteer from 'puppeteer';

class Recipe {
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


const browser = await puppeteer.launch({headless: false});
//const browser = await puppeteer.launch();
const page = await browser.newPage();
//What page to go to
await page.goto('https://walnuts.org/recipes/?');
//Set page size
await page.setViewport({width: 1080, height: 1024})
//get title and log it
const title = await page.title();
console.log('PAGE TITLE: '+title);

//get and log array of recipe names
const recipeNames = await page.evaluate(() => {
    const elements = document.querySelectorAll('.recipe-item');  // Select all the recipe containers

    return Array.from(elements).map(el => {
        const recipeNameElement = el.querySelector('h3 a');  // Select the <a> tag inside <h3> (recipe name)
        const recipeName = recipeNameElement ? recipeNameElement.textContent.trim() : null;  // Extract recipe name

        const imgElement = el.querySelector('.image img');  // Select the <img> tag inside the .image div
        const imageUrl = imgElement ? imgElement.src : null;  // Extract the image URL

        return {
            recipeName,   // Recipe name from the <h3> <a> tag
            imageUrl      // Image URL from the <img> tag
        };
    });
});
// Map over the extracted data to create instances of the Recipe class
const recipeObjects = recipeNames.map(({ recipeName, imageUrl }) => new Recipe(recipeName, imageUrl));
recipeObjects.forEach(recipe => recipe.printRecipe());


// Pause for 10 seconds, to see what's going on.
//await new Promise(r => setTimeout(r, 10000));






