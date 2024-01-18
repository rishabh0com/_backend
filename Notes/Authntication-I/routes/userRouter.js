const express = require("express");
const { UserModel } = require("../models/userModel");
const jwt = require("jsonwebtoken");

const userRoutes = express.Router();

// post request for registring the user :
userRoutes.post("/register", async (req, res) => {
  try {
    const newUser = new UserModel(req.body);
    await newUser.save();
    res.status(200).send({ msg: "user has registered ~", user: newUser });
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

// let token = jwt.sign({key:value}, "secret key")
/* 
  where :
   {key : 'value'} -> payload
   key -> whatever you give 
   value -> whateve you give in payload
   secret key -> whatever you give , you remember it when you decode 
*/

// post request for loggin in the user :
userRoutes.post("/login", async (req, res) => {
  // for login -> email && password
  const { email, password } = req.body;
  try {
    const findUser = await UserModel.findOne({ email, password });
    if (findUser) {
      let token = jwt.sign({ field: "web_dev" }, "engineer"); // generate the token for authentication

      res.send({ msg: "user has logged in ~", token: token });
    } else {
      res.status(200).send({ msg: "register first or wrong credentials ~" });
    }
  } catch (error) {
    res.status(400).send({ error, error });
  }
});

module.exports = { userRoutes };
