const router = require("express").Router();
const { Event, User } = require("../models");
const path = require("path");

router.get("/", async (req, res) => {
  console.log("GET /");

  console.log(__dirname + "/../public/home.html");
  res.sendFile(path.join(__dirname + "/../public/home.html"));
  console.log("its working");
});

module.exports = router;