const { roomDatabase } = require("../database");

const router = require("express").Router();

router.get("/", async (req, res) => {
  const rooms = await roomDatabase.load()

  res.render("rooms", { rooms });
});

router.post("/", async (req, res) => {
  const room = await roomDatabase.insert(req.body);

  res.send(room);
});

router.delete("/:roomId", async (req, res) => {
  await roomDatabase.removeBy("_id", req.params.roomId);
  res.send("ok");
});

router.get("/:roomId", async (req, res) => {
  const room = await roomDatabase.find(req.params.roomId);
  if (!room) return res.status(404).send("connot find room");
  res.render("room", { room });
});

module.exports = router;
