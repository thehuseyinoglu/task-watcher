const authMiddleware = require("../middlewares/auth-middleware");
const createResponse = require("../utils/response-helper");
const { userService, taskService, roomService } = require("../services");
const apiResponse = require("../utils/apiResponse");

const router = require("express").Router();

router.use(authMiddleware);

router.get("/", async (req, res) => {
  try {
    const users = await userService.load();
    res.send(apiResponse.success().setData(users));
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

router.put("/", async (req, res) => {
  const { name, email, oldPassword, newPassword } = req.body;
  const userId = req.userId;

  console.log("req.body", req.body);

  const response = await userService.editProfile(
    name,
    email,
    oldPassword,
    newPassword,
    userId
  );
  res.send(response);
});

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
router.get("/profile", async (req, res) => {
  try {
    const user = await userService.find(req.userId);
    if (!user) {
      res.status(200).json(createResponse(500, "Veriler yüklenmedi"));
    }

    res.send(apiResponse.success().setData(user));
  } catch (error) {
    res
      .status(200)
      .json(createResponse(500, "Veriler yüklenmedi", {}, [error.message]));
  }
});

router.get("/tasks", async (req, res) => {
  try {
    const user = await userService.find(req.userId);
    const tasks = await taskService.query({ taskOwner: user });

    res.send(apiResponse.success().setData(tasks));
  } catch (error) {
    res
      .status(500)
      .json(createResponse(500, error.message, {}, [error.message]));
  }
});

router.get("/rooms", async (req, res) => {
  try {
    const user = await userService.find(req.userId);
    // const rooms = await roomService.query({ owner: user });
    const rooms = await roomService.query({ users: { $in: [user._id] } });

    res.send(apiResponse.success().setData(rooms));
  } catch (error) {
    res
      .status(500)
      .json(createResponse(500, error.message, {}, [error.message]));
  }
});

router.put("/profile-photo", async (req, res) => {
  try {
    const { image } = req.body;
    const userId = req.userId;

    await userService.update(userId, { profilePhoto: image });
    res.send(apiResponse.success());
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json(createResponse(500, error.message, {}, [error.message]));
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
      res.status(200).json(createResponse(500, "Veriler yüklenmedi"));
    }

    res.send(apiResponse.success().setData(user));
  } catch (error) {
    res
      .status(200)
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
