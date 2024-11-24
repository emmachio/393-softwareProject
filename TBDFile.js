function findRecipeByIngredients(inputIngredients) {
    // Read the JSON file
    fs.readFile('AllRecipes.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the JSON file:', err);
            return;
        }

        try {
            // Parse the JSON data
            const jsonData = JSON.parse(data);

            // Search for a matching recipe
            const matchingRecipe = jsonData.find(item => {
                // Check if the ingredients arrays match exactly
                return (
                    Array.isArray(item.ingredientsArray) &&
                    item.ingredientsArray.length === inputIngredients.length &&
                    item.ingredientsArray.every((ing, index) => ing === inputIngredients[index])
                );
            });

            if (matchingRecipe) {
                // Create a new Recipe object for the match
                const recipe = new Recipe(matchingRecipe.recipeName);
                recipe.setLink(matchingRecipe.recipeLink);

                matchingRecipe.ingredientsArray.forEach(ingredient =>
                    recipe.addIngredient(ingredient)
                );

                console.log('Matching Recipe Found:');
                console.log(`Recipe Name: ${recipe.name}`);
                console.log(`Recipe Link: ${recipe.link}`);
                console.log('Ingredients:', recipe.ingredientsArray);

                return recipe; // Return the Recipe object if needed
            } else {
                console.log('No matching recipe found.');
            }
        } catch (parseError) {
            console.error('Error parsing the JSON file:', parseError);
        }
    });
}

findRecipeByIngredients(["Flour", "Sugar", "Cocoa Powder", "Eggs", "Butter"]);

