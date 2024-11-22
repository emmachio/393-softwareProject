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

document.getElementById('searchForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const searchBar = document.getElementById('ingredients');
    const query = searchBar.value.trim();

    if (query) {
        const response = await fetch('/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });

        if (response.ok) {
            const results = await response.json();
            displayResults(results); // Call a function to display search results
        } else {
            console.error('Search failed:', response.statusText);
        }
    }
});





console.log(listItems); // Logs the array of `<li>` elements


function displayResults(results) {
    const container = document.getElementById('recipeContainer');
    container.innerHTML = ''; // Clear previous results

    results.forEach(recipe => {
        const recipeDiv = document.createElement('div');
        recipeDiv.className = 'recipe';
        recipeDiv.innerHTML = `
            <h2>${recipe.name}</h2>
            <ul>
                ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
        `;
        container.appendChild(recipeDiv);
    });
}


// Fetch recipes from the backend and display them
fetch('http://localhost:3000/api/recipes') // Match your backend endpoint
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        const recipeList = document.getElementById('recipe-list');
        if (data.length === 0) {
            recipeList.innerHTML = '<p>No recipes found.</p>';
            return;
        }

        data.forEach(recipe => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `
                <h2>${recipe.title}</h2>
                <p><strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}</p>
                <p><strong>Steps:</strong> ${recipe.steps}</p>
            `;
            recipeList.appendChild(recipeDiv);
        });
    })
    .catch(error => {
        console.error('Error fetching recipes:', error);
        document.getElementById('recipe-list').innerHTML = '<p>Error loading recipes. Please try again later.</p>';
    });
