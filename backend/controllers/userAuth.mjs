import asyncHandler from 'express-async-handler';
import { User } from '../models/User.mjs';
import { validateRegisterUser, validateLoginUser } from '../models/validation.mjs';
import bcrypt from 'bcryptjs';

// Controller for registering a new user
export const registerUserCtrl = asyncHandler(async (req, res) => {
  // Validate the incoming request body against the registration schema
  const { error } = validateRegisterUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message }); // Return validation error message if invalid
  }

  // Check if a user with the provided email already exists in the database
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ message: 'The user is already exists' }); // Return error if user exists
  }
  // Generate a salt and hash the provided password
  const salt = await bcrypt.genSalt(10); // Generate a unique salt
  const hashedPassword = await bcrypt.hash(req.body.password, salt); // Hash the password with the salt

  // Create a new user document with the hashed password and save it to the database
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });
  await newUser.save(); // Save the new user to the database

  // Respond with a success message
  return res.status(201).json({ message: 'You registered successfully, please log in' });
});

// Controller for logging in a user
export const loginUser = asyncHandler(async (req, res) => {
  // Validate the incoming request body against the login schema
  const { error } = validateLoginUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message }); // Return validation error message if invalid
  }

  // Find the user by their email in the database
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' }); // Return error if user is not found
  }

  // Compare the provided password with the stored hashed password
  const isValidPassword = await bcrypt.compare(req.body.password, user.password);
  if (!isValidPassword) {
    return res.status(400).json({ message: 'Invalid email or password' }); // Return error if the password is incorrect
  }

  // Generate an authentication token for the user
  const token = user.generateAuthToken();
  // Respond with user details and the authentication token
  return res.status(200).json({
    message: 'You successfully logged in',
    _id: user._id,
    isAdmin: user.isAdmin,
    profilePhoto: user.profilePhoto,
    token,
  });
}); 