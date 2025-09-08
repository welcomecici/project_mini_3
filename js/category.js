import { fetchapi } from "./fetchapi.js";
import { API_CATEGORY } from "./contants.js";

const category = document.querySelector('#category');

fetchapi(API_CATEGORY).then(data => {
    let htmls = data.map(item => `
        <div class="category__item">${item.name}</div>
    `);
    category.innerHTML = htmls.join("");
});
