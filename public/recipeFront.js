import { scrapeRecipes, findRecipesByIngredientsJani } from '~/Desktop/fall2024/JHEMCookbook/Scrapping[AllRecipe]Puppeteer.js';

console.log(findRecipesByIngredientsJani(userIngredients, recipesArray));
document.addEventListener("DOMContentLoaded", () => {
    // a list of recipe with its name, image src, and link to the website
    const recipes = findRecipesByIngredientsJani(userIngredients, recipesArray);

    const outputDiv = document.getElementById('output');
    // iterating through the list
    if (outputDiv) {recipes.forEach(item => {
        // creating recipe widget where the recipes will be held
        const individualRecipe = document.createElement('div');
        individualRecipe.classList.add('recipeWidget');

        // creating the link that the image will link to
        const link = document.createElement('a');
        link.href = item.link;

        // Create the image element
        // const img = document.querySelector('img');
        const img = document.createElement('img');
        img.src = item.image; // Set image source
        img.alt = `${item.name}`; // Use name as alt text
        img.style.borderRadius = '15px'; // Curved edges
        link.appendChild(img); // Append image to the link

        // Append the link to the widget
        individualRecipe.appendChild(link);

        // Add text below the image
        const text = document.createElement('p');
        text.textContent = `${item.name}`;
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
});
