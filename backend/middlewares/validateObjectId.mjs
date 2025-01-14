import mongoose from "mongoose"; // Import mongoose for ObjectId validation

// - Middleware to validate a MongoDB ObjectId
// - Checks if the `id` is a valid MongoDB ObjectId
// - Proceeds to the next middleware or route handler if valid
function validateObjectId(req, res, next) {
  const id = req.params.id; // Get the `id` from request parameters
  if (!mongoose.Types.ObjectId.isValid(id)) {
    // Check if `id` is a valid MongoDB ObjectId
    return res.status(400).send({ message: 'Invalid ObjectId' });
  }
  next(); // If valid, proceed to the next middleware or route handler
}

export default validateObjectId;
