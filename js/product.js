// product.js
import { drawProduct } from './drawProduct.js';
import { params } from "./variable.js";  // Sử dụng params từ variable.js

drawProduct();
const inputSearch = document.querySelector('#search input');
const btnSearch = document.querySelector('#search button');

btnSearch.addEventListener('click', function() {
    console.log('click');
    params.q = inputSearch.value;
    console.log(inputSearch.value);
    drawProduct();
});