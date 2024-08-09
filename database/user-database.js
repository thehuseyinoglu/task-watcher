const BaseDatabase = require("./base-database");
const User = require("../models/User");
const TaskDatabase = require("./task-database")

class UserDatabase extends BaseDatabase {
    //modeller birbirleriyle iletişim olmamalılar ama databaseler birbirleriyle bağlantılı olabilirler
  async createTask(name, description, room, ownerId) {
    const taskOwner = await this.find(ownerId)
    const task = await TaskDatabase.insert({ name, description, room, taskOwner });
    taskOwner.tasks.push(task);
    await taskOwner.save();

    return task;
  }
}

module.exports = new UserDatabase(User);
