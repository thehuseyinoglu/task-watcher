const BaseService = require("./base-service");
const Room = require("../models/room");
const userService = require("./user-service");
const apiResponse = require("../utils/apiResponse");

class RoomService extends BaseService {
  async createRoom(name, ownerId, color) {
    try {
      const owner = await userService.find(ownerId);

      if (!owner) {
        return apiResponse.error("Kullanıcı bulunamadı", 400);
      }

      const room = await this.insert({ name, owner, color });

      room.users.push(owner);
      await room.save();

      owner.rooms.push(room);
      await owner.save();

      return apiResponse.success("Oda eklendi").setData({ room: room });
    } catch (err) {
      return apiResponse.error(err.message, 500);
    }
  }

  async addUserToRoom(roomId, userId) {
    try {
      const room = await this.find(roomId);
      const user = await userService.find(userId);

      if (room.users.some((item) => item._id.toString() == user._id)) {
        return apiResponse.error("Kullanıcı zaten odada kayıtlı ", 500);
      }

      if (!user || !room) {
        return apiResponse.error("Kişi veya oda bulunamadı", 500);
      }

      room.users.push(user);
      user.rooms.push(room);

      await user.save();
      await room.save();

      return apiResponse
        .success("Kullanıcı odaya eklendi")
        .setData({ room: room });
    } catch (err) {
      return apiResponse.error(err.message, 500);
    }
  }
}

module.exports = new RoomService(Room);
