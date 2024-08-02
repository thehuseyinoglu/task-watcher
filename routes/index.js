
const router = require("express").Router()

router.get("/", (req, res) => {
    //   res.sendFile(`${__dirname}/index.html`); bir html sayfası göndermeni sağlıyor
    res.render("index");
  });


  module.exports = router