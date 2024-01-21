const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config()

const authAccess = async (req, res, next) => {
  try {
    // console.log(req.headers.authorization.split(" ")[1]);
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.Jwt_secret, (err, decoded) => {
      if (err) {
        res.status(400).send({ err: err });
      } else {
        console.log(decoded);
        next();
      }
    });
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

module.exports = { authAccess };
