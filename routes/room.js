const authMiddleware = require("../middlewares/auth-middleware");
const { roomService } = require("../services");
const createResponse = require("../utils/response-helper");

const router = require("express").Router();

// router.use(authMiddleware);

router.get("/", async (req, res) => {
  try {
    const rooms = await roomService.load();
    res.send(rooms)
  } catch (error) {
    res.send(error);
  }
});

router.post("/", async (req, res) => {
  const { name, ownerId, color } = req.body;
  const response = await roomService.createRoom(name, ownerId, color);

  res.send(response);
});

router.post("/add-user", async (req, res) => {
  const { roomId, userId } = req.body;
  const response = await roomService.addUserToRoom(roomId, userId);

  res.send(response);
});

router.delete("/:roomId", async (req, res) => {
  try {
    await roomService.removeBy("_id", req.params.roomId);
    res.status(200).json(createResponse(200, "Başarılı"));
  } catch (error) {
    res
      .status(500)
      .json(createResponse(500, "İşlem başarısız oldu", {}, [error.message]));
  }
});

router.get("/:roomId", async (req, res) => {
  try {
    const room = await roomService.find(req.params.roomId);
    if (!room) {
      res.status(500).json(createResponse(500, "Veriler yüklenmedi"));
    }

    res.status(200).json(createResponse(200, "Başarılı", { room }));
  } catch (error) {
    res
      .status(500)
      .json(createResponse(500, "Veriler yüklenmedi", {}, [error.message]));
  }
});

router.patch("/:roomId", async (req, res) => {
  try {
    const { name } = req.body;
    await roomService.update(req.params.roomId, { name });
    res.status(200).json(createResponse(200, "Başarılı"));
  } catch (error) {
    res
      .status(500)
      .json(createResponse(500, "İşlem başarısız oldu", {}, [error.message]));
  }
});

module.exports = router;
