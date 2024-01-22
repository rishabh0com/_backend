const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");
const { connection } = require("./db");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.get("/",(req,res)=>{
  res.send("home page~")
})

app.use("/", userRouter);
app.use("/", authRoutes);
app.use("/posts", postRoutes);

app.listen(PORT, async () => {
  try {
    console.log(`Server is running on port ${PORT}`);
    await connection;
    console.log("db is also connected");
  } catch (error) {
    console.log(error);
  }
});
