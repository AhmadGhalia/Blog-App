import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
// Define the schema for the User model
const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 20,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    maxlength: 200,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: Object,
    default: {
      url: "",
      publicId: null,
    },
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: ""
    }
  ]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});  // Add createdAt and updatedAt timestamps automatically

UserSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'postId'
})
const Post = mongoose.model("Post", PostSchema);


export {Post}