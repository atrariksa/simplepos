import React, { useState, useEffect } from 'react';
import { UserService } from '../services/UserService';
import { jwtDecode } from 'jwt-decode'

const UserManagement = ({jwtToken}) => {
  const [users, setUsers] = useState([]);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "", password: "" });
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [editUser, setEditUser] = useState(null); // This holds the user to be edited
  const decodedToken = jwtDecode(jwtToken);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await UserService.getAllUsers(jwtToken);
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const addedUser = await UserService.addUser(newUser, jwtToken);
      setUsers([...users, addedUser]);
      setNewUser({ name: "", email: "", role: "" , password: ""});
      setIsAddingUser(false);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleEditUser = (user) => {
    setIsEditingUser(true);
    setEditUser(user); // Set the user being edited
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await UserService.updateUser(editUser.id, editUser, jwtToken);
      setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
      setIsEditingUser(false);
      setEditUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await UserService.deleteUser(id, jwtToken);
        setUsers(users.filter(user => user.id !== id));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
    
  };

  return (
    <div>
      <button
        onClick={() => setIsAddingUser(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Add User
      </button>
      <div></div>

      {/* Add User Form */}
      {isAddingUser && (
        <div className="mt-4">
          <h2 className="text-xl mb-4">Add User</h2>
          <form onSubmit={handleAddUser}>
            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="border px-2 py-1 mb-2 w-full"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="border px-2 py-1 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="Role"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="border px-2 py-1 mb-2 w-full"
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              className="border px-2 py-1 mb-2 w-full"
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Add User
            </button>
            <button
              type="button"
              onClick={() => setIsAddingUser(false)}
              className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Edit User Form */}
      {isEditingUser && (
        <div className="mt-4">
          <h2 className="text-xl mb-4">Edit User</h2>
          <form onSubmit={handleUpdateUser}>
            <input
              type="text"
              placeholder="Name"
              value={editUser.name}
              onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
              className="border px-2 py-1 mb-2 w-full"
            />
            <input
              type="email"
              placeholder="Email"
              value={editUser.email}
              onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
              className="border px-2 py-1 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="Role"
              value={editUser.role}
              onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
              className="border px-2 py-1 mb-2 w-full"
            />
            <input
              type="password"
              placeholder="Password"
              value={editUser.password}
              onChange={(e) => setEditUser({ ...editUser, password: e.target.value })}
              className="border px-2 py-1 mb-2 w-full"
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Update User
            </button>
            <button
              type="button"
              onClick={() => setIsEditingUser(false)}
              className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      <div><br></br></div>
      <div><br></br></div>
      <h2 className="text-xl mb-4">User List</h2>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2 w-48">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.id}</td>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.role}</td>
              <td className="border px-4 py-2 flex justify-end w-48">
                <button
                  onClick={() => handleEditUser(user)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                {decodedToken.id !== user.id &&
                (<button
                  onClick={() => handleDeleteUser(user.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>)
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
