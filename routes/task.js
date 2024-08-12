const { taskService } = require("../services");

const router = require("express").Router();

router.get("/", async (req, res) => {
  const tasks = await taskService.load();
  res.render("tasks", { tasks });
});

router.post("/", async (req, res) => {
  // const { userId } = req.params;
  const { name, description, room, ownerId } = req.body;

  const task = await taskService.createTask(name, description, room, ownerId);

  res.send(task);
});

router.get("/search", async (req, res) => {
  const name = req.query.name;
  const description = req.query.description;
  
  const query = {};
  if (name) query.name = name;
  if (description) query.description = description;

  const tasks = await taskService.query(query);

  res.send(tasks);
});

router.delete("/:taskId", async (req,res) => {
  await taskService.removeBy("_id", req.params.taskId);

  res.send("ok");
});

router.get("/:taskId", async (req, res) => {
  const task = await taskService.find(req.params.taskId);
  if (!task) return res.status(404).send("connot find user");
  res.render("task", { task });
});

module.exports = router;
