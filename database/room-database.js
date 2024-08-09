const BaseDatabase = require("./base-database");
const Room = require("../models/room");

class RoomDatabase extends BaseDatabase {}

module.exports = new RoomDatabase(Room);
