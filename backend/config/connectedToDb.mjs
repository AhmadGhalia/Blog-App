import mongoose from "mongoose";
import * as dotenv from 'dotenv';

// Load environment variables from a .env file into process.env
dotenv.config();

// Get the database connection string from environment variables
const url = process.env.CONNECTING_STRING; // Ensure CONNECTING_STRING is set in your .env file

// Function to connect to the MongoDB database
async function connectToDb() {
  try {
    // Attempt to connect to the database using the connection string
    await mongoose.connect(url);
    console.log("Connected to the database successfully!"); // Log success message
  } catch (error) {
    // Catch and log any errors during the connection attempt
    console.error("Failed to connect to the database:", error.message);
  }
}

// Export the connectToDb function for use in other parts of the application
export default connectToDb;
