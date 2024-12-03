// import axios from "axios";
// import { Product } from "../models/Product";

// const API_URL = "http://localhost:5000/products";

// export const ProductService = {
//   getAllProducts: async () => {
//     try {
//       const response = await axios.get(API_URL);
//       return response.data.map(product => Product.fromJSON(product));
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       throw error;
//     }
//   },

//   addProduct: async (productData) => {
//     try {
//       const response = await axios.post(API_URL, productData);
//       return Product.fromJSON(response.data);
//     } catch (error) {
//       console.error("Error adding product:", error);
//       throw error;
//     }
//   },

//   updateProduct: async (id, productData) => {
//     try {
//       const response = await axios.put(`${API_URL}/${id}`, productData);
//       return Product.fromJSON(response.data);
//     } catch (error) {
//       console.error("Error updating product:", error);
//       throw error;
//     }
//   },

//   deleteProduct: async (id) => {
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//     } catch (error) {
//       console.error("Error deleting product:", error);
//       throw error;
//     }
//   }
// };

import axios from "axios";
import { Product } from "../models/Product";

// GraphQL endpoint
const GRAPHQL_URL = 'http://localhost:8030/product-svc';

// Define GraphQL queries and mutations
const GET_ALL_PRODUCTS_QUERY = `
  query Products {
    products {
      id
      name
      price
      stock
    }
  }
`;

const ADD_PRODUCT_MUTATION = (name, price, stock) => {
  const priceDec = (Math.round(price * 100) / 100).toFixed(2)
  const m = `
    mutation CreateProduct {
      createProduct(name: "${name}", price: ${priceDec}, stock: ${stock}) {
        id
        name
        price
        stock
      }
    }
  `;
  return m;
};

const UPDATE_PRODUCT_MUTATION = (id, name, price, stock) => {
  const priceDec = (Math.round(price * 100) / 100).toFixed(2)
  const m = `
    mutation UpdateProduct {
      updateProduct(id: "${id}", name: "${name}", price: ${priceDec}, stock: ${stock}) {
        id
        name
        price
        stock
      }
    }
  `;
  return m;
};

const DELETE_PRODUCT_MUTATION = (id) => {
  const m = `
    mutation DeleteProduct {
    deleteProduct(id: "${id}")
  }
  `;
  return m;
};

export const ProductService = {
  // Fetch all products
  getAllProducts: async (token) => {
    try {
      const response = await axios.post(GRAPHQL_URL, {
        query: GET_ALL_PRODUCTS_QUERY
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token to the headers as a separate object
        },
      });
      return response.data.data.products.map(product => Product.fromJSON(product));
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  // Add a new product
  addProduct: async (productData, token) => {
    try {
      const mutation = ADD_PRODUCT_MUTATION(productData.name, productData.price, productData.stock)
      const response = await axios.post(GRAPHQL_URL, {
        query: mutation,
        variables: { productData }
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token to the headers as a separate object
        },
      });
      return Product.fromJSON(response.data.data.createProduct);
    } catch (error) {
      console.error("Error adding product:", error);
      throw error;
    }
  },

  // Update an existing product
  updateProduct: async (id, productData, token) => {
    try {
      const mutation = UPDATE_PRODUCT_MUTATION(id, productData.name, productData.price, productData.stock)
      const response = await axios.post(GRAPHQL_URL, {
        query: mutation,
        variables: { id, productData }
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token to the headers as a separate object
        },
      });
      return Product.fromJSON(response.data.data.updateProduct);
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  },

  // Delete a product
  deleteProduct: async (id, token) => {
    try {
      const mutation = DELETE_PRODUCT_MUTATION(id)
      await axios.post(GRAPHQL_URL, {
        query: mutation,
        variables: { id }
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token to the headers as a separate object
        },
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  }
};
