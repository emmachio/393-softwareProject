// Function to handle recipe search
async function searchRecipe() {
    const searchTerm = document.getElementById('search-input').value;
    if (!searchTerm) return alert('Please enter a search term');
  
    // Send search term to the backend
    await fetch('http://localhost:3000/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ searchTerm }),
    });
  
    // Display mock results
    const resultsList = document.getElementById('recipe-results');
    resultsList.innerHTML = `
      <li>Recipe for ${searchTerm} 1</li>
      <li>Recipe for ${searchTerm} 2</li>
    `;
  }
  
  // Function to load search history
  async function loadSearchHistory() {
    const response = await fetch('http://localhost:3000/api/history');
    const history = await response.json();
  
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    history.forEach((term) => {
      const listItem = document.createElement('li');
      listItem.textContent = term;
      historyList.appendChild(listItem);
    });
  }
  
  // Load history if on the search history page
  if (document.getElementById('history-list')) {
    loadSearchHistory();
  }
  