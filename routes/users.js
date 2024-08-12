const { userService } = require("../services");

const router = require("express").Router();

router.get("/", async (req, res) => {
  const users = await userService.load();

  res.render("users", { users }); // sayfanın render edebilmesi için gerekli bir şey
});

router.get("/young-users", async (req, res) => {
  const users = await userService.findYoungUsers();
  res.render("users", { users });
});

router.get("/simple-name", async (req, res) => {
  const users = await userService.queryWithProjection({ rooms: 0, tasks: 0 });
  res.send(users);
});

router.post("/", async (req, res) => {
  const user = await userService.insert(req.body);

  res.send(user);
});

router.delete("/:userId", async (req, res) => {
  await userService.removeBy("_id", req.params.userId);

  res.send("ok");
});

router.get("/:userId", async (req, res) => {
  const user = await userService.find(req.params.userId);

  if (!user) return res.status(404).send("connot find user");
  res.render("user", { user });
});

router.patch("/:userId", async (req, res) => {
  const { name } = req.body;

  await userService.update(req.params.userId, { name });
});

router.post("/:userId/task", async (req, res) => {
  const { userId } = req.params;
  const { name, description, room, ownerId } = req.body;

  const task = await userService.createTask(name, description, room, ownerId);

  res.send(task);
});

router.post("/:userId/rooms", async (req, res) => {
  const { name } = req.body;
  const userId = req.params.userId;

  const room = await userService.createRoom(name, userId);
  res.send(room);
});

module.exports = router;
