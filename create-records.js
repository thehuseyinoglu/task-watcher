const User = require("./models/User");
const Room = require("./models/room");
const userDatabase = require("./database/user-database");
const roomDataBase = require("./database/room-database");

const berkay = new User(undefined, "Berkay");
const nagihan = new User(undefined, "Nagihan");
const room1 = new Room(undefined, "Room1", berkay);

room1.addUser(nagihan);

async function main() {
  try {
    await userDatabase.save([berkay, nagihan]);

    await roomDataBase.save([room1]);

    await roomDataBase.update(room1);
  } catch (e) {
    return console.log(e);
  }
}

main();
