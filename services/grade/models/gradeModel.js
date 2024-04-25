const mongoose = require("mongoose");

const gradeSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  score: {
    type: String,
    required: true,
  },
  examName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Grade = mongoose.model("Grade", gradeSchema);

module.exports = Grade;
