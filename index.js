const User = require("./models/User");
const userDatabase = require("./database/user-database");
const roomDatabase = require("./database/room-database");

const berkay = userDatabase.findBy("userName", "Berkay");
const nagihan = userDatabase.findBy("userName", "Nagihan");

const room1 = roomDatabase.findBy("name", "Room1");

room1.addUser(nagihan);

roomDatabase.update(room1);

console.log(room1);
