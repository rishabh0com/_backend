const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connection = mongoose.connect(process.env.mongoDBUrl);

const employee_Schema = mongoose.Schema(
  {
    name: { type: String, reqired: true },
    employee_id: { type: Number, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  { versionKey: false }
);

const employeeModel = mongoose.model("employee", employee_Schema);

module.exports = { connection, employeeModel };
