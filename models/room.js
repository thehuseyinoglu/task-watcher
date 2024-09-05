const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  name: { type: String, required: true, minlegth: 3 },
  color: { type: String },
  owner: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    autopopulate: { maxDepth: 3 },
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
RoomSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

RoomSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("Room", RoomSchema);
