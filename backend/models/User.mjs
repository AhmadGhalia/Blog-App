import mongoose from "mongoose";
import jwt from 'jsonwebtoken' // Import JSON Web Token for generating authentication tokens
import dotenv from 'dotenv'
dotenv.config()
// Define the schema for the User model
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 6,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 6
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
  },
  profilePhoto: {
    type: Object,
    default: {
      url: "https://cdn.pixabay.com/photo/2014/04/02/14/10/female-306407_1280.png",
      publicId: null, // Default value for the public ID (if applicable for cloud storage)
    },
  },
  bio: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isAccountVerified: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
}
);  // Add createdAt and updatedAt timestamps automatically

UserSchema.virtual('Posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'user'
})
// Method to generate a JWT authentication token for the user
UserSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id, isAdmin: this.isAdmin }, // Payload contains user ID and admin status
    process.env.SECRET_KEY // Secret key is stored in environment variables
  );
};
// Create the User model from the schema
const User = mongoose.model("User", UserSchema)


export { User }  