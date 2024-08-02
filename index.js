const express = require("express");
var bodyParser = require("body-parser");

const usersRouter = require("./routes/users")
const indexRouter = require("./routes/index")
require("./mongo-connection")

const app = express();

app.set("view engine", "pug");
app.use(bodyParser.json()); // gönderilen isteğin okunabilmesi için gerekli bir durum yoksa express okumuyor

app.use("/users",usersRouter)
app.use("/",indexRouter)



app.listen(3000, () => {
  console.log("started");
});
