const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
  name: {type:String,required:true, minLength:3},
  description: {type:String},
  room: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Room",
    autopopulate: { maxDepth: 2 },
  },
  taskOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    autopopulate: { maxDepth: 1 },
  },
});



TaskSchema.plugin(require("mongoose-autopopulate"));


module.exports = mongoose.model("Task", TaskSchema);
