import { getAllUsersCtrl, getUserCtrl, updateUserProfileCtrl, getUserCount, uploudUserPhoto, deleteUserCtrl } from '../controllers/userController.mjs';
import express from 'express';
// Import middleware functions to verify tokens and access permissions
import { verifyToken, verifyAdmin, verifytokenOnlyUser ,verifytokenOnlyUserAndAdmin } from '../middlewares/varifyToken.mjs';
// Import middleware to validate MongoDB Object IDs
import validateObjectId from '../middlewares/validateObjectId.mjs';

import { photoUpload } from '../middlewares/photoUpload.mjs'
const route = express.Router();

// Route to get all user profiles (admin access required)
// - verifyAdmin middleware ensures only admins can access this route
// - getAllUsersCtrl handles the logic to fetch all users
route.get('/profile', verifyAdmin, getAllUsersCtrl);

// Route to get the total user count (admin access required)
// - verifyAdmin middleware ensures only admins can access this route
// - getUserCount handles the logic to count and return the number of users
route.get('/count', verifyAdmin, getUserCount);

// Route to get a specific user profile by ID
// - validateObjectId middleware ensures the provided ID is a valid MongoDB ObjectId
// - getUserCtrl handles the logic to fetch a single user's data
route.get('/profile/:id', validateObjectId, getUserCtrl);

// Route to update a user's profile by ID
// - validateObjectId middleware ensures the provided ID is valid
// - verifytokenOnlyUser middleware ensures the user can only update their own profile
// - updateUserProfileCtrl handles the logic to update the user's data
route.put('/profile/:id', validateObjectId, verifytokenOnlyUser, updateUserProfileCtrl);


route.post('/profile/profile-photo-upload', verifyToken, photoUpload.single('image'), uploudUserPhoto);

route.delete('/profile/:id',validateObjectId, verifytokenOnlyUserAndAdmin, deleteUserCtrl)
export default route;
