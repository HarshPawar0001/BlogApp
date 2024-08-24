const connectDB = require("../config/connectDb");
const checkAuth = require("../middlewares/auth");
const errorHandler = require("../middlewares/errorHandler");
const Post = require("../models/post");
const Comment = require("../models/comment");

const createPost = async (req, res) => {
  const { title, description } = req.body;
  // console.log(title, description);

  if (!title || !description) {
    return errorHandler(res, 400, "Fill all the fields.");
  }

  try {
    await connectDB();

    const user = await checkAuth(req, res);

    console.log("user: ", user);

    const post = await Post.create({
      title,
      description,
      userId: user._id,
      userName: user.name,
    });

    res.status(200).json({
      post,
      success: true,
      msg: "created post successfully",
    });
  } catch (err) {
    console.log(err);
    return errorHandler(res);
  }
};

const getAllPosts = async (req, res) => {
  console.log("req.query: ", req.query);
  try {
    await connectDB();

    const title = req.query.title;

    const posts = await Post.find({
      title: { $regex: `${title}`, $options: "i" },
    }).sort({ updatedAt: -1, createdAt: -1 });

    res.status(200).json({
      posts,
      success: true,
      msg: "fetched all posts.",
    });
  } catch (err) {
    console.log("error: ", err);
    return errorHandler(res);
  }
};

const getMyPosts = async (req, res) => {
  const { id } = req.params;
  console.log("this is my-blogs call");
  try {
    await connectDB();

    // const user = await checkAuth(req, res);

    console.log("user:, ", user);

    const posts = await Post.find({ userId: id }).sort({
      updatedAt: -1,
      createdAt: -1,
    });

    // console.log("posts: ", posts);

    res.status(200).json({
      posts,
      success: true,
      msg: `fetched all posts of ${user.name} user.`,
    });
  } catch (err) {
    console.log("error: ", err);
    return errorHandler(res);
  }
};

const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    await connectDB();

    const post = await Post.findById({ _id: id });

    res.status(200).json({
      post,
      success: true,
      msg: "fetched post successfully",
    });
  } catch (err) {
    console.log("error: ", err);
    return errorHandler(res);
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    await connectDB();

    const post = await Post.updateOne(
      { _id: id },
      {
        title,
        description,
      }
    );

    res.status(200).json({
      post,
      success: true,
      msg: "post updated successfully.",
    });
  } catch (err) {
    console.log(err);
    return errorHandler(res);
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    await connectDB();

    const posts = await Post.deleteOne({ _id: id });

    // delete all comments of the post from the comment schema after deleting the post from post schema
    const comments = await Comment.deleteOne({ postId: id });
    console.log("comments: ", comments);

    res.status(200).json({
      posts,
      success: true,
      msg: "post deleted successfully.",
    });
  } catch (err) {
    console.log(err);
    return errorHandler(res);
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getMyPosts,
  getPost,
  updatePost,
  deletePost,
};
