// Import the express module
const express = require('express');
const app = express();

// Set the port
const PORT = process.env.PORT || 3000;

// Set up a simple route for the homepage
app.get('/', (req, res) => {
    res.send('<h1>Welcome to My Website!</h1><p>This is a simple Node.js website using Express.</p>');
});

// Set up another route for an about page
app.get('/about', (req, res) => {
    res.send('<h1>About Us</h1><p>This is the about page of my website.</p>');
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
