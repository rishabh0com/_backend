const express = require("express");
const authMiddleware = require("../utils/authmiddleware");

const router = express.Router();

const Post = require("../models/Post");

// Implement updatePost and deletePost controllers

// Public route (accessible without authentication)
router.get("/",authMiddleware, async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).send({ posts: posts });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Protected routes (require authentication)
router.post("/add", authMiddleware, async (req, res) => {
  const { title, content } = req.body;
  const post = new Post({ title, content });

  try {
    const savedPost = await post.save();
    res.status(201).send({ new_post: savedPost });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
// Implement protected update and delete routes

module.exports = router;
