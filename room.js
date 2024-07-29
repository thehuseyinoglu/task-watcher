const uuid = require("uuid");

class Room {
  constructor(id = uuid.v4(), name, roomAdmin, users = []) {
    this.id = id;
    this.name = name;
    this.roomAdmin = roomAdmin;
    this.users = users;
  }
  addUser(user) {
    this.users.push(user);
  }

  static create({ id, name, roomAdmin, users }) {
    return new Room(id, name, roomAdmin, users);
  }
}
module.exports = Room;
