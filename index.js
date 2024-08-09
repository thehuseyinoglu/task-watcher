const express = require("express");
var bodyParser = require("body-parser");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const tasksRouter = require("./routes/task");
const roomsRouter = require("./routes/room");
require("./mongo-connection");

const app = express();

app.set("view engine", "pug");
app.use(bodyParser.json()); // gönderilen isteğin okunabilmesi için gerekli bir durum yoksa express okumuyor

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/tasks", tasksRouter);
app.use("/rooms", roomsRouter);

app.listen(3000, () => {
  console.log("started");
});
