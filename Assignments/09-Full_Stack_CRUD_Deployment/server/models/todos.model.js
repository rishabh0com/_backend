const mongooes = require("mongoose");
const moment = require("moment");

const todoSchema = mongooes.Schema(
  {
    title: { type: String, required: true },
    status: { type: Boolean, required: true },
    time: { type: String, default: moment().format("LT") },
    date: { type: Date, default: moment().format("L") },
  },
  { versionKey: false }
);

const TodoModel = mongooes.model("todo", todoSchema);

module.exports = { TodoModel };
// console.log(moment().format('LT'))
// console.log(moment().format('L'))
