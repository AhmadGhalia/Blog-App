import jwt from 'jsonwebtoken'; // Import JSON Web Token for verifying tokens
import dotenv from 'dotenv'; 

dotenv.config(); 

// Middleware to verify JWT token for user authentication
function verifyToken(req, res, next) {
  const authToken = req.headers.authorization; // Access the 'Authorization' header
  if (authToken) {
    const token = authToken.split(" ")[1]; // Extract the token from "Bearer <token>"
    try {
      const decodedPayload = jwt.verify(token, process.env.SECRET_KEY); // Verify the token using the secret key
      req.user = decodedPayload; // Attach the decoded payload (user info) to the request object
      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      // Handle invalid or expired token
      return res.status(401).json({ message: "Access denied. Invalid token" });
    }
  } else {
    // Handle missing token
    return res.status(401).json({ message: "Access denied. No token provided" });
  }
}

// Middleware to verify if the user is an admin
function verifyAdmin(req, res, next) {
  verifyToken(req, res, () => {
    // Check if the authenticated user has admin privileges
    if (req.user.isAdmin) {
      next(); // User is an admin, proceed
    } else {
      // Deny access if the user is not an admin
      return res.status(403).json({ message: "Access denied. You are not an admin" });
    }
  });
}

// Middleware to verify if the authenticated user is accessing their own resource
function verifytokenOnlyUser(req, res, next) {
  verifyToken(req, res, () => {
    // Check if the authenticated user's ID matches the ID in the request parameters
    if (req.user.id === req.params.id) {
      next(); // User is accessing their own resource, proceed
    } else {
      // Deny access if the user is trying to access someone else's resource
      return res.status(403).json({ message: "Not allowed, only the user can access their own resource" });
    }
  });
}

export { verifyToken, verifyAdmin, verifytokenOnlyUser };
