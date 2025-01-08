import express from 'express';
import { registerUserCtrl, loginUser } from '../controllers/userAuth.mjs'; // Import controller functions for user authentication

const route = express.Router(); // Create a new router instance

// Route for user registration
route.post('/register', registerUserCtrl); 
// Handles POST requests to '/register' endpoint using the `registerUserCtrl` controller

// Route for user login
route.post('/login', loginUser); 
// Handles POST requests to '/login' endpoint using the `loginUser` controller

export default route; 