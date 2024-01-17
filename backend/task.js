const express = require("express");
const Task = require("./taskModel");
const router = express.Router();
const auth = require("./middleware/auth");
const mongoose = require("mongoose");

// router.get("/task", async (req, res) => {
//   try {
//     const allTasks = await Task.find().exec();
//     res.send(allTasks);
//   } catch (error) {
//     res.status(500).send({ error: "Internal Server Error" });
//   }
// });
router.post("/create", auth, async (req, res) => {
  const { title, desc } = req.body;

  const userId = req.user._id;

  if (!title || !desc) {
    res.status(400).json({ message: "pls enter both title n desc" });
  }
  try {
    const newTask = new Task({ title, desc, creator: userId });
    await newTask.save();
    res.status(200).json({ success: "task created succesffuly" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/task", auth, async (req, res) => {
  const userId = req.user._id;

  if (!userId) {
    return res.status(401).json({ message: "You are not logged in." });
  }

  try {
    const userTasks = await Task.find({ creator: userId });
    res.status(200).json(userTasks);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/delete/:id", auth, async (req, res) => {
  const taskID = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(taskID)) {
    return res.status(400).send("Invalid task ID");
  }
  try {
    const taskToDelete = await Task.findOne({
      _id: taskID,
      creator: req.user._id,
    });
    //console.log("task to delee", taskToDelete);

    if (!taskToDelete) {
      return res.status(404).send("Task not found or unauthorized");
    }

    await Task.findOneAndDelete({ _id: taskID });
    res.status(200).json({ success: "Task deleted successfully" });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.patch("/update/:id", auth, async (req, res) => {
  const taskId = req.params.id;
  const updates = Object.keys(req.body);

  try {
    const taskToUpdate = await Task.findOne({
      _id: taskId,
      creator: req.user.id,
    });

    if (!taskToUpdate) {
      return res.status(404).send("The task with the given id was not found");
    }

    updates.forEach((update) => {
      taskToUpdate[update] = req.body[update];
    });

    await taskToUpdate.save();
    res.status(200).send(taskToUpdate);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
