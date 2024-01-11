const express = require("express");
const app = express();
app.use((req, res, next) => {
  if (false) {
    res.send("BYE");
  } else {
    next();
  }
});
app.get("/", (req, res) => {
  res.send("Welcome");
});
app.get("/contacts", (req, res) => {
  res.send("Contacts");
});
app.get("/about", (req, res) => {
  res.send("About");
});
app.get("/blogs", (req, res) => {
  res.send("Blogs");
});
app.listen(3500, () => {
  console.log("Running on 3500");
});
