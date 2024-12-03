import { ProductService } from "../domain/services/ProductService";

const productService = new ProductService();

export const fetchProducts = () => {
  return productService.getAllProducts();
};

export const addProduct = (product) => {
  productService.addProduct(product);
};

export const removeProduct = (id) => {
  productService.removeProduct(id);
};
