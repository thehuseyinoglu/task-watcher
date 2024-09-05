const { authService } = require("../services");

const router = require("express").Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const response = await authService.login(email, password);

  res.send(response);
});

router.post("/register", async (req, res) => {
  const { name, email, age, password } = req.body;

  const response = await authService.register(name, email, age, password);
  res.send(response);
});

module.exports = router;
