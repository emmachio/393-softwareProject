import {findRecipesByIngredientsNew} from '../TBDFile.js';
import { JSDOM } from 'jsdom';
const { window } = new JSDOM(`
    <!DOCTYPE html>
    <html>
        <body>
            <div id="output"></div>
            <div class="widgetContainer"></div>
        </body>
    </html>
`);
global.document = window.document;
const exampleIngredientsNew = [
    "salmon",
    "panko",
    "fresh parsley",
    "eggs",
    "green onions",
    "Worcestershire",
    "Parmesan cheese",
    "Dijon mustard",
    "creamy salad dressing",
    "seafood seasoning)",
    "garlic powder",
    "black pepper",
    "olive oil",
    "vegetable oil",
    "beef sirloin",
    "fresh broccoli florets",
    "bell pepper",
    "2 carrots",
    "green onion",
    "minced garlic",
    "soy sauce",
    "sesame seeds"
];
document.addEventListener("DOMContentLoaded", async () => {
    // // Path to the JSON file
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
    const recipes = await findRecipesByIngredientsNew(exampleIngredientsNew, '../AllRecipes.json');
        // Output container
    const outputDiv = document.getElementById('output');
    if (outputDiv) {
        // Iterate through the recipes array
        recipes.forEach(item => {
            // Create recipe widget container
            const individualRecipe = document.createElement('div');
            individualRecipe.classList.add('recipeWidget');

            // Create the link for the image
            const link = document.createElement('a');
            link.href = item.link;

            // Create the image element
            const img = document.createElement('img');
            // img.src = imgFakeLink; // Set image source
            img.src = item.imgSrc; // Set image source
            img.alt = item.name; // Use recipe name as alt text
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
