const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/userController");

const {
  createPost,
  getAllPosts,
  getMyPosts,
  getPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");

const {
  createCommentPost,
  getAllCommentsPost,
} = require("../controllers/commentController");

// user routes
router.post("/register", register);
router.post("/login", login);

// posts routes
router.post("/posts", createPost);
router.get("/posts", getAllPosts);

router.get("/myposts/:id", getMyPosts);
router.get("/posts/:id", getPost);
router.put("/posts/:id", updatePost);
router.delete("/posts/:id", deletePost);

router.post("/comment", createCommentPost);
router.get("/comments/:id", getAllCommentsPost);

module.exports = router;
