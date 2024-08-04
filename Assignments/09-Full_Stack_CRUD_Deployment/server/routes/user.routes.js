const express = require("express");
const bcrypt = require("bcrypt");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
const { TokenModel } = require("../models/revoked.model");
require("dotenv").config();

const userRoutes = express.Router();

// Refresh Token get request :
userRoutes.get("/refreshToken", (req, res) => {
  const token = jwt.sign({}, process.env.secret_refresh, { expiresIn: 60 * 5 });
  res.cookie("refreshToken", token);
  res.send({ msg: "token generated" });
});

// post request to register the user :

userRoutes.post("/register", async (req, res) => {
  const { firstName, lastName, email, password, DOB } = req.body;
  console.log(req.body, req.headers);
  try {
    // hash the password
    const hashPass = bcrypt.hashSync(password, 9);
    if (!DOB) throw new Error("DOB is required");
    const formattedDate = moment(DOB).format("DD-MM-YYYY"); // used moment packeg to format date
    // console.log(formattedDate);
    const user = await UserModel.create({
      firstName,
      lastName,
      email,
      password: hashPass,
      DOB: formattedDate,
    });
    res.send({ msg: "user is created", user      });
  } catch (error) {
    console.log(error);
    res.send({ msg: error.message, error });
  }
});

// post request for login :

userRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("invalid email");

    const isPass = bcrypt.compareSync(password, user.password); // true
    if (!isPass) throw new Error("invalid password");

    const refreshToken = jwt.sign({}, process.env.secret_refresh, {
      expiresIn: 60 * 5,
    });
    const accessToken = jwt.sign({}, process.env.secret_access, {
      expiresIn: 60,
    });
    console.log(accessToken, refreshToken);
    if (!refreshToken && !accessToken) throw new Error();

    res.cookie("accessToken", accessToken);
    res.cookie("refreshToken", refreshToken);
    res.send({ msg: "user is logged in" });
  } catch (error) {
    res.send({ msg: error.message, error });
  }
});

// get request for logout :

userRoutes.get("/logout", async (req, res) => {
  const token = req.cookies.refreshToken;
  try {
    if (!token) throw new Error("token is required");

    const revokedToken = await TokenModel.findOne({ token });
    if (revokedToken) {
      res
        .status(400)
        .send({ msg: "token is revoked", revokedAt: revokedToken.createdAt });
    }

    // blacklist the token
    await TokenModel.create({ token });
    res.send({ msg: "user is logged out" });
  } catch (error) {
    res.send({ msg: error.message, error });
  }
});

module.exports = { userRoutes };

// const moment = require("moment")
// const formattedDate = moment("2029-06-03").format("DD-/MM-YYYY");
// console.log(formattedDate)
