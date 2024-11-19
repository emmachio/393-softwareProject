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

async function fetchRecipes() {
  try {
      const response = await fetch('/api/recipes');
      const recipes = await response.json();
      displayRecipes(recipes);
  } catch (error) {
      console.error('Error fetching recipes:', error);
  }
}

function displayRecipes(recipes) {
  const recipeContainer = document.getElementById('recipeContainer');
  recipeContainer.innerHTML = ''; // Clear previous content

  recipes.forEach(recipe => {
      const recipeDiv = document.createElement('div');
      recipeDiv.className = 'recipe';
      recipeDiv.innerHTML = `
          <h2>${recipe.name}</h2>
          <ul>
              ${recipe.ingredientsArray.map(ing => `<li>${ing}</li>`).join('')}
          </ul>
      `;
      recipeContainer.appendChild(recipeDiv);
  });
}

// Call fetchRecipes when the page loads
document.addEventListener('DOMContentLoaded', () => {
  const recipes = [
      { name: "Spicy Chicken Curry", ingredients: ["Chicken", "Spices", "Tomatoes"] },
      { name: "Grilled Chicken Salad", ingredients: ["Chicken", "Lettuce", "Dressing"] }
  ];

  const recipeContainer = document.getElementById('recipeContainer');

  recipes.forEach(recipe => {
      const recipeDiv = document.createElement('div');
      recipeDiv.classList.add('recipe');

      const title = document.createElement('h2');
      title.textContent = recipe.name;

      const ingredientList = document.createElement('ul');
      recipe.ingredients.forEach(ingredient => {
          const listItem = document.createElement('li');
          listItem.textContent = ingredient;
          ingredientList.appendChild(listItem);
      });

      recipeDiv.appendChild(title);
      recipeDiv.appendChild(ingredientList);
      recipeContainer.appendChild(recipeDiv);
  });
});


