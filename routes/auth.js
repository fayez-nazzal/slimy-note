const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get("/login/:provider", (req, res) => {
  if ("user" in req) {
    console.log("user here");
    res.redirect("/");
  } else {
    console.log("no user");
    res.redirect(`/auth/${req.params.provider}`);
  }
});

router.get("/logout", (req, res) => {});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.redirect("/");
});

module.exports = router;
