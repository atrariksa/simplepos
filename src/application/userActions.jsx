import { UserService } from "../domain/services/UserService";

const userService = new UserService();

export const fetchUsers = () => {
  return userService.getAllUsers();
};

export const addUser = (user) => {
  userService.addUser(user);
};

export const removeUser = (id) => {
  userService.removeUser(id);
};
