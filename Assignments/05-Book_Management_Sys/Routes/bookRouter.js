const express = require("express");
const { BookModel } = require("../database");
const { bookDataValidator } = require("./Middleware/validator");

const bookRouter = express.Router();

// get all movies
bookRouter.get("/", async (req, res) => {
  try {
    const books = await BookModel.find();
    // console.log(books)
    res.status(200).send({ All_Books: books });
  } catch (error) {
    res
      .status(400)
      .send({ msg: "Invalid endpoint or Internal error", error: error });
  }
});

// add new book
bookRouter.post("/add", bookDataValidator, async (req, res) => {
  try {
    const { title, author, ISBN } = req.body;
    const newBook = new BookModel({ title, author, ISBN });
    await newBook.save();

    res
      .status(201)
      .send({ msg: "new book added succesfully", newBook: newBook });
  } catch (error) {
    res
      .status(400)
      .send({ msg: "Invalid endpoint or Internal error", error: error });
  }
});

// get books by query
bookRouter.get("/search", async (req, res) => {
  try {
    const { title, author } = req.query;
    let quries = {};
    if (title) quries.title = new RegExp(title, "i");
    if (author) quries.author = new RegExp(author, "i");

    const books = await BookModel.find(quries);
    if (books[0]) {
      res.status(200).send({ books: books });
    } else {
      res.status(404).send({ msg: "books not found" });
    }
  } catch (error) {
    res
      .status(400)
      .send({ msg: "Invalid endpoint or Internal error", error: error });
  }
});

// update the book
bookRouter.put("/update/:id", async (req, res) => {
  try {
    const updatedBook = await BookModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    // console.log(updatedBook);

    if (updatedBook) {
      res.status(201).send({ msg: "book has been updated", book: updatedBook });
    } else {
      res.status(404).send({ msg: "books not found" });
    }
  } catch (error) {
    res
      .status(400)
      .send({ msg: "Invalid endpoint or Internal error", error: error });
  }
});

// delete the book
bookRouter.delete("/delete/:id", async (req, res) => {
  try {
    await BookModel.findByIdAndDelete(req.params.id);
    res.status(200).send({ msg: "book deleted succesfully" });
  } catch (error) {
    res
      .status(400)
      .send({ msg: "Invalid end point or Internal error", error: error });
  }
});

module.exports = { bookRouter };
