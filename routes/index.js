let express = require("express");
let router = express.Router();

let userService = require("../user-service");

router.get("/user", (req, res, next) => {
  userService.get(req, res);
});

router.post("/user", (req, res) => {
  userService.create(req, res);
});

module.exports = router;
