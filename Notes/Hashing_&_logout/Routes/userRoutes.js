const express = require("express");
const { UserModel } = require("../models/User");
const jwt = require("jsonwebtoken");
const { authAccess } = require("../middleware/auth.middleware");

const userRoutes = express.Router();

// get all users list
userRoutes.get("/",authAccess, async (req, res) => {
  try {
    const users = await UserModel.find();
    if (users) {
      res.status(200).send({ all_users: users });
    }
  } catch (error) {}
});

// export the router
module.exports = { userRoutes };

/* 
{
   "username" : "Ram11",
   "password" : "@sita"
} 
*/
