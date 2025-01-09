import mongoose from "mongoose";
import jwt from 'jsonwebtoken' // Import JSON Web Token for generating authentication tokens
import dotenv from 'dotenv'
import  joi  from "joi";
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
  timestamps: true
});  // Add createdAt and updatedAt timestamps automatically
const Post = mongoose.model("Post", PostSchema);


export {Post}