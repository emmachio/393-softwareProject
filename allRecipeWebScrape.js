import puppeteer from 'puppeteer';
//const fs = require('fs');
//import fs from 'fs/promises';
import fs from "fs";

class Recipe {
    constructor(name) {
        this.name = name;
        //this.image = image;
        this.imageSrc = '';
        this.ingredientsArray = [];
        this.recipeLink ="";
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

/* OLD METHOD FOR RECIPE NAMES
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
const returnsEachNameAndLinkAndImage = await page.evaluate(() => {

    const elements = document.querySelectorAll('a.mntl-card-list-items'); // Broaden to <a> selector for each recipe

    return Array.from(elements).filter(el => !el.href.includes('/gallery/') && !el.classList.contains('card--square-image-left')) //filters only allow for recipes to be added
        .map(el => {
            const recipeName = el.querySelector('div.card__content > span > span.card__title-text')?.textContent.trim(); // gets title in same way as before
            const recipeLink = el.href; // grabs link from top of <a> header in html
            const imgElement = el.querySelector('div.loc.card__top > div.card__media > div > img');
            const imageSrc = imgElement?.getAttribute('data-src') || imgElement?.src || null;
            return {recipeName, recipeLink, imageSrc};
        });
});
// Loops through all elements and creates Recipe objects


for (const {recipeName, recipeLink, imageSrc} of returnsEachNameAndLinkAndImage) {
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

    recipe.imageSrc = imageSrc;

    console.log(`Recipe: ${recipe.name}`);
    //console.log('Image Source: ', recipe.imageSrc);
    //console.log('Ingredients:', recipe.ingredientsArray);
    addNewJSONElement(recipe.name, recipeLink, recipe.ingredientsArray, recipe.imageSrc);
}

await browser.close();


//Function to add to JSON
//first check for the last line of the json
//then add {

// function addNewJSONElement (recipeName, recipeLink, ingredientsArray) {
//     fs.readFile("AllRecipes.json", "utf8", (err, data) => {
//         if (err) {
//             console.error("Error reading the JSON file:", err);
//             return;
//         }
//         try {
//             const jsonData = JSON.parse(data);
//
//             const newRecipe = {
//                 recipeName: recipeName,
//                 recipeLink: recipeLink,
//                 ingredientsArray: ingredientsArray
//             };
//             jsonData.push(newRecipe);
//
//             fs.writeFile("AllRecipes.json", JSON.stringify(jsonData, null, 4), "utf8", (err) => {
//                 if (err) {
//                     console.error("Error writing to the JSON file", err);
//                 } else {
//                     console.log("New recipe added successfully!");
//                 }
//             });
//         } catch (parseError) {
//             console.error("Error parsing the JSON file", parseError);
//         }
//     });
// }

const path = require('path');

function addNewJSONElement(recipeName, recipeLink, ingredientsArray, imageSrc) {
    const filePath = path.join(__dirname, "testRecipe.json");

    // Check if the JSON file exists
    if (fs.existsSync(filePath)) {
        console.log("JSON file exists:", filePath);

        // Read the file and parse its contents
        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
                console.error("Error reading the JSON file:", err);
                return;
            }

            try {
                const jsonData = JSON.parse(data);

                // Create a new recipe object
                const newRecipe = {
                    recipeName: recipeName,
                    recipeLink: recipeLink,
                    ingredientsArray: ingredientsArray,
                    imageSrc: imageSrc
                };

                // Add the new recipe to the JSON array
                jsonData.push(newRecipe);

                // Write the updated array back to the JSON file
                fs.writeFile(filePath, JSON.stringify(jsonData, null, 4), "utf8", (err) => {
                    if (err) {
                        console.error("Error writing to the JSON file:", err);
                    } else {
                        console.log("New recipe added successfully!");
                    }
                });
            } catch (parseError) {
                console.error("Error parsing the JSON file:", parseError);
            }
        });
    } else {
        console.error("JSON file NOT found:", filePath);
    }
}

