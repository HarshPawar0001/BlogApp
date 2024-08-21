const express = require("express");
const router = express.Router();

const { register, login, logout } = require("../controllers/userController");

const {
  createPost,
  getAllPosts,
  getMyPosts,
  getPost,
  updatePost,
  deletePost,
  createComment,
  getAllComments,
  // createNewPosts,
  // createNewComments,
  // getNewComments
} = require("../controllers/postController");

const {
  createCommentPost,
  getAllCommentsPost,
} = require("../controllers/commentController");

// user routes
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

// posts routes
router.post("/posts", createPost);
router.get("/posts", getAllPosts);

router.get("/myposts/:id", getMyPosts);
router.get("/posts/:id", getPost);
router.put("/posts/:id", updatePost);
router.delete("/posts/:id", deletePost);

// post comment routes
// router.post("/comment", createComment);
// router.get("/comments/:id", getAllComments);

router.post("/comment", createCommentPost);
router.get("/comments/:id", getAllCommentsPost);

// router.post("/createNewPosts", createNewPosts);
// router.post("/createNewComments", createNewComments);
// router.get("/getNewComments/:postId", getNewComments)


module.exports = router;
