const mongoose = require("mongoose");

// stablised connection to DB
const connection = mongoose.connect(`mongodb://127.0.0.1:27017/book-store`);

// create Schema for book
const bookSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  ISBN: { type: Number, required: true },
});

// construct model for book
const BookModel = mongoose.model("book", bookSchema);

module.exports = { connection, BookModel };
