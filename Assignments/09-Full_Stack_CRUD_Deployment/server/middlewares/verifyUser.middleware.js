const jwt = require("jsonwebtoken");
const { TokenModel } = require("../models/revoked.model");
require("dotenv").config();

const authentication = async (req, res, next) => {
  const { refreshToken } = req.require;
  const accessToken = req.headers.authorization.split(" ")[1];

  try {
    if (!refreshToken && !accessToken) throw new Error("tokens are required");

    const isTokenBlacklisted = await TokenModel.findOne({
      token: refreshToken,
    });
    if (isTokenBlacklisted) res.send({ msg: "login first" });

    const verifyAccss = jwt.verify(accessToken, process.env.secret_access);
    if (verifyAccss) next();

    const verifyRefresh = jwt.verify(refreshToken, process.env.secret_refresh);
    if (verifyRefresh) {
      const newAccessToken = jwt.sign({}, process.env.secret_access, {
        expiresIn: "1h",
      });
      res.send({ msg: "new accessToken is generated", newAccessToken });
    } else res.send({ msg: "login first" });
  } catch (error) {
    res.send({ msg: error.message, error });
  }
};

module.exports = { authentication };
