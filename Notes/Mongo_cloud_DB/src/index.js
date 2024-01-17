const express = require("express");
const { empRouter } = require("./router/employeeRouter");
const { connection } = require("./database/db");
const dotenv = require("dotenv");
dotenv.config();

const fs = require('fs')
const morgan = require('morgan')

const app = express();


// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream('./logger/log.txt', { flags: 'a' })
 
// setup the logger
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :date', { stream: accessLogStream }))


app.use(express.json());
// route the requests to employee_router :
app.use("/", empRouter);

// default api get request :
app.get("/", async (req, res) => {
  try {
    res.status(200).send(`welcome to home page ~`);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

// listen the server on port 2020 :
app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log(`server is running on http://localhost:${process.env.PORT}`);
    console.log(`database has connected.`);
  } catch (error) {
    console.log("app.listen Error : ", error);
  }
});
