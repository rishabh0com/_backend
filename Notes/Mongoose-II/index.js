import express from "express"
// import mongoose from "mongoose"
import { connection, userModel } from "./dataBase.js";

const app = express();
const PORT = 6060;
// express json -> obj middleware
app.use(express.json());

// get request :-
app.get("/", (req, res) => {
    res.status(200).send("Welcome to Home Page ~")
})
// post request for add new user :-
app.post("/add-user", async (req, res) => { // make cb function async
    console.log(req.body)
    const dataObj = req.body; // 1. take data body from frontend
    const user = new userModel(dataObj) // 2. construct using userModel
    await user.save() // 3. save document 
    res.status(201).send("new user has been added");
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