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

let ingredientsArray = [];

// Function to display user input in the result section
function displayInputInResults() {
    const userIngredients = ingredientsInput.value.toLowerCase().split(',').map(item => item.trim());

    // Debugging: Check the user ingredients array
    console.log("User Ingredients:", userIngredients);

  // Clear the previous result
  searchList.innerHTML = '';

  // Append each ingredient to the list
  userIngredients.forEach(ingredient => {
    const listItem = document.createElement('li');
    listItem.classList.add('historyItem');
    listItem.textContent = `Your Ingredient: ${ingredient}`;
    searchList.appendChild(listItem);
});
}

// Add event listener to the ingredients input field
// Event listener for the input field
/*ingredientsInput.addEventListener('input', function () {
    // Get the current value from the input field
    const currentValue = ingredientsInput.value.trim();

    // Check if the input is not empty
    if (currentValue) {
        // Add the current input to the array if it isn't already there
        if (!ingredientsArray.includes(currentValue)) {
            ingredientsArray.push(currentValue);

            // Clear the previous result
            searchList.innerHTML = '';

            // Update the display list
            const listItem = document.createElement('li');
            listItem.textContent = currentValue;
            searchList.appendChild(listItem);

            ingredientsInput.value = ingredientsArray;
        }
    }
});
searchHistory.forEach(query => {
    const listItem = document.createElement('li');
    listItem.classList.add('historyItem');
    listItem.textContent = query;
    historyList.appendChild(listItem);
});
*/