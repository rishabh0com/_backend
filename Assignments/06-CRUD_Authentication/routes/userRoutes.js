const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const newUser = User({username, password});
  try {
    await newUser.save();
    res.send({ msg: "user is created" });
  } catch (error) {
    res.send({ error: error });
  }
});

module.exports = router;
