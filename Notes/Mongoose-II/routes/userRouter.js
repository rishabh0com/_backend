const express = require("express")
const { userModel } = require("../dataBase")

const userRouter = express.Router();

// post request for add new user :-
userRouter.post("/add-user", async (req, res) => { // make cb function async
    try {
        console.log(req.body)
        const dataObj = req.body; // 1. take data body from frontend
        const user = new userModel(dataObj) // 2. construct using userModel
        await user.save() // 3. save document 
        res.status(200).send({ msg: "new user has been added" });
    } catch (error) {
        res.send({ error: error })
    }
})

// get request for getting users
userRouter.get("/get-users", async (req, res) => {
    try {
        const users = await userModel.find()
        console.log(users)
        res.send(users)
    } catch (error) {
        res.send({ error: error })
    }
})
//pathch requet to update user detail
userRouter.patch("/update-user/:userID", async (req, res) => {
    try {
        let { userID } = req.params
        let userUpdate = req.body
        console.log(await userModel.findOne({ _id: userID }))
        console.log(userUpdate)
        const user = await userModel.findByIdAndUpdate({ _id: userID }, userUpdate)
        res.send("user updated")
    } catch (error) {
        console.log("Error", error)
    }
})
// delete request for delete the document or user
userRouter.delete("/delete-user/:userId", async (req, res) => {
    try {
        let userID = req.params.userId
        console.log(userID)
        await userModel.findByIdAndDelete({ _id: userID })
        res.send("user has been deleted")
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

module.exports = { userRouter }