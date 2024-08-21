const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  // {
  //   title: {
  //     type: String,
  //     required: true,
  //   },
  //   description: {
  //     type: String,
  //     required: true,
  //   },
  //   userId: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User",
  //   },
  //   userName: {
  //     type: String,
  //   },
  //   comments: [
  //     {
  //       userComment: {
  //         type: String,
  //         required: true,
  //       },
  //       userNameComment: {
  //         type: String,
  //       },
  //       userIdComment: {
  //         type: mongoose.Schema.Types.ObjectId,
  //         ref: "User",
  //         required: true,
  //       },
  //       createdAt: {
  //         type: Date,
  //         default: Date.now,
  //       },
  //     },
  //   ],
  // },
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    userName: {
      type: String,
    },
  },
  { timestamps: true }
);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
module.exports = Post;
