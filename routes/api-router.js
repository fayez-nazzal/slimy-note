const express = require("express");
const User = require("../models/user-model");
const router = express.Router();

router.get("/notebooks", (req, res) => {
  if ("user" in req) {
    console.log("found");
    res.json(req.user);
  } else {
    console.log(req.user);
    res.redirect(`/login`);
  }
});

router.put("/notebooks", (req, res) => {
  const user = req.user;
  user.notebooks = req.body;
  user.save();
  console.log(user);
  res.json(user);
});

router.delete("/delall", (req, res) => {
  console.log("deleting every user");
  User.deleteMany({}).then(() => {
    res.json("success");
  });
});
module.exports = router;
