const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(express.static('public')); // Serve static files from the public directory

// Save search query to a file
app.post('/save-search', (req, res) => {
    const searchQuery = req.body.query;
    if (searchQuery) {
        fs.appendFile('search_history.txt', searchQuery + '\n', (err) => {
            if (err) {
                return res.status(500).json({message: 'Error saving search'});
            }
            res.json({ message: 'Search saved successfully' });
        });
    } else {
        res.status(400).json({ message: 'No search query provided' });
    }
});

// Route to serve the search history
app.get('/search-history', (req, res) => {
    fs.readFile('search_history.txt', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading search history');
        }
        res.send(`<pre>${data}</pre>`);
    });
});

// Route to serve the ingredients.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'ingredients.html'));
});

app.get('/second', (req, res) => {
    res.sendFile(path.join(__dirname, '', 'public/cookbook.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



let recipes = [
    { id: 1, name: 'Spaghetti Bolognese', ingredients: ['pasta', 'tomato', 'beef'] },
    { id: 2, name: 'Margherita Pizza', ingredients: ['dough', 'tomato', 'cheese'] },
]; // Initialize as an empty array if no data is fetched yet

app.get('/recipes', (req, res) => {
    if (!recipes) {
        return res.status(500).json({ error: 'Recipes data not available' });
    }
    res.json(recipes);
});

app.post('/search', (req, res) => {
    const query = req.body.query;
    console.log('Search query received:', query);

    // Simulate search logic (replace this with your real logic)
    const results = recipes.filter(recipe => 
        recipe.name.toLowerCase().includes(query.toLowerCase())
    );

    if (results.length > 0) {
        res.json(results); // Return matching recipes
    } else {
        res.status(404).json({ message: 'No recipes found' });
    }
});






