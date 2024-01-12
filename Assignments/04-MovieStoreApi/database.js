const mongoose = require("mongoose")

const connection = mongoose.connect("mongodb://127.0.0.1:27017/movieData");

const movieSchema = mongoose.Schema({
    title: { type: String, required: true },
    rating: { type: Number, required: true }
}, { versionKey: false })

const MovieModel = mongoose.model("movie", movieSchema)

module.exports = { connection, MovieModel }