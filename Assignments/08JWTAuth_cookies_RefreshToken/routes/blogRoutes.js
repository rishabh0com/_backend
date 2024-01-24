const express = require("express");
const { Blog }=require("../models/Blog")
const { auth } = require("../middlewares/verify_token");
const blogRouter = express.Router();

// Implement updatePost and deletePost controllers

// Public route (accessible without authentication)
blogRouter.get("/", auth, async (req, res) => {
  try {
    const posts = await Blog.find();
    res.status(200).send({ posts: posts });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Protected routes (require authentication)
blogRouter.post("/add", auth, async (req, res) => {
  const { title, content } = req.body;
  
  try {
    const post = new Blog({ title, content });
    const savedPost = await post.save();
    res.status(201).send({ new_post: savedPost });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
// Implement protected update and delete routes

module.exports = { blogRouter };
