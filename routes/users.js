const { userDatabase } = require("../database");

const router = require("express").Router();

router.get("/", async (req, res) => {
  const users = await userDatabase.load();
  res.render("users", { users }); // sayfanın render edebilmesi için gerekli bir şey
});

router.post("/", async (req, res) => {
  const user = await userDatabase.insert(req.body);

  res.send(user);
});

router.delete("/:userId", async (req, res) => {
  await userDatabase.removeBy("_id", req.params.userId);

  res.send("ok");
});

router.get("/:userId", async (req, res) => {
  const user = await userDatabase.find(req.params.userId);

  console.log(user)
  if (!user) return res.status(404).send("connot find user");
  res.render("user", { user });
});

router.patch("/:userId", async (req, res) => {
  const { name } = req.body;

  await userDatabase.update(req.params.userId, { name });
});

router.post("/:userId/task", async (req, res) => {
  const { userId } = req.params;
  const { name, description, room, ownerId } = req.body;

  const task = await userDatabase.createTask(
    name, description, room, ownerId
  );

  res.send(task);
});

module.exports = router;
