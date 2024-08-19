const express = require("express");
var bodyParser = require("body-parser");
const cors = require('cors');
require('dotenv').config();



const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const tasksRouter = require("./routes/task");
const roomsRouter = require("./routes/room");
const authRouter = require("./routes/auth");
const CustomErrorHandler = require("./middlewares/error-handling-middleware");
require("./mongo-connection");

const app = express();

app.set("view engine", "pug");
app.use(bodyParser.json()); // gönderilen isteğin okunabilmesi için gerekli bir durum yoksa express okumuyor
app.use(cors());

const errorHandler = new CustomErrorHandler();
app.use((err, req, res, next) => {
  errorHandler.error(err, req, res, next);
});



app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/tasks", tasksRouter);
app.use("/rooms", roomsRouter);
app.use("/auth",authRouter)

app.listen(3000, () => {
  console.log("started");
});
