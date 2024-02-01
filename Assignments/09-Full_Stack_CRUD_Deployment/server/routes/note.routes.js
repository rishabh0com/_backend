const express = require("express");
const { NoteModel } = require("../models/note.model");
const { authentication } = require("../middlewares/verifyUser.middleware");

const noteRoutes = express.Router();

//middleware :
noteRoutes.use(authentication);
// post request for add notes :

noteRoutes.post("/add/:id", async (req, res) => {
  const { title, discription} = req.body;
  const userID = req.params.id
 
  try {
    const note = new NoteModel({ title, discription, userID });
    await note.save();
    if (!note) throw new Error();
    res.status(201).send({ msg: "note is created", note });
  } catch (error) {
    res.send({ msg: error.message, error });
  }
});

// get request for all notes :

noteRoutes.get("/:id", async (req, res) => {
  const userID = req.params.id;
  console.log(userID)
  try {
    const notes = await NoteModel.find({ userID });
    if (!notes) throw new Error("notes not found");
    res.send({ msg: "notes are avalible", notes });
  } catch (error) {
    res.send({ msg: error.message, error });
  }
});

// put request for update the note :

noteRoutes.put("/update/:id", async (req, res) => {
  const noteId = req.params.id;
  const data = req.body;
  try {
    const note = await NoteModel.findByIdAndUpdate(noteId, data);
    if (!note) throw new Error("note is not found");

    res.send({ msg: "note is updated", note });
  } catch (error) {
    res.send({ msg: error.message, error });
  }
});

// delete request for delete the note :

noteRoutes.delete("/delete/:id", async (req, res) => {
  const noteID = req.params.id;
  try {
    const note = await NoteModel.findByIdAndDelete(noteID);
    res.send({ msg: "note is deleted", note });
  } catch (error) {
    res.send({ msg: error.message, error });
  }
});

module.exports = { noteRoutes };
