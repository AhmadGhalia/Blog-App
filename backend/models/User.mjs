import mongoose from "mongoose";
import joi from 'joi'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
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
      publicId: null,
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
}, { timestamps: true }); // Moved here

UserSchema.methods.generateAuthToken= function (){
  return  jwt.sign({id:this._id, isAdmin: this.isAdmin},process.env.SECRET_KEY)
}
const User = mongoose.model("User", UserSchema)


function validateRegisterUser
  (obj) {
  const schema = joi.object({
    username: joi.string().trim().min(6).max(20).required(),
    email: joi.string().trim().email().required(),
    password: joi.string().trim().min(8).required(),
  })
  return schema.validate(obj)
}
function validateLoginUser(obj) {
  const schema = joi.object({
    email: joi.string().trim().email(),
    password: joi.string().trim().min(8).required()
  })
  return schema.validate(obj)
}

function validateUpdateUser(obj) {
  const schema = joi.object({
    username: joi.string().trim().min(2).max(20),
    password: joi.string().trim().min(8),
    bio: joi.string()
  })
  return schema.validate(obj)
}

export { User, validateRegisterUser, validateLoginUser , validateUpdateUser}  