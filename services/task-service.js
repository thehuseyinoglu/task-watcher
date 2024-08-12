const BaseService = require("./base-service");
const Task = require("../models/task");
const userService = require("./user-service");
const roomService = require("./room-service");

class TaskService extends BaseService {
    async createTask(name, description, roomId, ownerId) {
        const taskOwner = await userService.find(ownerId);
        const room = await roomService.find(roomId);
        const task = await this.insert({
          name,
          description,
          room,
          taskOwner,
        });
        taskOwner.tasks.push(task);
        await taskOwner.save();
    
        return task;
      }
}

module.exports = new TaskService(Task);
