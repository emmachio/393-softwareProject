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

// Get the input field and result section
const ingredientsInput = document.getElementById('ingredients');
const searchList = document.getElementById('searchList');

const ingredientsArray = [];

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

// Retrieve search history from local storage
const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

// Display each search in the history
searchHistory.forEach(query => {
    const listItem = document.createElement('li');
    listItem.classList.add(query);
    listItem.textContent = query;
    searchList.appendChild(listItem);
    listItem.style.padding = "5px";
    listItem.style.marginBottom = "8px";
    listItem.style.borderBottom = "1px solid #ddd";
    
    // Add the listItem to the array
    ingredientsArray.push(listItem);
});

document.addEventListener('DOMContentLoaded', () => {
    localStorage.removeItem('searchHistory'); // Clear saved search history
});

// Function to update the list
function updateSearchList(value) {
    // Add the value to the array
    temporarySearchList.push(value);

    // Clear the current displayed list
    searchList.innerHTML = '';

    // Display all values from the array
    temporarySearchList.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        searchList.appendChild(listItem);
    });
}

// Event listener for form submission
searchForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    const inputValue = ingredientsInput.value.trim();
    if (inputValue) {
        updateSearchList(inputValue); // Update the list
        ingredientsInput.value = ''; // Clear the input field
    }
});



//console.log(listItems); // Logs the array of `<li>` elements


// Add event listener to the ingredients input field
// Event listener for the input field
ingredientsInput.addEventListener('input', function () {
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
        }
    }
});