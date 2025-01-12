import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/authRoute.mjs';
import userRouter from './routes/userRoute.mjs';
import postRouter from './routes/postRoute.mjs';
import connectToDb from './config/connectedToDb.mjs';
import commentRouter from './routes/commentRoute.mjs'

// Establish connection to the MongoDB database
connectToDb(); 

dotenv.config();

const app = express(); // Initialize the Express application

// Middleware setup
app.use(express.json()); // Middleware to parse incoming JSON request bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded data
app.use(express.static('public')); // Serve static files from the "public" directory

// Routes setup
app.use('/api/auth', authRouter); // Routes for authentication-related operations
app.use('/api/users', userRouter); // Routes for user management operations
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);
// Server configuration
const port = process.env.PORT || 8000; // Use PORT from environment variables or default to 8000
app.listen(port, () =>
  console.log(`Server is running in ${process.env.NODE_ENV} enviroment on port: ${port}`) // Log the server's environment and port
);
