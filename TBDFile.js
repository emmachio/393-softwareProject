import fs from 'fs/promises';

function findRecipesByIngredients(ingredientsArray) {
    return new Promise((resolve, reject) => {
        // Read the JSON file
        console.log("did not make it in");

        fs.readFile('AllRecipes.json', 'utf8', (err, data) => {

            if (err) {
                console.error('Error reading the JSON file:', err);
                reject(err);
                return;
            }

            try {
                // Parse the JSON data
                const jsonData = JSON.parse(data);

                // Array to store matching Recipe objects
                const matchingRecipes = [];

                // Iterate through each recipe in the JSON file
                jsonData.forEach(item => {
                    // Check if the ingredients match exactly
                    if (JSON.stringify(item.ingredientsArray) === JSON.stringify(ingredientsArray)) {
                        const recipe = new Recipe(item.recipeName);
                        recipe.setLink(item.recipeLink);
                        item.ingredientsArray.forEach(ingredient => recipe.addIngredient(ingredient));
                        matchingRecipes.push(recipe);
                    }
                });

                // Resolve the matching recipes array
                resolve(matchingRecipes);
            } catch (parseError) {
                console.error('Error parsing the JSON file:', parseError);
                reject(parseError);
            }
        });
    });
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

findRecipesByIngredients(exampleIngredients)
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