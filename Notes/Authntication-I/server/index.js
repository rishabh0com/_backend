const express = require("express");
const dotenv = require("dotenv").config();
const { connection } = require("./db");
const { userRoutes } = require("../routes/userRouter");
const { authUser } = require("../middlewares/auth.middleware");

const app = express();

app.use(express.json());
app.use("/users", userRoutes);

// get request for home page :
app.get("/", async (req, res) => {
  try {
    res.status(200).send("This is home page ~");
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

// get request for about page :
app.get("/about", async (req, res) => {
  try {
    res.status(200).send("About page ~");
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

// get request for movie data page :
app.get("/movies", authUser, async (req, res) => {
  try {
    res.status(200).send("movies data [] ~");
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

// get request for series data page :
app.get("/series", authUser, async (req, res) => {
  try {
    res.status(200).send("series data [] ~");
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

// listen the server : 3030
app.listen(process.env.PORT, async () => {
  try {
    console.log(`server is running on http://localhost${process.env.PORT}`);
    await connection;
    console.log(`DB has connected ~`);
  } catch (error) {
    console.log({ server_Error: error });
  }
});
