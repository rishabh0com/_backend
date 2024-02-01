const mongooes = require("mongoose");
const moment = require("moment");

const noteSchema = mongooes.Schema(
  {
    title: { type: String, required: true },
    discription: { type: String, required: true },
    time: { type: String, default: moment().format("LT") },
    date: { type: String, default: moment().format("DD/MM/YY") },
    userID: { type: String, required: true },
  },
  { versionKey: false }
);

const NoteModel = mongooes.model("note", noteSchema);

module.exports = { NoteModel };
// console.log(moment().format('LT'))
// console.log(moment().format('L'))
