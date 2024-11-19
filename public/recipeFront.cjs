const { JSDOM } = require('jsdom');

// Create a DOM-like environment
const dom = new JSDOM(`<!DOCTYPE html><html><body><div id="output"></div></body></html>`);

// Access the simulated `document` and manipulate it
const document = dom.window.document;
const appDiv = document.getElementById('output');

// Array of objects
const data = [
    { name: "Alice", age: 25, city: "New York" },
    { name: "Bob", age: 30, city: "Los Angeles" },
    { name: "Charlie", age: 35, city: "Chicago" }
];

// Get the HTML element where you want to display the data
const outputDiv = document.getElementById('output');

// Iterate through the array of objects
data.forEach(item => {
    // Create a paragraph element for each object
    const paragraph = document.createElement('p');

    // Set the text content to display the object's properties
    paragraph.textContent = `Name: ${item.name}, Age: ${item.age}, City: ${item.city}`;

    // Append the paragraph to the output div
    outputDiv.appendChild(paragraph);
});

// Log the resulting HTML for debugging (optional)
console.log(dom.window.document.body.innerHTML);
