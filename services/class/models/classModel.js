const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  professor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  studentIds: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
});

const Class = mongoose.model("Class", classSchema);

module.exports = Class;
