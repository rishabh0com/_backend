const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

// for logout
const blacklist = [];

const authAccess = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(blacklist)
    if (!blacklist.includes(token)) {
      // console.log(req.headers.authorization.split(" ")[1]);
      jwt.verify(token, process.env.Jwt_secret, (err, decoded) => {
        if (err) {
          res.status(400).send({ err: err });
        } else {
          console.log(decoded);
          next();
        }
      });
    } else {
      res.send({ msg: "login first" });
    }
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

module.exports = { authAccess, blacklist };
