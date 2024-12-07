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



//console.log(listItems); // Logs the array of `<li>` elements


// Array to store input values
let ingredientsArray = [];

// Get the input field and result section
const ingredientsInput = document.getElementById('ingredients');

// Add an event listener for the 'keydown' event
// This allows to have updated Array list of ingredients
ingredientsInput.addEventListener('keydown', (event) => {
    // Check if the 'Enter' key was pressed
    if (event.key === 'Enter') {
        // Get and trim the input value
        const value = ingredientsInput.value.trim();
        if (value) {
            // Add the value to the array
            ingredientsArray.push(value);
            // Update the displayed list
            updateList();
            // Log the array to the console to check if printed properly
            console.log('Current array:', ingredientsArray);
            // Clear the input field
            ingredientsInput.value = '';
        }
        else {
            console.log('Input field is empty.');
        }
        // Prevent form submission or default 'Enter' behavior
        event.preventDefault();
    }
});

//Function to update the displayed list
function updateList() {
    // Clear the current list
    searchList.innerHTML = '';
    ingredientsArray.forEach((item) => {
        // Create a new list item
        const listItem = document.createElement('li');
        // Set the text of list item
        listItem.textContent = item;
        // Add the list item to the output list
        searchList.appendChild(listItem);
    });
}