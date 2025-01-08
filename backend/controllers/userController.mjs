import asyncHandler from 'express-async-handler';
import { User, validateRegisterUser, validateLoginUser,validateUpdateUser} from '../models/User.mjs'
import bcrypt from 'bcryptjs';
const getAllUsersCtrl = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password')
  res.status(200).json(users)
})
const getUserCount = asyncHandler(async (req, res) => {
  const count = await User.countDocuments(); 
  res.status(200).json(count)
})

const getUserCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')
  if (!user) {
    res.status(404).json('User not found')
  }
  res.status(200).json(user) 
})

const updateUserProfileCtrl = asyncHandler(async (req, res) => {
  const { error } = validateUpdateUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message }); // Fixed typo
  }
  if (req.body.password) {
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

  }

  const updatedUser = await User.findByIdAndUpdate(req.params.id, {
    $set: {
      username: req.body.username,
      password: req.body.password,
      bio: req.body.bio
    }
  }, { new: true }).select('-password');
  res.status(200).json(updatedUser)
})






export { getAllUsersCtrl, getUserCtrl, updateUserProfileCtrl,getUserCount }