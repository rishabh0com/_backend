const express = require("express");
const fs = require("fs");
const app = express();

const isAuth = false;

// const middleAuth = (req, res, next) => {
//   if (isAuth) {
//     console.log("Access Granted");
//     next();
//   } else {
//     console.log("Access denide");
//     res.send("Authentication unsuccessful");
//   }
// };
// app.use(middleAuth);

function reqLog(req, res, next) {
    let content = `User request at ${new Date()} in ${req.method} request \n`;
    fs.appendFile("./reqLog.txt",content,(err)=>{
        if (err) res.send(err)
        else  res.send("requset succesful")
    })
}

app.use(reqLog);

app.get("/", (req, res) => {
  // res.setHeader("content-type","text")
  res.send("welcome to home page");
});

app.listen(5050, () => {
  console.log("server is running now");
});
