document.getElementById('searchForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const searchBar = document.getElementById('ingredients');
  const query = searchBar.value.trim();

  if (query) {
      // Retrieve existing history from local storage or initialize an empty array
      let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
      
      // Add the new search query to the history
      searchHistory.push(query);

      // Save updated history back to local storage
      localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

      // Clear the search input
      searchBar.value = '';

      // Optional: Log a confirmation message
      console.log("Search saved to history.");
  }
});

// Import the function from recipes.js
import { findRecipesByIngredientsJani } from './recipes.js';

// Example recipes array (you can replace it with your actual recipe data)
const recipesArray = [
    { name: 'Pasta', ingredientsArray: ['flour', 'egg', 'water', 'salt'] },
    { name: 'Tomato Soup', ingredientsArray: ['tomato', 'salt', 'water'] },
    { name: 'Pancakes', ingredientsArray: ['flour', 'egg', 'milk', 'sugar'] }
];

// Get the input field and result section
const ingredientsInput = document.getElementById('ingredients');
const searchForm = document.getElementById('searchForm');
const searchList = document.getElementById('searchList');

// Event listener for form submission
searchForm.addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the form from submitting

    const userIngredients = ingredientsInput.value.split(',').map(ingredient => ingredient.trim());

    // Call the imported function to get matching recipes
    const matchingRecipes = findRecipesByIngredientsJani(userIngredients, recipesArray);

    // Clear the search list
    searchList.innerHTML = '';

    // Display the matching recipes below the result section
    matchingRecipes.forEach(recipe => {
        const listItem = document.createElement('li');
        listItem.textContent = recipe.name;  // Assuming the recipe object has a 'name' property
        searchList.appendChild(listItem);
    });

    // Clear the input field after searching
    ingredientsInput.value = '';
});
