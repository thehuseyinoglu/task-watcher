const User = require("./models/User");
const userDatabase = require("./database/user-database");
const roomDatabase = require("./database/room-database");

async function main() {
  try {
    const berkay = await userDatabase.findBy("userName", "Berkay");
    const nagihan = await userDatabase.findBy("userName", "Nagihan");

    const room1 = await roomDatabase.findBy("name", "Room1");

    console.log(room1);
  } catch (error) {
    return console.log(error);
  }
}

main();
