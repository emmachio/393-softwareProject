// server.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const historyFilePath = path.join(__dirname, 'searchHistory.json');

const readSearchHistory = () => {
  try {
    const data = fs.readFileSync(historyFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

const writeSearchHistory = (history) => {
  fs.writeFileSync(historyFilePath, JSON.stringify(history, null, 2));
};

app.post('/api/search', (req, res) => {
  const { searchTerm } = req.body;
  if (searchTerm) {
    const history = readSearchHistory();
    history.push(searchTerm);
    writeSearchHistory(history);
    res.status(200).send({ message: 'Search term added' });
  } else {
    res.status(400).send({ error: 'No search term provided' });
  }
});

app.get('/api/history', (req, res) => {
  const history = readSearchHistory();
  res.status(200).json(history);
});

app.use(cors({
    origin: 'http://localhost:3000', // Adjust this to match your frontend’s local URL
    methods: ['GET', 'POST']
  }));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
