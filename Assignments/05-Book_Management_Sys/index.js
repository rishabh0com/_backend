const express = require("express");
const { connection } = require("./database");
const { bookRouter } = require("./Routes/bookRouter");

const app = express();
const PORT = 5050;

// require middlwares
app.use(express.json());
app.use("/books", bookRouter);

app.get("/", (req, res) => {
  res.send({ msg: "WELCOME TO BOOKSTORE MANAGEMENT SYSTEM" });
});

app.listen(PORT, async (req, res) => {
  try {
    await connection;
    console.log(
      `server is running on http://localhost${PORT} & DB is also connected..`
    );
  } catch (error) {
    console.log(`something went wrong in server : `, error);
  }
});
