const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  name: { type: String, required: true, minlegth: 3 },
  owner: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    autopopulate: { maxDepth: 1 },
  },
  users: [{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    autopopulate: { maxDepth: 2 },
  }],
  tasks: [
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Task',
      autopopulate: { maxDepth: 2 },
    }
  ],
});

RoomSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("Room", RoomSchema);
