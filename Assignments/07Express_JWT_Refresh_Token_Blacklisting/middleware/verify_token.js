const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const auth = async (req, res, next) => {
  try {
    let access_token = req.headers.authorization.split(" ")[0];
    let refresh_token = req.headers.authorization.split(" ")[1];
    console.log(access_token);
    jwt.verify(
      access_token,
      process.env.access_secret,
      async (err, decoded) => {
        if (!err) {
          next();
        } else {
          jwt.verify(
            refresh_token,
            process.env.refresh_secret,
            (err, decoded) => {
              if (!err) {
                let new_access_token = jwt.sign({}, process.env.access_secret,{expiresIn:40});
                res.send({ new_access_token });
              } else {
                res.send("login again..");
              }
            });
        }
      });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
};

module.exports = { auth };
