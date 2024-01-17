const authAccess = async (req, res, next) => {
  try {
    const role = "admin";
    const pass = "admin@01";
    if (req.query.role == role && req.query.pass == pass) {
      next();
    } else {
      res.status(400).send({ msg: "Enter valid credentials ~" });
    }
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

module.exports = { authAccess };
