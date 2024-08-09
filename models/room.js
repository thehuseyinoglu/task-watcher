const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  name: String,
  owner: String,
  users: [],
  tasks:[]
});

module.exports = mongoose.model("Room", RoomSchema);