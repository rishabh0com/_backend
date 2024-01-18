const jwt = require("jsonwebtoken");

const authUser = async (req, res, next) => {
  const { token } = req.query;
  try {
    jwt.verify(token, "engineer", function (err, decoded) { // authenticate generated token 
      // console.log(decoded); //
      if (decoded) {
        next();
      } else {
        res.status(400).send({ error: err });
      }
    });
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

module.exports = { authUser };

/* 
jwt.verify(token, 'secret key', function(error, decoded){
    console.log(decoded);
})

where :
token -> we generate before at the time of login.
secret key -> we provide in jwt.sign , when we generated the token.
callback function -> it will give error , when token will wrong or some error may occur.
decoded -> it the payload for which we had given at the time of login.
*/
