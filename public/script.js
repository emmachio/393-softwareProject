document.getElementById('searchForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const searchBar = document.getElementById('ingredients');
  const searchList = document.getElementById('searchList');
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
      console.log(searchList);
  }

  // After submitting, also trigger the recipe filtering function
  //filterRecipesByIngredients(); 
});

// Import the function from recipes.js
//import { findRecipesByIngredientsJani } from './allRecipeWebScrape.js';

// Example recipes array (you can replace it with your actual recipe data)
const recipesArray = [
    { name: 'Pasta', ingredientsArray: ['flour', 'egg', 'water', 'salt'] },
    { name: 'Tomato Soup', ingredientsArray: ['tomato', 'salt', 'water'] },
    { name: 'Pancakes', ingredientsArray: ['flour', 'egg', 'milk', 'sugar'] }
];





/*// Function to display user input in the result section
function displayInputInResults() {
    const userIngredients = ingredientsInput.value.toLowerCase().split(',').map(item => item.trim());

    // Debugging: Check the user ingredients array
    console.log("User Ingredients:", userIngredients);

  // Clear the previous result
  searchList.innerHTML = '';

  // Append each ingredient to the list
  userIngredients.forEach(ingredient => {
    const listItem = document.createElement('li');
    listItem.textContent = `Your Ingredient: ${ingredient}`;
    searchList.appendChild(listItem);
});
}*/




//console.log(listItems); // Logs the array of `<li>` elements



let ingredientsArray = [];

// Get the input field and result section
const ingredientsInput = document.getElementById('ingredients');

ingredientsInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const value = ingredientsInput.value.trim();
        if (value) {
            ingredientsArray.push(value);
            updateList();
            console.log('Current array:', ingredientsArray);
            ingredientsInput.value = '';
        }
        else {
            console.log('Input field is empty.');
        }
        event.preventDefault();
    }
});

function updateList() {
    searchList.innerHTML = '';
    ingredientsArray.forEach((item) => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        searchList.appendChild(listItem);
    });
}