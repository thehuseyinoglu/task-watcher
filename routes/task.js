const authMiddleware = require("../middlewares/auth-middleware");
const { taskService } = require("../services");
const createResponse = require("../utils/response-helper");


const router = require("express").Router();

// router.use(authMiddleware);

router.get("/", async (req, res) => {
  try {
    const tasks = await taskService.load();
    res.status(200).json(createResponse(200, "Başarılı", { tasks }));
  } catch (error) {
    res
      .status(500)
      .json(createResponse(500, "Veriler yüklenmedi", {}, [error.message]));
  }
});

router.post("/", async (req, res) => {
  // const { userId } = req.params;
  const { name, description, room, ownerId } = req.body;

  const response = await taskService.createTask(
    name,
    description,
    room,
    ownerId
  );

  res.send(response);
});

router.delete("/:taskId", async (req, res) => {
  try {
    await taskService.removeBy("_id", req.params.taskId);
    res.status(200).json(createResponse(200, "Başarılı"));
  } catch (error) {
    res
      .status(500)
      .json(createResponse(500, "İşlem başarısız oldu", {}, [error.message]));
  }
});


router.get("/:taskId", async (req, res) => {
  try {
    const task = await taskService.find(req.params.taskId);
    if (!task) {
      res.status(500).json(createResponse(500, "Veriler yüklenmedi"));
    }

    res.status(200).json(createResponse(200, "Başarılı", { task }));
  } catch (error) {
    res
      .status(500)
      .json(createResponse(500, "Veriler yüklenmedi", {}, [error.message]));
  }
});

module.exports = router;
