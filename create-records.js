const User = require("./models/User");
const Room = require("./models/room");
const userService = require("./services/user-service");
const roomDataBase = require("./services/room-service");

const berkay = new User(undefined, "Berkay");
const nagihan = new User(undefined, "Nagihan");
const room1 = new Room(undefined, "Room1", berkay);

room1.addUser(nagihan);

async function main() {
  try {
    await userService.save([berkay, nagihan]);

    await roomDataBase.save([room1]);

    await roomDataBase.update(room1);
  } catch (e) {
    return console.log(e);
  }
}

main();
