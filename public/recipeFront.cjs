import fs from 'fs';

// Path to the JSON file in your directory
const filePath = './AllRecipes.json';
console.log("reading JSOn");
// Read the file
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading JSON file:', err);
        return;
    }

    try {
        // Parse the JSON data
        const array = JSON.parse(data);

        console.log('Array from JSON:', array);

        // Iterate through the array
        array.forEach((item, index) => {
            console.log(`Item ${index}:`, item);
        });
    } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
    }
});

const { JSDOM } = require('jsdom');

// Create a DOM-like environment
const dom = new JSDOM(`<!DOCTYPE html><html><body><div id="output"></div></body></html>`);

// Access the simulated `document` and manipulate it
const document = dom.window.document;
const appDiv = document.getElementById('output');


// Array of objects
const recipes = [{ name: 'Walnut Delight', image: 'https://link-to-image1.jpg' }];

// Get the HTML element where you want to display the data
const outputDiv = document.getElementById('output');

recipes.forEach(item => {
    const individualRecipe = document.createElement('div');
    individualRecipe.classList.add('recipeWidget')

    const link = document.createElement('a');
    link.href = `details.html?name=${encodeURIComponent(item.name)}`;


    // const img = document.querySelector('img');
    const img = document.createElement('img');
    img.width = 150;
    img.height = 150;
    img.src = item.image;
    img.alt='{$item.name}';
    link.appendChild(img);

    individualRecipe.appendChild(link)

    const widgetContainer = document.querySelector('.widgetContainer');
    widgetContainer.appendChild(individualRecipe);
    console.log(individualRecipe.outerHTML);
    individualRecipe.offsetHeight;

    widgetContainer.appendChild(individualRecipe);