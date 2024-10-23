import puppeteer from 'puppeteer';

let recipeLink;
let recipe = new Recipe();
let ingredient;
let ingredientsArray;

class Recipe {
    constructor() {
        // Ingredient array as a property of the class
        this.ingredientsArray = [];
    }

    // Method to add an ingredient to the array
    addIngredient(ingredient) {
        this.ingredientsArray.push(ingredient);
    }

}


const browser = await puppeteer.launch({headless: false});
//const browser = await puppeteer.launch();
const page = await browser.newPage();
//What page to go to
await page.goto('https://walnuts.org/recipes/?');
//Set page size
await page.setViewport({width: 1080, height: 1024})
// Pause for 10 seconds, to see what's going on.
await new Promise(r => setTimeout(r, 10000));



//in theory, we go through the links, collect them, add that link to the recipe class, and add the ingredients to class too
//array of recipes

void function  addRecipeLink(recipeLink){
//scrape through the link to find the ingredients
    let numberOfIngredients = 0;
    for(var i =0; i < ingredient.length; i++){
        //use addIngredient function in recipe class to add per ingredient

        }
    }

 void function addRecipe(recipeLink, ingredientsArray){
    recipe.push(recipe);
     console.log(recipeLink);
}
