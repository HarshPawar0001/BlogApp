const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  comments: [
    {
      userComment: {
        type: String,
        required: true,
      },
      userName: {
        type: String,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema);
module.exports = Comment;
