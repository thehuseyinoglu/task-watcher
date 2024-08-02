const { userDatabase } = require("../database");

const router = require("express").Router()

router.get("/", async (req, res) => {
    const users = await userDatabase.load();
    //   res.send(flatted.stringify(users));
    res.render("users", { users }); // sayfanın render edebilmesi için gerekli bir şey
  });
  
  router.post("/", async (req, res) => {
    const user = await userDatabase.insert(req.body);
  
    res.send(user);
  });
  
  router.delete("/:userId", async (req, res) => {
    await userDatabase.removeBy("id", req.params.userId);
  
    res.send("ok");
  });
  
  router.get("/:userId", async (req, res) => {
    const user = await userDatabase.find(req.params.userId);
    if (!user) return res.status(404).send("connot find user");
    res.render("user", { user });
  });
  
  
  // router.post('/users/:userId/rooms',async()=>{
  //   const user = await userDatabase.find(req.params.userId)
  //   const addUser = await userDatabase.find(req.body.id)
  
    
  // })


  module.exports = router