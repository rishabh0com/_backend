// book validator middleware
function bookDataValidator(req, res, next) {
  const { title, author, ISBN } = req.body;
  if (title && author && ISBN) {
    next();
  } else {
    res
      .status(400)
      .send({
        error: "Incomplete book details..",
        bookData: { title: "String", author: "String", ISBN: "Number" },
      });
  }
}

module.exports = { bookDataValidator };
