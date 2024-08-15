const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
  },
  age: {
    type: Number,
    required: false,
    min: 10,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  rooms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      autopopulate: { maxDepth: 1 },
    },
  ],
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      autopopulate: { maxDepth: 2 },
    },
  ],
});

UserSchema.plugin(require("mongoose-autopopulate"));

module.exports = mongoose.model("User", UserSchema);
