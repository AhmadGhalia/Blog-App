import asyncHandler from 'express-async-handler';
import { User } from '../models/User.mjs';
import { validateUpdateUser } from '../models/validation.mjs';
import bcrypt from 'bcryptjs';

/**--------------------------------------------
 * @desc   Get all users
 * @route  GET /api/users/profile
 * @method GET
 * @access Admin
 ----------------------------------------------*/
const getAllUsersCtrl = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password'); // Exclude 'password' field
  res.status(200).json(users);
});

/**--------------------------------------------
 * @desc   Get total count of users
 * @route  GET /api/users/count
 * @method GET
 * @access Admin
 ----------------------------------------------*/
const getUserCount = asyncHandler(async (req, res) => {
  const count = await User.countDocuments(); // Use countDocuments for accurate counting
  res.status(200).json(count);
});

/**--------------------------------------------
 * @desc   Get a user by ID
 * @route  GET /api/users/profile/:id
 * @method GET
 * @access Public (Validated ObjectId)
 ----------------------------------------------*/
const getUserCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password'); // Exclude 'password' field
  if (!user) {
    return res.status(404).json('User not found');
  }
  res.status(200).json(user);
});

/**--------------------------------------------
 * @desc   Update user profile
 * @route  PUT /api/users/profile/:id
 * @method PUT
 * @access Restricted (User or Admin)
 ----------------------------------------------*/
const updateUserProfileCtrl = asyncHandler(async (req, res) => {
  const { error } = validateUpdateUser(req.body); // Validate the input data
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  if (req.body.password) {
    // Hash the new password before saving
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }

  // Update the user's profile in the database
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        username: req.body.username,
        password: req.body.password,
        bio: req.body.bio,
      },
    },
    { new: true } // Return the updated document
  ).select('-password'); // Exclude 'password' field

  res.status(200).json(updatedUser);
});

/**--------------------------------------------
 * @desc   Profile photo Upload
 * @route  /api/users/profile/profile-photo-upload
 * @method post
 * @access private (User or Admin)
 ----------------------------------------------*/
const uploudUserPhoto = asyncHandler(async (req, res) => {
  console.log(req.file) 
  return res.status(200).json({message: 'Photo uploded'})
})
export { getAllUsersCtrl, getUserCtrl, updateUserProfileCtrl, getUserCount,uploudUserPhoto };
