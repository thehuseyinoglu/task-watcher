const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
  name: String,
  description: String,
  room: {},
  taskOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    autopopulate: {maxDepth:
    1},
  },
});

module.exports = mongoose.model("Task", TaskSchema);
