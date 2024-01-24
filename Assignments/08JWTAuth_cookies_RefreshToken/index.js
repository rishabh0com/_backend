const express = require("express");
const cookieParser = require("cookie-parser");
const { connection } = require("./db");
const { authRoutes } = require("./routes/authRoutes");
const { blogRouter } = require("./routes/blogRoutes");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/users", authRoutes);
app.use("/blogs", blogRouter);

app.get("/", (req, res) => {
  res.send("home page ~");
});

app.listen(3000, async () => {
  try {
    console.log("server is running on port 3000");
    await connection;
    console.log("db is also connected");
  } catch (error) {
    console.log(error);
  }
});
