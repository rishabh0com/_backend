const express = require("express");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/User");
const bcrypt = require("bcrypt");
const { blacklist } = require("../middleware/auth.middleware");
const dotenv = require("dotenv").config();

const authRoutes = express.Router();
/*
{
   "username" : "Laxmi12",
   "password" : "@laxmi"
} 
 */

authRoutes.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    bcrypt.hash(password, +process.env.saltRound, async function (err, hash) {
      if (err) {
        console.log(err, process.env.saltRound);
        res.send({ error: err });
      } else {
        const newUser = new UserModel({ username, password: hash });
        await newUser.save();
        // Store hash in your password DB.
        if (newUser) {
          res.status(201).send({ msg: "user is created ~" });
        } else {
          res.status(500).send({ error: "internal server error" });
        }
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error });
  }
});

authRoutes.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    console.log(user);

    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
          let token = jwt.sign(
            { username, password },
            process.env.Jwt_secret,
            {
              expiresIn: "1h",
            }
          );
          res.status(200).send({ msg: "login successful", token: token });
        } else {
          res.send({ error: err });
        }
      });
    } else {
      res.status(200).send({ msg: "wrong credential" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error });
  }
});

authRoutes.get("/logout", async (req, res) => {
  try {
    console.log(req.headers)
    let token = req.headers.authorization.split(" ")[1];
    blacklist.push(token);
    res.send({msg: "logout successful"})
  } catch (error) {
    console.log(error)
    res.status(400).send({ error: error });
  }
});

module.exports = { authRoutes };
