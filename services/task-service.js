const BaseService = require("./base-service");
const Task = require("../models/task");
const userService = require("./user-service");
const roomService = require("./room-service");

class TaskService extends BaseService {
  async createTask(name, description, roomId, ownerId) {
    try {
      const taskOwner = await userService.find(ownerId);
      const room = await roomService.find(roomId);

      if (!taskOwner || !room) {
        return {
          errors: [],
          stack: "",
          message: "Task sahibi ve oda seçiniz",
          success: false,
          status: 500,
        };
      }

      const task = await this.insert({
        name,
        description,
        room,
        taskOwner,
      });
      taskOwner.tasks.push(task);
      await taskOwner.save();

      return {
        errors: [],
        stack: "",
        message: "Task eklendi",
        success: true,
        status: 200,
        data: {
          task,
        },
      };
    } catch (err) {
      return {
        errors: [],
        stack: "",
        message: err.message,
        success: false,
        status: 500,
      };
    }
  }
}

module.exports = new TaskService(Task);
