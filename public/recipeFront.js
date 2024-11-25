import {findRecipesByIngredientsNew} from './TBDFile.js';

document.addEventListener("DOMContentLoaded", async () => {
    // Path to the JSON file
    // const jsonFilePath = '../AllRecipes.json';
    // // console.log('working');
    // try {
    //     // Fetch the JSON file and parse it
    //     const response = await fetch(jsonFilePath);
    //     if (!response.ok) {
    //         throw new Error('Failed to fetch recipes JSON file');
    //     }
    //     const recipes = await response.json();
    //
    //     console.log('Recipes from JSON:', recipes);
    const exampleIngredients = [
        "2 (14.75 ounce) cans salmon, drained and flaked",
        "¾ cup Italian-seasoned panko (Japanese bread crumbs)",
        "½ cup minced fresh parsley",
        "2 eggs, beaten",
        "2 green onions, chopped",
        "3 tablespoons Worcestershire sauce",
        "3 tablespoons grated Parmesan cheese",
        "2 tablespoons Dijon mustard",
        "2 tablespoons creamy salad dressing (such as Miracle Whip®)",
        "2 teaspoons seafood seasoning (such as Old Bay®)",
        "1 ½ teaspoons garlic powder",
        "1 ½ teaspoons ground black pepper",
        "1 tablespoon olive oil, or as needed, divided"
    ];

    // Output container
    const outputDiv = document.getElementById('output');
    const recipes = findRecipesByIngredientsNew(exampleIngredients);
    console.log(recipes)
    if (outputDiv) {
        // Iterate through the recipes array
        recipes.forEach(item => {
            // Create recipe widget container
            const individualRecipe = document.createElement('div');
            individualRecipe.classList.add('recipeWidget');

            // Create the link for the image
            const link = document.createElement('a');
            link.href = item.recipeLink;

            // Create the image element
            const img = document.createElement('img');
            // img.src = imgFakeLink; // Set image source
            img.src = item.imgSrc; // Set image source
            img.alt = `${item.recipeName}`; // Use recipe name as alt text
            img.style.borderRadius = '15px'; // Curved edges
            link.appendChild(img); // Append image to the link

            // Append the link to the recipe widget
            individualRecipe.appendChild(link);

            // Add text below the image
            const text = document.createElement('p');
            text.textContent = `${item.recipeName}`;
            individualRecipe.appendChild(text);

            // Append the widget to the container
            const widgetContainer = document.querySelector('.widgetContainer');
            widgetContainer.appendChild(individualRecipe);

            // Debugging output
            console.log(individualRecipe.outerHTML);
        });
    } else {
        console.error('Output div not found');
    }
    // } catch (error) {
    //     console.error('Error loading recipes:', error);
    // }
});

// import fs from 'fs';
//
// // Path to the JSON file in your directory
// const filePath = '~/Desktop/fall2024/JHEMCookbook/AllRecipes.json';
// console.log("reading JSOn");
// // Read the file
// fs.readFile(filePath, 'utf8', (err, data) => {
//     if (err) {
//         console.error('Error reading JSON file:', err);
//         return;
//     }
//
//     try {
//         // Parse the JSON data
//         const array = JSON.parse(data);
//
//         console.log('Array from JSON:', array);
//
//         // Iterate through the array
//         array.forEach((item, index) => {
//             console.log(`Item ${index}:`, item);
//         });
//     } catch (parseError) {
//         console.error('Error parsing JSON:', parseError);
//     }
// });
//
// // import { scrapeRecipes, findRecipesByIngredientsJani } from '~/Desktop/fall2024/JHEMCookbook/allRecipeWebScrape.js';
// // import { findRecipesByIngredientsJani } from '/Users/chio/Desktop/fall2024/JHEMCookbook/allRecipeWebScrape.js';
//
// document.addEventListener("DOMContentLoaded", () => {
//     // a list of recipe with its name, image src, and link to the website
//     // const recipes = findRecipesByIngredientsJani(userIngredients, recipesArray);
//     console.log(findRecipesByIngredientsJani(userIngredients, recipesArray));
//     const outputDiv = document.getElementById('output');
//     // iterating through the list
//     if (outputDiv) {recipes.forEach(item => {
//         // creating recipe widget where the recipes will be held
//         const individualRecipe = document.createElement('div');
//         individualRecipe.classList.add('recipeWidget');
//
//         // creating the link that the image will link to
//         const link = document.createElement('a');
//         link.href = item.link;
//
//         // Create the image element
//         // const img = document.querySelector('img');
//         const img = document.createElement('img');
//         img.src = item.image; // Set image source
//         img.alt = `${item.name}`; // Use name as alt text
//         img.style.borderRadius = '15px'; // Curved edges
//         link.appendChild(img); // Append image to the link
//
//         // Append the link to the widget
//         individualRecipe.appendChild(link);
//
//         // Add text below the image
//         const text = document.createElement('p');
//         text.textContent = `${item.name}`;
//         individualRecipe.appendChild(text);
//
//         // Append the widget to the container
//         const widgetContainer = document.querySelector('.widgetContainer');
//         widgetContainer.appendChild(individualRecipe);
//
//         // Debugging output
//         console.log(individualRecipe.outerHTML);
//     });
//
//     } else {
//         console.error('Output div not found');
//     }
// });
