const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  rooms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:'Room',
      autopopulate:true
    }
  ],
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:'Task',
      autopopulate: {maxDepth:1},
    }
  ],
});


UserSchema.plugin(require('mongoose-autopopulate'));


module.exports = mongoose.model("User", UserSchema);
