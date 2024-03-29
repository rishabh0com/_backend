const express = require("express");
const { connection } = require("./db");
const { authRoutes } = require("./routes/authRoutes");

const app = express();

app.use(express.json());
app.use("/users", authRoutes);

app.get("/",(req,res)=>{
    res.send("home page ~")
})


app.listen(3000, async () => {
  try {
    console.log("server is running on port 3000");
    await connection;
    console.log("db is also connected");
  } catch (error) {
    console.log(error);
  }
});
