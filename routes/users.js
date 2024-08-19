const authMiddleware = require("../middlewares/auth-middleware");
const createResponse = require("../utils/response-helper");
const { userService } = require("../services");

const router = require("express").Router();

// router.use(authMiddleware);
router.get("/", async (req, res) => {
  try {
    const users = await userService.load();
    res.status(200).json(createResponse(200, "Başarılı", { users }));
  } catch (error) {
    res
      .status(500)
      .json(createResponse(500, "Veriler yüklenmedi", {}, [error.message]));
  }
});

// router.get("/young-users", async (req, res) => {
//   try {
//     const users = await userService.findYoungUsers();
//     res.status(200).json(createResponse(200, "Başarılı", { users }));
//   } catch (error) {
//     res
//       .status(500)
//       .json(createResponse(500, "Veriler yüklenmedi", {}, [error.message]));
//   }
// });

router.get("/simple-name", async (req, res) => {
  try {
    const users = await userService.queryWithProjection({ rooms: 0, tasks: 0 });
    res.status(200).json(createResponse(200, "Başarılı", { users }));
  } catch (error) {
    res
      .status(500)
      .json(createResponse(500, "Veriler yüklenmedi", {}, [error.message]));
  }
});

router.delete("/:userId", async (req, res) => {
  try {
    await userService.removeBy("_id", req.params.userId);
    res.status(200).json(createResponse(200, "Başarılı"));
  } catch (error) {
    res
      .status(500)
      .json(createResponse(500, "İşlem başarısız oldu", {}, [error.message]));
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const user = await userService.find(req.params.userId);
    if (!user) {
      res.status(500).json(createResponse(500, "Veriler yüklenmedi"));
    }

    res.status(200).json(createResponse(200, "Başarılı", { user }));
  } catch (error) {
    res
      .status(500)
      .json(createResponse(500, "Veriler yüklenmedi", {}, [error.message]));
  }
});

router.patch("/:userId", async (req, res) => {
  try {
    const { name } = req.body;
    await userService.update(req.params.userId, { name });
    res.status(200).json(createResponse(200, "Başarılı"));
  } catch (error) {
    res
      .status(500)
      .json(createResponse(500, "İşlem başarısız oldu", {}, [error.message]));
  }
});

module.exports = router;
