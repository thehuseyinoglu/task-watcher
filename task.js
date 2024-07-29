const uuid = require("uuid");

class Task {
  constructor(id = uuid.v4(), taskTitle, room, taskOwner, taskDescription) {
    this.id = id;
    this.taskTitle = taskTitle;
    this.room = room;
    this.taskOwner = taskOwner;
    this.taskDescription = taskDescription;
  }

  static create({ id, taskTitle, room, taskOwner, taskDescription }) {
    return new Task(id, taskTitle, room, taskOwner, taskDescription);
  }
}
module.exports = Task;
