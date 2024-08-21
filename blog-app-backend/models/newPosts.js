const mongoose=require('mongoose');

const newPostSchema= new mongoose.Schema({
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
    comments: [
        {
          userCommentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
          userComment: {
            type: String,
            required: true,
          },
          
        },{ timestamps: true }
      ],
  },
  { timestamps: true })

  const newPosts=mongoose.model('newPosts',newPostSchema);

  module.exports={newPosts};