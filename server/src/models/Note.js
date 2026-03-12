const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  roomCode: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    default: "",
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Note", noteSchema);
