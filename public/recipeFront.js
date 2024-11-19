// document.addEventListener("DOMContentLoaded", () => {
//     const data = [
//         { name: "Alice", age: 25, city: "New York" },
//         { name: "Bob", age: 30, city: "Los Angeles" },
//         { name: "Charlie", age: 35, city: "Chicago" }
//     ];
//
//     const outputDiv = document.getElementById('output');
//
//     if (outputDiv) {
//         data.forEach(item => {
//             const paragraph = document.createElement('recipeWidget');
//             paragraph.textContent = `Name: ${item.name}, Age: ${item.age}, City: ${item.city}`;
//             outputDiv.appendChild(paragraph);
//         });
//     } else {
//         console.error('Output div not found');
//     }
// });
document.addEventListener("DOMContentLoaded", () => {
    // a list of Recipes
    const recipes = [{ name: 'Walnut Delight', image: 'https://link-to-image1.jpg' },];

    const outputDiv = document.getElementById('output');

    if (outputDiv) {
        recipes.forEach(item => {
            const individualRecipe = document.createElement('div');
            individualRecipe.classList.add('recipeWidget')
            individualRecipe.innerHTML = `Name: ${item.name}, Image: ${item.image}`;
            const widgetContainer = document.querySelector('.widgetContainer');
            widgetContainer.appendChild(individualRecipe);
            console.log(individualRecipe.outerHTML);
            individualRecipe.offsetHeight;
        });
    } else {
        console.error('Output div not found');
    }
});
