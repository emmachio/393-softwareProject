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
