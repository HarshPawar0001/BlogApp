const connectDB = require("../config/connectDb");
const checkAuth = require("../middlewares/auth");
const errorHandler = require("../middlewares/errorHandler");
const Post = require("../models/post");
const Comment = require("../models/comment");
const { newPosts } = require("../models/newPosts");

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

    // const posts = await Post.find().sort({ updatedAt: -1, createdAt: -1 });
    const title = req.query.title;

    const posts = await Post.find({
      title: { $regex: `${title}`, $options: "i" },
    }).sort({ updatedAt: -1, createdAt: -1 });

    // if (!posts) {
    //   res.status(200).json({
    //     posts,
    //     success: true,
    //     message: "There is no post",
    //   });
    // }

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
  try {
    await connectDB();

    console.log("cvbn");

    const user = await checkAuth(req, res);

    console.log("user:, ", user);

    const posts = await Post.find({ userId: user._id }).sort({
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

    // console.log("posts: ", posts);

    // if (!post) {
    //   res.status(200).json({
    //     post,
    //     success: true,
    //     message: "There is no post",
    //   });
    // }

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

  // console.log("id: ", id);
  // console.log("title: ", title);
  // console.log("description: ", description);

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
    const comments = await Comment.deleteMany({ postId: id });
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

// const createNewPosts = async (req, res, next) => {
//   const { title, description } = req.body;
//   // console.log(title, description);
//   // try {
//   await connectDB();

//   const user = await checkAuth(req, res);

//   console.log("user: ", user);

//   const post = await newPosts.create({
//     title,
//     description,
//     userId: user,
//     userName: user.name,
//   });

//   res.status(200).json({
//     post,
//     success: true,
//     msg: "created post successfully",
//   });
//   // } catch (err) {
//   //   console.log(err);
//   //   return errorHandler(res);
//   // }
// };

// const createNewComments = async (req, res, next) => {
//   const { postId, comment } = req.body;
//   // console.log(title, description);
//   // try {
//   await connectDB();

//   const user = await checkAuth(req, res);

//   // console.log("user: ", user);

//   const post = await newPosts.findOne({ _id: postId });
//   if (post) {
//     post.comments.push({ userCommentId: user, userComment: comment });
//     await post.save();
//   }

//   res.status(200).json({
//     post,
//     success: true,
//     msg: "created post successfully",
//   });
//   // } catch (err) {
//   //   console.log(err);
//   //   return errorHandler(res);
//   // }
// };
// const getNewComments = async (req, res) => {
//   const { postId } = req.params;

//   try {
//     const comments = await newPosts.findOne({ _id: postId });
//     res.status(200).json({
//       comments,
//       success: true,
//       msg: "fetched post successfully",
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

const createComment = async (req, res) => {
  const { comment, postId } = req.body;
  // console.log(title, description);
  console.log("postid: ", postId);

  if (!comment) {
    return errorHandler(res, 400, "Please write your comment.");
  }

  try {
    await connectDB();

    const user = await checkAuth(req, res);

    console.log("user: ", user);

    const post = await Post.findOne({ _id: postId });
    if (post) {
      post.comments.push({
        userComment: comment,
        userIdComment: user._id,
        userNameComment: user.name,
      });
      await post.save();
    }

    res.status(200).json({
      post,
      success: true,
      msg: "comment posted successfully",
    });
  } catch (err) {
    console.log(err);
    return errorHandler(res);
  }
};

const getAllComments = async (req, res) => {
  const { id } = req.params;
  console.log("postId: ", id);

  try {
    await connectDB();

    let comments = await Post.findById({ _id: id }).select("comments");

    // comments = comments.comments.sort({
    //   updatedAt: -1,
    //   createdAt: -1,
    // });
    comments = comments.comments;

    res.status(200).json({
      comments,
      success: true,
      msg: "fetched all comments.",
    });
  } catch (err) {
    console.log("error: ", err);
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
  createComment,
  getAllComments,

  // createNewPosts,
  // createNewComments,
  // getNewComments,
};
