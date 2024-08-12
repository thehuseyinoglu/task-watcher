const { roomService } = require("../services");

const router = require("express").Router();

router.get("/", async (req, res) => {
  const rooms = await roomService.load();

  res.render("rooms", { rooms });
});

router.post("/", async (req, res) => {
  const { name, ownerId} = req.body;
  const room = await roomService.createRoom(name, ownerId);
  res.send(room);
});

router.post("/add-user",async(req,res)=>{
  const {roomId,userId} = req.body
  await roomService.addUserToRoom(roomId,userId)

  res.send('ok')
})

router.delete("/:roomId", async (req, res) => {
  await roomService.removeBy("_id", req.params.roomId); 
  res.send("ok");
});

router.get("/:roomId", async (req, res) => {
  const room = await roomService.find(req.params.roomId);
  if (!room) return res.status(404).send("connot find room");
  res.render("room", { room });
});

router.patch("/:roomId", async (req, res) => {
  const { name } = req.body;

  await roomService.update(req.params.roomId, { name });
});

module.exports = router;
