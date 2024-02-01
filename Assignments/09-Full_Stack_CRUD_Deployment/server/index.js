const express = require("express");
const connection = require("./config/db");
const cookieParser = require("cookie-parser");

const { userRoutes } = require("./routes/user.routes");
const { noteRoutes } = require("./routes/note.routes");
const app = express();
require("dotenv").config();

// get request for homepage :
app.get("/", async (req, res) => {
  try {
    res.send({ msg: "Home Page" });
  } catch (error) {
    res.status(500).send({ msg: "Internal server error", error: error });
  }
});

// middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/users", userRoutes);
app.use("/notes", noteRoutes);

// listening the server
app.listen(process.env.PORT, async () => {
  try {
    console.log(`server is running on http://localhost:${process.env.PORT}`);
    await connection; // connection to DB
    console.log(`DB is connected ~`);
  } catch (error) {
    console.log("Error", error);
  }
});
