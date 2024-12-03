import React, { useState, useEffect } from 'react';
import { ProductService } from '../services/ProductService';

const ProductManagement = ({jwtToken}) => {
  const [products, setProducts] = useState([]);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", stock: "" });
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [editProduct, setEditProduct] = useState(null); // This holds the product to be edited

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await ProductService.getAllProducts(jwtToken);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const addedProduct = await ProductService.addProduct(newProduct, jwtToken);
      setProducts([...products, addedProduct]);
      setNewProduct({ name: "", price: "", stock: "" });
      setIsAddingProduct(false);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleEditProduct = (product) => {
    setIsEditingProduct(true);
    setEditProduct(product); // Set the product being edited
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = await ProductService.updateProduct(editProduct.id, editProduct, jwtToken);
      setProducts(products.map(product => product.id === updatedProduct.id ? updatedProduct : product));
      setIsEditingProduct(false);
      setEditProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await ProductService.deleteProduct(id, jwtToken);
        setProducts(products.filter(product => product.id !== id));
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsAddingProduct(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Add Product
      </button>
      <div></div>

      {/* Add Product Form */}
      {isAddingProduct && (
        <div className="mt-4">
          <h2 className="text-xl mb-4">Add Product</h2>
          <form onSubmit={handleAddProduct}>
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="border px-2 py-1 mb-2 w-full"
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              className="border px-2 py-1 mb-2 w-full"
            />
            <input
              type="number"
              placeholder="Stock"
              value={newProduct.stock}
              onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
              className="border px-2 py-1 mb-2 w-full"
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Add Product
            </button>
            <button
              type="button"
              onClick={() => setIsAddingProduct(false)}
              className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Edit Product Form */}
      {isEditingProduct && (
        <div className="mt-4">
          <h2 className="text-xl mb-4">Edit Product</h2>
          <form onSubmit={handleUpdateProduct}>
            <input
              type="text"
              placeholder="Product Name"
              value={editProduct.name}
              onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
              className="border px-2 py-1 mb-2 w-full"
            />
            <input
              type="number"
              placeholder="Price"
              value={editProduct.price}
              onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
              className="border px-2 py-1 mb-2 w-full"
            />
            <input
              type="number"
              placeholder="Stock"
              value={editProduct.stock}
              onChange={(e) => setEditProduct({ ...editProduct, stock: e.target.value })}
              className="border px-2 py-1 mb-2 w-full"
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Update Product
            </button>
            <button
              type="button"
              onClick={() => setIsEditingProduct(false)}
              className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      <div><br></br></div>
      <div><br></br></div>
      <h2 className="text-xl mb-4">Product List</h2>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Stock</th>
            <th className="px-4 py-2 w-48">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="border px-4 py-2">{product.id}</td>
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">{product.price}</td>
              <td className="border px-4 py-2">{product.stock}</td>
              <td className="border px-4 py-2 flex justify-end w-48">
                <button
                  onClick={() => handleEditProduct(product)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagement;
