const BaseService = require("./base-service");
const Task = require("../models/task");
const userService = require("./user-service");
const roomService = require("./room-service");
const apiResponse = require("../utils/apiResponse");


class TaskService extends BaseService {
  async createTask(name, description, roomId, ownerId) {
    try {
      const taskOwner = await userService.find(ownerId);
      const room = await roomService.find(roomId);

      if (!taskOwner || !room) {
        return apiResponse.error("Task sahibi ve oda seçiniz", 400);
      }


      if(!room.users?.some((item)=>item.id == taskOwner.id)){
        return apiResponse.error("Kullanıcı bu odada değil", 400);
      }

      const task = await this.insert({
        name,
        description,
        room,
        taskOwner,
      });
      taskOwner.tasks.push(task);
      await taskOwner.save();

      return apiResponse.success("Task eklendi").setData({ room: room });
    } catch (err) {
      return apiResponse.error(err.message, 500);
    }
  }
}

module.exports = new TaskService(Task);
