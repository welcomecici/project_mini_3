import { fetchapi } from "./fetchapi.js";
import { API_PRODUCTS } from "./contants.js";
import { params } from "./variable.js";

const products = document.querySelector('#products');

export const drawProduct = async () => {
    try {
        // 1. Fetch TẤT CẢ sản phẩm (bỏ qua ?q= vì API không hỗ trợ)
        const allProducts = await fetchapi(API_PRODUCTS);
        console.log("Tất cả sản phẩm:", allProducts);

        // 2. Lọc PHÍA CLIENT nếu có từ khóa
        const filteredProducts = params.q
            ? allProducts.filter(product => {
                const searchTerm = params.q.toLowerCase();
                return (
                    product.title.toLowerCase().includes(searchTerm) ||
                    (product.category && product.category.toLowerCase().includes(searchTerm)) ||
                    (product.brand && product.brand.toLowerCase().includes(searchTerm))
                );
            })
            : allProducts;

        console.log("Sản phẩm đã lọc:", filteredProducts);

        // 3. Hiển thị kết quả
        if (filteredProducts.length === 0) {
            products.innerHTML = `<p class="no-results">Không tìm thấy "${params.q}"</p>`;
            return;
        }

        products.innerHTML = filteredProducts.map(item => `
      <div class="product__item">
        <div class="product__image">
          <img src="${item.thumbnail}" alt="${item.title}">
          <div class="product__percent">${item.discountPercentage}%</div>
        </div>
        <div class="category__content">
          <h3 class="product__title">${item.title}</h3>
          <div class="product__meta">
            <div class="product__price">${item.price}$</div>
            <div class="product__stock">Còn lại: ${item.stock} sp</div>
          </div>
        </div>
      </div>
    `).join("");

    } catch (error) {
        console.error("Lỗi:", error);
        products.innerHTML = `<p class="error">Lỗi tải dữ liệu</p>`;
    }
}