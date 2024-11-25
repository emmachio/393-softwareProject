import fs from 'fs/promises';

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


export async function findRecipesByIngredients(ingredientsArray) {
    try {
        // Read the JSON file asynchronously
        const data = await fs.readFile('AllRecipes.json', 'utf8')
        const jsonData = JSON.parse(data);

        const matchingRecipes = [];

        // Iterate through each recipe in the JSON data
        jsonData.forEach(item => {
            // Check if the ingredientsArray items are partially present in the recipe's ingredientsArray
            const containsAllIngredients = ingredientsArray.every(inputIngredient =>
                item.ingredientsArray.some(recipeIngredient =>
                    recipeIngredient.toLowerCase().includes(inputIngredient.toLowerCase())
                )
            );

            if (containsAllIngredients) {
                const recipe = new Recipe(item.recipeName);
                recipe.setLink(item.recipeLink);
                item.ingredientsArray.forEach(ingredient => recipe.addIngredient(ingredient));
                matchingRecipes.push(recipe);
            }
        });

        return matchingRecipes; // Resolve with matching recipes
    } catch (error) {
        console.error('Error in findRecipesByIngredients:', error);
        throw error; // Reject the promise with the error
    }
}

export async function findRecipesByIngredientsNew(ingredientsArray) {
    try {
        // Read the JSON file asynchronously
        const data = await fs.readFile('../AllRecipes.json', 'utf8');
        const jsonData = JSON.parse(data);

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
        // console.log(matchingRecipes)
        return matchingRecipes; // Return the recipes that can be made
    } catch (error) {
        console.error('Error in findRecipesByIngredients:', error);
        throw error; // Propagate the error
    }
}


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




// findRecipesByIngredients(exampleIngredientsNew)
//     .then(matchingRecipes => {
//         if (matchingRecipes.length > 0) {
//             console.log('Matching Recipes:');
//             matchingRecipes.forEach(recipe => {
//                 console.log(`Recipe Name: ${recipe.name}`);
//                 console.log(`Recipe Link: ${recipe.link}`);
//                 console.log('Ingredients:', recipe.ingredientsArray);
//                 console.log('----------------------');
//             });
//         } else {
//             console.log('No matching recipes found.');
//         }
//     })
//     .catch(err => console.error('Error:', err));
//
// findRecipesByIngredientsNew(exampleIngredientsNew)
//     .then(matchingRecipes => {
//         if (matchingRecipes.length > 0) {
//             console.log('Matching Recipes New:');
//             matchingRecipes.forEach(recipe => {
//                 console.log(`Recipe Name: ${recipe.name}`);
//                 console.log(`Recipe Link: ${recipe.link}`);
//                 console.log('Ingredients:', recipe.ingredientsArray);
//                 console.log("Recipe Image Link", recipe.imgSrc);
//                 console.log('----------------------');
//             });
//         } else {
//             console.log('No matching recipes found.');
//         }
//     })
//     .catch(err => console.error('Error:', err));
=======
findRecipesByIngredients(exampleIngredientsNew)
    .then(matchingRecipes => {
        if (matchingRecipes.length > 0) {
            console.log('Matching Recipes:');
            matchingRecipes.forEach(recipe => {
                console.log(`Recipe Name: ${recipe.name}`);
                console.log(`Recipe Link: ${recipe.link}`);
                console.log('Ingredients:', recipe.ingredientsArray);
                console.log('----------------------');
            });
        } else {
            console.log('No matching recipes found.');
        }
    })
    .catch(err => console.error('Error:', err));
>>>>>>> 11ac3224d41a6cf32c78fa1071fcf59e6a40d991

// (async () => {
//     const ingredients = ["salmon", "panko", "eggs"];
const recipes = await findRecipesByIngredientsNew(exampleIngredientsNew);
console.log(recipes); // Logs the array of recipes
// })();
