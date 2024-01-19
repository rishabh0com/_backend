const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, "engineer", (err, decoded) => {
      if (decoded) {
        console.log(decoded);
        next();
      } else {
        res.status(400).send({ error: err });
      }
    });
  } catch (error) {}
};

module.exports = authMiddleware;
