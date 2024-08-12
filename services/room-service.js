const BaseService = require("./base-service");
const Room = require("../models/room");
const userService = require("./user-service");

class RoomService extends BaseService {
  async createRoom(name, ownerId) {
    const owner = await userService.find(ownerId);
    const room = await this.insert({ name, owner });
    owner.rooms.push(room);
    await owner.save();

    return room;
  }

  async addUserToRoom(roomId,userId){

    const room = await this.find(roomId)
    const user = await userService.find(userId);

    room.users.push(user)
    await room.save()

    return room

  }
}

module.exports = new RoomService(Room);
