export class User {
  constructor(id, name, email, role) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
  }

  static fromJSON(data) {
    return new User(data.id, data.name, data.email, data.role);
  }
}