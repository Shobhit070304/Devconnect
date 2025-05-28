const express = require("express");
const Post = require("../models/post-model");
const { userAuth } = require("../middlewares/userMiddleware");
const { createPost, getAllPosts, getMyPosts, deletePost } = require("../controllers/post-controller");

const router = express.Router();

// Create a post
router.post("/create", userAuth, createPost);

// Get all posts (feed)
router.get("/all", getAllPosts);

// Get my posts
router.get("/me", userAuth, getMyPosts);

// Delete my post
router.delete("/delete/:id", userAuth, deletePost);

module.exports = router;
