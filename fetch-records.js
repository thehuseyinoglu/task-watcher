const User = require("./models/User");
const userService = require("./services/user-service");
const roomService = require("./services/room-service");

async function main() {
  try {
    const berkay = await userService.findBy("userName", "Berkay");
    const nagihan = await userService.findBy("userName", "Nagihan");

    const room1 = await roomService.findBy("name", "Room1");

    console.log(room1);
  } catch (error) {
    return console.log(error);
  }
}

main();
