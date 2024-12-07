class Recipe {
    constructor(name, imgSrc = null) {
        this.name = name;
        this.link = null;
        this.ingredientsArray = [];
        this.imgSrc = imgSrc; // Initialize imgSrc with the provided value or null
    }

    setLink(link) {
        this.link = link;
    }

    addIngredient(ingredient) {
        this.ingredientsArray.push(ingredient);
    }
}

// Array to store input values
let ingredientsArray = [];

const pathway = './AllRecipes.json';

// Get the input field and result section
const ingredientsInput = document.getElementById('ingredients');

// Add an event listener for the 'keydown' event
// This allows to have updated Array list of ingredients
ingredientsInput.addEventListener('keydown', (event) => {
    // Check if the 'Enter' key was pressed
    if (event.key === 'Enter') {
        // Get and trim the input value
        const value = ingredientsInput.value.trim();
        if (value) {
            // Add the value to the array
            ingredientsArray.push(value);
            // Update the displayed list
            updateList();
            // Log the array to the console to check if printed properly
            console.log('Current array:', ingredientsArray);

            // Clear the input field
            ingredientsInput.value = '';
        }
        else {
            console.log('Input field is empty.');
        }
        // Prevent form submission or default 'Enter' behavior
        event.preventDefault();
    }
});

//Function to update the displayed list
function updateList() {
    // Clear the current list
    searchList.innerHTML = '';
    
    ingredientsArray.forEach((item, index) => {
        // Create a new list item
        const listItem = document.createElement('li');
        // Set the text of list item
        listItem.textContent = item;
        // Add the list item to the output list
        searchList.appendChild(listItem);
    });
}


document.addEventListener('keydown', async (event) => {  // Make the callback function async
    if (event.key === 'Enter') {
        // Get the ingredients from the input field
        const ingredients = document.getElementById('ingredients').value;
        const ingredientsArray = ingredients.split(',').map(ingredient => ingredient.trim());

        try {
            // Call the function to find recipes based on ingredients
            const recipes = await findRecipesByIngredientsNew(ingredientsArray, '../AllRecipes.json');

            // Call the function to display the recipes
            displayRecipes(recipes);
        } catch (error) {
            console.error('Error fetching recipes:', error);
        }
    }
});

// Function to display the matching recipes
function displayRecipes(recipes) {
    const recipeDisplayElement = document.getElementById('output');

    // Check if the element exists before trying to set innerHTML
    if (recipeDisplayElement) {
        recipeDisplayElement.innerHTML = ''; // Clear previous recipes

        // Loop through recipes and display them
        recipes.forEach(recipe => {
            const recipeHTML = `
                <div class="recipe">
                    <h3>${recipe.recipeName}</h3>
                    <img src="${recipe.imgSrc}" alt="${recipe.recipeName}">
                    <p>Link: <a href="${recipe.recipeLink}" target="_blank">View Recipe</a></p>
                    <ul>
                        ${recipe.ingredientsArray.map(ingredient => `<li>${ingredient}</li>`).join('')}
                    </ul>
                </div>
            `;
            recipeDisplayElement.innerHTML += recipeHTML; // Add the new recipe HTML to the display
        });
    } else {
        console.error('No element with id "recipeDisplay" found.');
    }
}

async function findRecipesByIngredientsNew(ingredientsArray, pathway = '../AllRecipes.json') {
    try {
        // Fetch the JSON file asynchronously
        const response = await fetch(pathway);
        if (!response.ok) {
            throw new Error(`Failed to fetch JSON file: ${response.statusText}`);
        }

        const jsonData = await response.json(); // Parse JSON data

        const matchingRecipes = [];

        // Iterate through each recipe in the JSON data
        jsonData.forEach(item => {
            // Check if all ingredients required for the recipe are present in the user's available ingredients
            const canMakeRecipe = item.ingredientsArray.every(recipeIngredient =>
                ingredientsArray.some(inputIngredient =>
                    inputIngredient.toLowerCase().includes(recipeIngredient.toLowerCase()) ||
                    recipeIngredient.toLowerCase().includes(inputIngredient.toLowerCase())
                )
            );

            if (canMakeRecipe) {
                // Create a new Recipe instance, passing the name and imgSrc
                const recipe = new Recipe(item.recipeName, item.imgSrc);
                recipe.setLink(item.recipeLink);

                // Add ingredients to the recipe
                item.ingredientsArray.forEach(ingredient => recipe.addIngredient(ingredient));

                // Add the recipe to the results array
                matchingRecipes.push(recipe);
            }
        });

        return matchingRecipes; // Return the recipes that can be made
    } catch (error) {
        console.error('Error in findRecipesByIngredientsNew:', error);
        throw error; // Propagate the error
    }
}
