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
    const recipes = [
        { name: "Alice", age: 25, city: "New York" },
        { name: "Bob", age: 30, city: "Los Angeles" },
        { name: "Charlie", age: 35, city: "Chicago" },
        { name: "David", age: 35, city: "Chicago" },
        { name: "Emma", age: 35, city: "Chicago" },
        { name: "Favor", age: 35, city: "Chicago" } ];

    const outputDiv = document.getElementById('output');

    if (outputDiv) {
        recipes.forEach(item => {
            const individualRecipe = document.createElement('div');
            individualRecipe.classList.add('recipeWidget')
            individualRecipe.innerHTML = `Name: ${item.name}, Age: ${item.age}, City: ${item.city}`;
            const widgetContainer = document.querySelector('.widgetContainer');
            widgetContainer.appendChild(individualRecipe);
            console.log(individualRecipe.outerHTML);
            individualRecipe.offsetHeight;
        });
    } else {
        console.error('Output div not found');
    }
});
