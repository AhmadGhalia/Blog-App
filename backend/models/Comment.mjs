import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Define the schema for the comment model
const commentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true, // Corrected from "require" to "required"
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // Corrected from "require" to "required"
    },
    text: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Add createdAt and updatedAt timestamps automatically
  }
);

const Comment = mongoose.model("Comment", commentSchema); // Fixed model name typo ("Coment" -> "Comment")

export { Comment };
