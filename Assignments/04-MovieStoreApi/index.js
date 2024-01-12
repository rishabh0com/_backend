const express = require("express");
const { connection } = require("./database");
const { mRoute } = require("./Router/movieRouter");

const PORT = 7070;
const app = express();

app.use(express.json());
app.use("/movie", mRoute);

app.get("/", (req, res) => {
  res.json({ msg: "Welcome to Homepage ~" });
});

//
app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Db is connected");
    console.log(`server is running on http://localhost${PORT}`);
  } catch (error) {
    console.log("server or db error : ", error);
  }
});
