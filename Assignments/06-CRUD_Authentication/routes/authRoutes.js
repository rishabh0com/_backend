const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv").config()

const router = express.Router();

//   {
//     "username":"xyz",
//     "password":"123"
//   }

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Replace this with actual authentication logic (e.g., check user credentials in a database)
    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(401).send({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, "engineer", {
      expiresIn: "1h",
    });

    res.send({ token: token });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
