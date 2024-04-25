const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  schedule: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  professorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Professor",
    required: true,
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
