// import axios from "axios";
// import { User } from "../models/User";

// const API_URL = "http://localhost:5000/users";

// export const UserService = {
//   getAllUsers: async () => {
//     try {
//       const response = await axios.get(API_URL);
//       return response.data.map(user => User.fromJSON(user));
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       throw error;
//     }
//   },

//   addUser: async (userData) => {
//     try {
//       const response = await axios.post(API_URL, userData);
//       return User.fromJSON(response.data);
//     } catch (error) {
//       console.error("Error adding user:", error);
//       throw error;
//     }
//   },

//   updateUser: async (id, userData) => {
//     try {
//       const response = await axios.put(`${API_URL}/${id}`, userData);
//       return User.fromJSON(response.data);
//     } catch (error) {
//       console.error("Error updating user:", error);
//       throw error;
//     }
//   },

//   deleteUser: async (id) => {
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//     } catch (error) {
//       console.error("Error deleting user:", error);
//       throw error;
//     }
//   }
// };



import axios from "axios";
import { User } from "../models/User";

// GraphQL endpoint
const GRAPHQL_URL = 'http://localhost:8020/user-svc';

// Define GraphQL queries and mutations
const GET_ALL_USERS_QUERY = `
  query Users {
    users {
        email
        id
        name
        role
    }
}
`;

const LOGIN = (email, password) => {
  const m = `
    query Login {
      login(email: "${email}", password: "${password}") {
        token
      }
    }
  `;
  return m;
};

const CREATE_USER_MUTATION = (name, email, role, password) => {
  const m = `
    mutation CreateUser {
      createUser(name: "${name}", email: "${email}", role: "${role}", password: "${password}") {
        email
        id
        name
        role
      }
    }
  `;
  return m;
};

const UPDATE_USER_MUTATION = (id, name, email, role, password) => {
  const m = `
    mutation UpdateUser {
      updateUser(id: "${id}", name: "${name}", email: "${email}", role: "${role}", password: "${password}") {
        email
        id
        name
        role
      }
    }
  `;
  return m;
};

const DELETE_USER_MUTATION = (id) => {
  const m = `
    mutation DeleteUser {
    deleteUser(id: "${id}")
  }
  `;
  return m;
};

export const UserService = {
  // Fetch all users
  getAllUsers: async (token) => {
    try {
      const response = await axios.post(GRAPHQL_URL, {
        query: GET_ALL_USERS_QUERY
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token to the headers as a separate object
        },
      });
      return response.data.data.users.map(user => User.fromJSON(user));
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  // Add a new user
  addUser: async (userData, token) => {
    try {
      const mutation = CREATE_USER_MUTATION(userData.name, userData.email, userData.role, userData.password)
      const response = await axios.post(GRAPHQL_URL, {
        query: mutation,
        variables: { userData }
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token to the headers as a separate object
        },
      });
      return User.fromJSON(response.data.data.createUser);
    } catch (error) {
      console.error("Error adding user:", error);
      throw error;
    }
  },

  // Update an existing user
  updateUser: async (id, userData, token) => {
    try {
      const mutation = UPDATE_USER_MUTATION(id, userData.name, userData.email, userData.role, userData.password)
      const response = await axios.post(GRAPHQL_URL, {
        query: mutation,
        variables: { id, userData }
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token to the headers as a separate object
        },
      });
      return User.fromJSON(response.data.data.updateUser);
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },

  // Delete a user
  deleteUser: async (id, token) => {
    try {
      const mutation = DELETE_USER_MUTATION(id)
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
      console.error("Error deleting user:", error);
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      const mutation = LOGIN(email, password)
      const response = await axios.post(GRAPHQL_URL+"/auth", {
        query: mutation
      });
      
      return response.data.data.login.token;
    } catch (error) {
      console.error("Error login:", error);
      throw error;
    }
  }
    
};
