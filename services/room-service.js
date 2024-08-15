const BaseService = require("./base-service");
const Room = require("../models/room");
const userService = require("./user-service");

class RoomService extends BaseService {
  async createRoom(name, ownerId) {
    try {
      const owner = await userService.find(ownerId);

      if (!owner || !room) {
        return {
          errors: [],
          stack: "",
          message: "Kişi bulunamadı",
          success: false,
          status: 500,
        };
      }

      const room = await this.insert({ name, owner });

      owner.rooms.push(room);
      await owner.save();

      return {
        errors: [],
        stack: "",
        message: "Oda eklendi",
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

  async addUserToRoom(roomId, userId) {
    try {
      const room = await this.find(roomId);
      const user = await userService.find(userId);

      if (!user || !room) {
        return {
          errors: [],
          stack: "",
          message: "Kişi veya oda bulunamadı",
          success: false,
          status: 500,
        };
      }

      room.users.push(user);
      await room.save();
      return {
        errors: [],
        stack: "",
        message: "Oda eklendi",
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

module.exports = new RoomService(Room);
