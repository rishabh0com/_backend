const mongoose = require("mongoose");
const dotenv = require("dotenv").config()

const connection = mongoose.connect(process.env.mongoDBUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = { connection };
