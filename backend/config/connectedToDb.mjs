import mongoose from "mongoose";
import * as dotenv from 'dotenv'
dotenv.config()
const url = process.env.CONNECTING_STRING; // Ensure CONNECTING_STRING is set in your environment
// Function to connect to the database
async function connectToDb() {

  try {
    await mongoose.connect(url);
    console.log("Connected to the database successfully!");
  } catch (error) {
    console.error("Failed to connect to the database:", error.message);
  }
}
export default connectToDb;

 