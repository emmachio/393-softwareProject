const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const dom = new JSDOM(`
    <html>
    <body>
        <div id="string-container"></div>
    </body>
    </html>
`);

const document = dom.window.document;
// testing list of ingredients
const ingredients = ["eggs", "milk"];

console.log("testing");
// Get the container element from the DOM
const container = document.getElementById("string-container");

// Loop through the strings array and create elements for each string
ingredients.forEach((str) => {
    const p = document.createElement("p");
    p.textContent = str;
    console.log(p)
    container.appendChild(p);
});
