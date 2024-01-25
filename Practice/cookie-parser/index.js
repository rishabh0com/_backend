const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.get("/", (req, res) => {
// asynchronous :
    jwt.sign({ payload: "nothing" }, "secret_key", (err, token) => {
      if (token) {
        //   console.log(token)
        res.cookie("accessToken", token);
        res.send(`token: ${token}`);
      } else {
        res.send({ err });
      }
    });

// synchronous :
//   let token = jwt.sign({ payload: "nothing" }, "secret_key");
//   if(token){
//     res.cookie("accessToken",token)
//   }
});

app.listen(9090, () => {
  console.log("server is running on http://localhost:9090");
});
