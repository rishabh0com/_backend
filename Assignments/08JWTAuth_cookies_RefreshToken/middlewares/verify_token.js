const jwt = require("jsonwebtoken");
const { RevokedToken } = require("../models/Revoked_token.model");
const dotenv = require("dotenv").config();

const auth = async (req, res, next) => {
  try {
    let access_token = req.headers.authorization.split(" ")[1];
    let refresh_token = req.query.refreshToken;
    const isTokenRevoked = await RevokedToken.findOne({ token: refresh_token });
    if (isTokenRevoked) {
      return res
        .status(401)
        .send({
          message: "Refresh token is revoked , Please Login Again~",
          revokedAt: isTokenRevoked.createdAt,
        });
    }
    // console.log(access_token);
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
                let new_access_token = jwt.sign({}, process.env.access_secret, {
                  expiresIn: 40,
                });
                res.send({ new_access_token });
              } else {
                res.send("login again..");
              }
            }
          );
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
};

module.exports = { auth };
