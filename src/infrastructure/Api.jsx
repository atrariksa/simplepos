export const fetchUsersFromApi = () => {
    return new Promise((resolve) => {
      resolve([
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
      ]);
    });
  };
  
export const fetchProductsFromApi = () => {
    return new Promise((resolve) => {
        resolve([
        { id: 1, name: 'Laptop', price: 1200 },
        { id: 2, name: 'Smartphone', price: 700 },
        ]);
    });
};
