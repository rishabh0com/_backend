const express = require("express");
const dotenv = require("dotenv").config();
const { connection } = require("./database/db");
const { userRoutes } = require("./Routes/userRoutes");
const { authRoutes } = require("./Routes/userAuth.routes");

const app = express();
const PORT = 4000;

app.use(express.json());
app.use("/users",authRoutes)
app.use("/users", userRoutes);
app.get("/", (req, res) => {
  res.send("home page~");
});

app.listen(PORT, async () => {
  try {
    console.log(`Server is running on http://localhost:${PORT}`);
    await connection;
    console.log("db is also connected");
  } catch (error) {
    console.log(error);
  }
});
