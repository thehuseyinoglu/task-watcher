const { taskDatabase } = require("../database");

const router = require("express").Router();

router.get("/", async (req, res) => {
  const tasks = await taskDatabase.load();
  res.send(tasks);
});

router.post("/", async (req, res) => {
  const task = await taskDatabase.insert(req.body);

  res.send(task);
});

router.delete("/:taskId", async () => {
  await taskDatabase.removeBy("_id", req.params.userId);

  res.send("ok");
});

router.get("/:taskId",async(req,res)=>{
    const task = taskDatabase.find(req.params.taskId)
    if(!task)return res.status(404).send("connot find user");
})

module.exports = router;
