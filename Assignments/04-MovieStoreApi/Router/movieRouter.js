const express = require("express");
const { MovieModel } = require("../database");

const mRoute = express.Router();

// get requrest for show moviesData
mRoute.get("/get-movies", async (req, res) => {
  try {
    console.log(req.query);
    const { title, rating, q, sortBy, page, limit } = req.query;

    let queries = {};
    if (title) queries.title = new RegExp(title, "i"); // RegExp and flag i make case insenstive
    if (q) queries.title = new RegExp(q, "i");
    if (rating) queries.rating = rating;

    const sortOption = {};
    if (sortBy) sortOption.sortBy = 1;
    console.log("quireis", queries,q);

    const movies = await MovieModel.find(queries)
      .sort(sortOption)
      .skip(page * limit)
      .limit(limit);

    console.log(movies);
    res.status(200).json({ movies: movies });
  } catch (error) {
    console.log(error)
    res.status(404).json({ msg: "somthing went wrong", error: error });
  }
});

//post request for add new movie
mRoute.post("/add-movie", async (req, res) => {
  try {
    const movieData = req.body;
    const newMovieData = new MovieModel(movieData);
    await newMovieData.save();

    res
      .status(201)
      .json({ msg: "new movie has been added", movie: newMovieData });
  } catch (error) {
    res.status(400).json({ msg: "somthing went wrong", error: error });
  }
});

// put request for update movieData
mRoute.put("/update-movie/:movieId", async (req, res) => {
  try {
    const updateData = req.body;
    const { movieId } = req.params;
    console.log(movieId);
    const movieUpdate = await MovieModel.findByIdAndUpdate(movieId, updateData);
    // console.log(movieUpdate);

    res.send({ msg: "movie data has been updated", movie: movieUpdate });
    // await movieUpdate.save();
  } catch (error) {
    console.log(error);
    res.send({ error: error });
  }
});

// delete request for delete movie
mRoute.delete("/delete-movie/:movieId", async (req, res) => {
  try {
    const deletedMovie = await MovieModel.findByIdAndDelete(req.params.movieId);

    res
      .status(200)
      .send({ msg: "movie has been deleted", movie: deletedMovie });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "something went wrong", error: error });
  }
});

// export movie Router
module.exports = { mRoute };



/*
// Get all movies with optional filters, sorting, and pagination
app.get('/movies', async (req, res) => {
  try {
    // Extracting magical codes (query parameters) from the request
    const { title, rating, q, sortBy, page, limit } = req.query;

    // Creating an empty basket to hold the magical conditions
    let query = {};

    // If you asked for movies with a specific title, add that condition to the basket
    if (title) query.title = new RegExp(title, 'i');

    // If you asked for movies with a specific rating, add that condition to the basket
    if (rating) query.rating = rating;

    // If you remembered a special word and want to find movies with that word, add that condition to the basket
    if (q) query.title = new RegExp(q, 'i');

    // Creating a magical wand to sort the movies in a special order
    const sortOptions = {};

    // If you want to sort by a specific field (e.g., release date), use that as a command for the wand
    if (sortBy) sortOptions[sortBy] = 1;

    // Now, let's ask the magical helper to fetch the special movies based on the conditions in the basket
    // and sort them using the magical wand. We also tell the helper to show only a limited number of movies at a time.
    const movies = await Movie.find(query)
      .sort(sortOptions)
      .skip(parseInt(page) * parseInt(limit))
      .limit(parseInt(limit));

    // The helper has gathered the special movies and now sends them back to you in a magical response
    res.json(movies);
  } catch (error) {
    // Uh-oh! If something went wrong during the magical process, the helper sends a message about it.
    res.status(500).json({ error: error.message });
  }
});

 */
