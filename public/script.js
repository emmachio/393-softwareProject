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

  // After submitting, also trigger the recipe filtering function
  filterRecipesByIngredients(); 
});

// Import the function from recipes.js
//import { findRecipesByIngredientsJani } from './allRecipeWebScrape.js';

// Example recipes array (you can replace it with your actual recipe data)
const recipesArray = [
    { name: 'Pasta', ingredientsArray: ['flour', 'egg', 'water', 'salt'] },
    { name: 'Tomato Soup', ingredientsArray: ['tomato', 'salt', 'water'] },
    { name: 'Pancakes', ingredientsArray: ['flour', 'egg', 'milk', 'sugar'] }
];

// Get the input field and result section
const ingredientsInput = document.getElementById('ingredients');
const searchList = document.getElementById('searchList');

// Function to filter recipes based on the input
function filterRecipesByIngredients() {
  const userIngredients = ingredientsInput.value.toLowerCase().split(',').map(item => item.trim());

  // Filter recipes based on the user input
  const filteredRecipes = recipesArray.filter(recipe =>
      userIngredients.every(userIngredient =>
          recipe.ingredientsArray.some(recipeIngredient =>
              recipeIngredient.toLowerCase().includes(userIngredient)
          )
      )
  );

  // Clear the previous results
  searchList.innerHTML = '';

  // Display the filtered results
  filteredRecipes.forEach(recipe => {
      const listItem = document.createElement('li');
      listItem.textContent = recipe.name; // Display recipe name
      searchList.appendChild(listItem);
  });
}

// Add event listener to the ingredients input field
ingredientsInput.addEventListener('input', filterRecipesByIngredients);
