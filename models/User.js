const Room = require("../models/room");
const uuid = require("uuid");

class User {
  constructor(id = uuid.v4(), userName, rooms = [], tasks = []) {
    this.id = id;
    this.userName = userName;
    this.rooms = rooms;
    this.tasks = tasks;
  }
  createRoom(name) {
    const room = new Room(name, this);
    this.rooms.push(room);
  }

  static create({id, userName, rooms, tasks}) {
    return new User(id, userName, rooms, tasks);
  }
}

module.exports = User;
