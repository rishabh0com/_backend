const express = require("express")
const cors = require("cors")
const { connection } = require("./dataBase.js")
const { userRouter } = require("./routes/userRouter.js")
const app = express();
const PORT = 6060;

// express json -> obj middleware
app.use(express.json());
app.use(cors()) // cors beacuse of different origin
app.use("/", userRouter)

// get request :-
app.get("/", (req, res) => {
    res.status(200).send("Welcome to Home Page ~")
})

app.listen(PORT, async () => {
    try {
        await connection // connection is a asynchronous taks to conneect database
        console.log("connect to the database")
        console.log(`server is running on PORT ${PORT}`);
    } catch (error) {
        console.log("Errors : ", error)
    }
})