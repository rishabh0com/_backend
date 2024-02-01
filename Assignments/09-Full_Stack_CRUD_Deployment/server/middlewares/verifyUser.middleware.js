const jwt = require("jsonwebtoken");
const { TokenModel } = require("../models/revoked.model");
require("dotenv").config();

const authentication = async (req, res, next) => {
  // console.log(req.cookies);
  const { refreshToken, accessToken } = req.cookies;
  // const accessToken = req.headers.authorization.split(" ")[1];

  try {
    if (!refreshToken && !accessToken) throw new Error("tokens are required");

    const isTokenBlacklisted = await TokenModel.findOne({
      token: refreshToken,
    });
    if (isTokenBlacklisted) throw new Error("login first");

    jwt.verify(accessToken, process.env.secret_access, (err, decoded) => {
      if (decoded) {
        // console.log(decoded);
        next();
      } else if (err.message == "jwt expired") {
        const verifyRefresh = jwt.verify(
          refreshToken,
          process.env.secret_refresh
        );
        if (verifyRefresh) {
          const newAccessToken = jwt.sign({}, process.env.secret_access, {
            expiresIn: 60,
          });
          res.cookie("accessToken", newAccessToken);
          res.send({ msg: "new accessToken is generated" });
        } else res.send({ msg: "login first" });
      }
    });
    // console.log(verifyAccss)
    // if (verifyAccss) {
    //   console.log(verifyAccss);
    //   req.payload = verifyAccss;
    //   next();
    // } else {
    //   console.log("In refresh")
    //   const verifyRefresh = jwt.verify(
    //     refreshToken,
    //     process.env.secret_refresh
    //   );
    //   if (verifyRefresh) {
    //     const newAccessToken = jwt.sign({}, process.env.secret_access, {
    //       expiresIn: 60,
    //     });
    //     res.cookie("newAccessToken", newAccessToken);
    //     res.send({ msg: "new accessToken is generated",newAccessToken });
    //   } else res.send({ msg: "login first" });
    // }
  } catch (error) {
    res.send({ msg: error.message, error });
  }
};

module.exports = { authentication };
