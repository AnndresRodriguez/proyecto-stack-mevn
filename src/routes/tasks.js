const express = require("express");
const router = express.Router();

const Task = require("../models/task");

router.get("/", async (req, res) => {
  const tasks = await Task.find();
});

//Almacenar tareas
router.post("/", async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.json({
    status: "Task archived"
  });
});

//Editar Tareas
router.put("/:id", async (req, res) => {
  await Task.findByIdAndUpdate(req.params.id, req.body);
  res.json({
    status: "Task updated"
  });
});

//Eliminar Tareas
router.delete("/:id", async (req, res) => {
  await Task.findByIdAndRemove(req.params.id);
  res.json({
    status: "Task removed"
  });
});

module.exports = router;
