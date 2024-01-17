const mongoose = require("mongoose");
var validator = require("validator");

const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");

const TaskSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please provide a task name"],
    trim: true,
  },
  desc: {
    type: String,
    required: [true, "Please provide a task name"],
    trim: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Task = mongoose.model("task", TaskSchema);

module.exports = Task;
