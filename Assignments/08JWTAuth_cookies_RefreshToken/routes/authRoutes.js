const express = require("express");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/User.model")
const bcrypt = require("bcrypt");
const { auth } = require("../middlewares/verify_token");
const { RevokedToken } = require("../models/Revoked_token.model");
const dotenv = require("dotenv").config();

const authRoutes = express.Router();


authRoutes.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    bcrypt.hash(password, 15, async function (err, hash) {
      if (err) {
        // console.log(err);
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
          let token = jwt.sign({ username }, process.env.access_secret, {
            expiresIn: "1h",
          });
          let refresh_token = jwt.sign(
            { username },
            process.env.refresh_secret,
            { expiresIn: "7d" }
          );
          res
            .status(200)
            .send({ msg: "login successful", token, refresh_token });
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

// authRoutes.get("/logout", async (req, res) => {
//   try {
//     console.log(req.headers);
//     let token = req.headers.authorization.split(" ")[1];
//     blacklist.push(token);
//     res.send({ msg: "logout successful" });
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({ error: error });
//   }
// });

authRoutes.get("/logout", async (req, res) => {
  try {
    const refreshToken = req.query.refreshToken;

    // Check if the refresh token is blacklisted
    const revokedToken = await RevokedToken.findOne({ token: refreshToken });

    if (revokedToken) {
      return res.status(401).send({ message: 'Refresh token is revoked', revokedAt: revokedToken.createdAt });
    }

    // Blacklist the refresh token
    await RevokedToken.create({ token: refreshToken });

    res.status(200).send({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
})

module.exports = { authRoutes };
